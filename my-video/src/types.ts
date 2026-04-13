export type ToolCall = {
  tool: string; // e.g. "Read", "Edit", "Bash"
  args?: string; // e.g. file path or command
  result?: string; // brief output shown
};

export type Message = {
  role: "user" | "assistant";
  name?: string;
  content: string;
  toolCalls?: ToolCall[];
  delayBefore?: number;
};
