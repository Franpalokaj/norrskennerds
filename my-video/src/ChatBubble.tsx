import {
  COLOR_ACCENT,
  COLOR_USER_TEXT,
  COLOR_ASSISTANT_TEXT,
  COLOR_TEXT_DIM,
  COLOR_TOOL_BORDER,
  COLOR_TOOL_BG,
  COLOR_TOOL_LABEL,
  COLOR_SUCCESS,
  COLOR_PROMPT_BG,
  COLOR_PROMPT_BORDER,
  FONT_FAMILY,
  FONT_SIZE_BODY,
  FONT_SIZE_LABEL,
} from "./config";
import type { Message, ToolCall } from "./types";

type ChatBubbleProps = {
  message: Message;
  opacity: number;
  scale: number;
  toolCallsVisible: number; // how many tool calls to show (for staggered reveal)
};

const ToolCallBlock: React.FC<{ call: ToolCall; opacity: number }> = ({
  call,
  opacity,
}) => {
  return (
    <div
      style={{
        opacity,
        border: `1px solid ${COLOR_TOOL_BORDER}`,
        borderRadius: 6,
        backgroundColor: COLOR_TOOL_BG,
        marginTop: 8,
        overflow: "hidden",
      }}
    >
      {/* Tool header */}
      <div
        style={{
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: call.result ? `1px solid ${COLOR_TOOL_BORDER}` : "none",
        }}
      >
        <span
          style={{
            color: COLOR_TOOL_LABEL,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE_LABEL,
            fontWeight: 600,
          }}
        >
          {call.tool}
        </span>
        {call.args && (
          <span
            style={{
              color: COLOR_TEXT_DIM,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE_LABEL,
            }}
          >
            {call.args}
          </span>
        )}
        <span
          style={{
            marginLeft: "auto",
            color: COLOR_SUCCESS,
            fontFamily: FONT_FAMILY,
            fontSize: 12,
          }}
        >
          ✓
        </span>
      </div>
      {/* Tool result */}
      {call.result && (
        <div
          style={{
            padding: "8px 14px",
            fontFamily: FONT_FAMILY,
            fontSize: 13,
            color: COLOR_TEXT_DIM,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
          }}
        >
          {call.result}
        </div>
      )}
    </div>
  );
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  opacity,
  scale,
  toolCallsVisible,
}) => {
  const isUser = message.role === "user";

  if (isUser) {
    // User prompt: bordered input box with > symbol
    return (
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <div
          style={{
            border: `1px solid ${COLOR_PROMPT_BORDER}`,
            borderRadius: 8,
            backgroundColor: COLOR_PROMPT_BG,
            padding: "12px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <span
            style={{
              color: COLOR_ACCENT,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE_BODY,
              fontWeight: 700,
              lineHeight: 1.6,
              flexShrink: 0,
            }}
          >
            &gt;
          </span>
          <span
            style={{
              color: COLOR_USER_TEXT,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE_BODY,
              lineHeight: 1.6,
            }}
          >
            {message.content}
          </span>
        </div>
      </div>
    );
  }

  // Assistant message: plain text + optional tool call blocks
  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <div
        style={{
          padding: "4px 16px 4px 32px",
        }}
      >
        <div
          style={{
            color: COLOR_ASSISTANT_TEXT,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE_BODY,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {message.content}
        </div>
        {message.toolCalls?.slice(0, toolCallsVisible).map((call, i) => (
          <ToolCallBlock key={i} call={call} opacity={1} />
        ))}
      </div>
    </div>
  );
};
