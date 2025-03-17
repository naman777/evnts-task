import type { Message, Suggestion } from "@/types/chat"
import StatusInfo from "@/components/info-panel/status-info"
import LastMessage from "@/components/info-panel/last-message"
import ConversationPaths from "@/components/info-panel/conversation-paths"
import SuggestionList from "@/components/info-panel/suggestion-list"

interface InfoPanelProps {
  lastMessage: Message
  isThinking: boolean
  suggestions: Suggestion[]
  onUseSuggestion: (suggestion: Suggestion) => void
  onPredictMessages: () => void
}

export default function InfoPanel({
  lastMessage,
  isThinking,
  suggestions,
  onUseSuggestion,
  onPredictMessages,
}: InfoPanelProps) {
  return (
    <div className="w-full  bg-gradient-to-b from-[#fffdf7] to-[#fff9f9] p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-purple-700 font-medium">OraclA cl-pro</div>
        <div className="text-gray-500">
          <svg className="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <StatusInfo />
      <LastMessage message={lastMessage} />

      <ConversationPaths isThinking={isThinking} />

      <SuggestionList
        suggestions={suggestions}
        isLoading={isThinking}
        onUseSuggestion={onUseSuggestion}
        onPredictMessages={onPredictMessages}
      />
    </div>
  )
}

