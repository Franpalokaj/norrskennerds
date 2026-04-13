import { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "./types";
import {
  DEFAULT_USER_DELAY,
  DEFAULT_ASSISTANT_DELAY,
  TYPING_INDICATOR_MIN,
  TYPING_INDICATOR_MAX,
  INITIAL_PAUSE,
  TERMINAL_MAX_WIDTH,
  MESSAGE_GAP,
  COLOR_BG,
  COLOR_TEXT_DIM,
  COLOR_ACCENT,
  FONT_FAMILY,
  FPS,
  FADE_OUT_DURATION,
  HOLD_LAST_MESSAGE,
} from "./config";

type MessageTiming = {
  typingStartFrame: number;
  typingEndFrame: number;
  messageAppearFrame: number;
  message: Message;
};

function getTypingDuration(msg: Message): number {
  const len = msg.content.length + (msg.toolCalls?.length ?? 0) * 80;
  return interpolate(len, [20, 400], [TYPING_INDICATOR_MIN, TYPING_INDICATOR_MAX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function computeTimings(messages: Message[]): {
  timings: MessageTiming[];
  totalDurationFrames: number;
} {
  const timings: MessageTiming[] = [];
  let currentTime = INITIAL_PAUSE;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    const delay =
      msg.delayBefore ??
      (msg.role === "user" ? DEFAULT_USER_DELAY : DEFAULT_ASSISTANT_DELAY);

    if (i > 0) {
      currentTime += delay;
    }

    if (msg.role === "assistant") {
      const typingDur = getTypingDuration(msg);
      const typingStartFrame = Math.round(currentTime * FPS);
      const typingEndFrame = Math.round((currentTime + typingDur) * FPS);

      timings.push({
        typingStartFrame,
        typingEndFrame,
        messageAppearFrame: typingEndFrame,
        message: msg,
      });

      currentTime += typingDur;
    } else {
      const appearFrame = Math.round(currentTime * FPS);
      timings.push({
        typingStartFrame: -1,
        typingEndFrame: -1,
        messageAppearFrame: appearFrame,
        message: msg,
      });
    }
  }

  currentTime += HOLD_LAST_MESSAGE + FADE_OUT_DURATION;
  return {
    timings,
    totalDurationFrames: Math.round(currentTime * FPS),
  };
}

export const Conversation: React.FC<{ messages: Message[] }> = ({
  messages,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const { timings, totalDurationFrames } = useMemo(
    () => computeTimings(messages),
    [messages],
  );

  const fadeOutStartFrame =
    totalDurationFrames - Math.round(FADE_OUT_DURATION * fps);
  const globalOpacity = interpolate(
    frame,
    [fadeOutStartFrame, totalDurationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const chatAreaHeight = height - 160;

  const visibleItems: React.ReactNode[] = [];
  let showTypingIndicator = false;
  let typingIndicatorOpacity = 0;

  for (let i = 0; i < timings.length; i++) {
    const t = timings[i];
    const isUser = t.message.role === "user";

    if (isUser) {
      if (frame >= t.messageAppearFrame) {
        const scaleVal = spring({
          frame: frame - t.messageAppearFrame,
          fps,
          config: { damping: 15, stiffness: 200, mass: 0.8 },
          from: 0.97,
          to: 1,
        });
        visibleItems.push(
          <ChatBubble
            key={`msg-${i}`}
            message={t.message}
            opacity={1}
            scale={scaleVal}
            toolCallsVisible={0}
          />,
        );
      }
    } else {
      if (frame >= t.messageAppearFrame) {
        const fadeIn = interpolate(
          frame,
          [t.messageAppearFrame, t.messageAppearFrame + Math.round(0.3 * fps)],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Stagger tool call reveals: one every 0.5s after message appears
        const toolCount = t.message.toolCalls?.length ?? 0;
        const framesPerTool = Math.round(0.5 * fps);
        const framesSinceAppear = frame - t.messageAppearFrame;
        const toolCallsVisible = Math.min(
          toolCount,
          Math.floor(framesSinceAppear / framesPerTool) + 1,
        );

        visibleItems.push(
          <ChatBubble
            key={`msg-${i}`}
            message={t.message}
            opacity={fadeIn}
            scale={1}
            toolCallsVisible={toolCallsVisible}
          />,
        );
      } else if (frame >= t.typingStartFrame && frame < t.typingEndFrame) {
        showTypingIndicator = true;
        const fadeInEnd = t.typingStartFrame + Math.round(0.2 * fps);
        const fadeOutStart = t.typingEndFrame - Math.round(0.15 * fps);
        typingIndicatorOpacity = interpolate(
          frame,
          [t.typingStartFrame, fadeInEnd, fadeOutStart, t.typingEndFrame],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
      }
    }
  }

  // Scroll
  const visibleCount = visibleItems.length + (showTypingIndicator ? 1 : 0);
  const estimatedItemHeight = 90;
  const totalContentHeight = visibleCount * (estimatedItemHeight + MESSAGE_GAP);
  const scrollTarget = Math.max(0, totalContentHeight - chatAreaHeight + 80);

  const scrollOffset = spring({
    frame,
    fps,
    config: { damping: 30, stiffness: 80, mass: 1 },
    from: 0,
    to: scrollTarget,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR_BG,
        opacity: globalOpacity,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 48,
          borderBottom: "1px solid #2A2B3D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <span style={{ color: COLOR_ACCENT, fontSize: 14, fontWeight: 700 }}>
          ✹
        </span>
        <span style={{ color: COLOR_TEXT_DIM, fontSize: 13 }}>
          Claude Code
        </span>
        <span style={{ color: "#3B3F54", fontSize: 13 }}>│</span>
        <span style={{ color: COLOR_TEXT_DIM, fontSize: 12 }}>
          claude-opus-4-6
        </span>
      </div>

      {/* Chat area */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          bottom: 40,
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: TERMINAL_MAX_WIDTH,
            maxWidth: "100%",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: MESSAGE_GAP,
            transform: `translateY(${-scrollOffset}px)`,
          }}
        >
          {visibleItems}
          {showTypingIndicator && (
            <TypingIndicator opacity={typingIndicatorOpacity} />
          )}
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          borderTop: "1px solid #2A2B3D",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 16,
        }}
      >
        <span style={{ color: COLOR_TEXT_DIM, fontSize: 12 }}>
          Opus 4.6
        </span>
        <span style={{ color: "#3B3F54", fontSize: 12 }}>│</span>
        <span style={{ color: COLOR_TEXT_DIM, fontSize: 12 }}>
          ~/coaching-system
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          <span style={{ color: COLOR_TEXT_DIM, fontSize: 12 }}>
            37k / 200k tokens
          </span>
          <span style={{ color: "#3B3F54", fontSize: 12 }}>│</span>
          <span style={{ color: COLOR_TEXT_DIM, fontSize: 12 }}>
            $0.42
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
