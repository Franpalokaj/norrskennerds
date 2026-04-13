import "./index.css";
import { Composition } from "remotion";
import { Conversation, computeTimings } from "./Conversation";
import { FPS, WIDTH, HEIGHT } from "./config";
import type { Message } from "./types";
import conversationData from "../public/conversation.json";

const messages = conversationData as Message[];
const { totalDurationFrames } = computeTimings(messages);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Conversation"
        component={Conversation}
        defaultProps={{ messages }}
        durationInFrames={totalDurationFrames}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
