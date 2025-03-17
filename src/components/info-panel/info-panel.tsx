import type { Message, Suggestion } from "@/types/chat";
import StatusInfo from "@/components/info-panel/status-info";
import LastMessage from "@/components/info-panel/last-message";
import ConversationPaths from "@/components/info-panel/conversation-paths";
import SuggestionList from "@/components/info-panel/suggestion-list";
import InfoHeader from "./info-header";

interface InfoPanelProps {
  lastMessage: Message;
  isThinking: boolean;
  suggestions: Suggestion[];
  onUseSuggestion: (suggestion: Suggestion) => void;
  onPredictMessages: () => void;
  handleSendMessage: (message: string) => void;
}

export default function InfoPanel({
  lastMessage,
  isThinking,
  suggestions,
  onUseSuggestion,
  onPredictMessages,
  handleSendMessage,
}: InfoPanelProps) {
  return (
    <div className="w-full bg-gradient-to-t from-pink-50 via-pink-50 to-[#FAF9F5] h-screen  pt-3">
      <div className="flex flex-col gap-2 px-4">
        <StatusInfo  />
        <LastMessage message={lastMessage} />
        <ConversationPaths
          isThinking={isThinking}
          suggestions={suggestions}
          handleSendMessage={(content: string) => {
            onUseSuggestion({
              id: "0",
              messageId: "0",
              content,
              clarification: "",
              percentageImprovement: 0,
            });
          }}
        />
        <SuggestionList
          suggestions={suggestions}
          isLoading={isThinking}
          onUseSuggestion={onUseSuggestion}
          onPredictMessages={onPredictMessages}
        />
      </div>
    </div>
  );
}
