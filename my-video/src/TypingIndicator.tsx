import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLOR_ACCENT, COLOR_TEXT_DIM, FONT_FAMILY, FONT_SIZE_BODY } from "./config";

export const TypingIndicator: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Spinning cursor frames: ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
  const spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const spinnerIndex = Math.floor(time * 10) % spinnerChars.length;
  const spinner = spinnerChars[spinnerIndex];

  // Pulsing opacity for the "thinking" text
  const pulse = interpolate(
    Math.sin(time * 3),
    [-1, 1],
    [0.4, 1],
  );

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE_BODY,
        paddingLeft: 4,
      }}
    >
      <span style={{ color: COLOR_ACCENT }}>{spinner}</span>
      <span style={{ color: COLOR_TEXT_DIM, opacity: pulse }}>Thinking…</span>
    </div>
  );
};
