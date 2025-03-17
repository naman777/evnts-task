"use client"

import { useState } from "react"
import type { Suggestion } from "@/types/chat"
import { Sparkles, MessageSquare } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface SuggestionListProps {
  suggestions: Suggestion[]
  onUseSuggestion: (suggestion: Suggestion) => void
  onPredictMessages: () => void
}

export default function SuggestionList({ suggestions, onUseSuggestion, onPredictMessages }: SuggestionListProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const handleUseSuggestion = (suggestion: Suggestion) => {
    setLoadingStates((prev) => ({ ...prev, [suggestion.id]: true }))

    // Simulate loading
    setTimeout(() => {
      onUseSuggestion(suggestion)
      setLoadingStates((prev) => ({ ...prev, [suggestion.id]: false }))
    }, 500)
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        <Sparkles className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-500">Top message follow-up recommendation</span>
      </div>

      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="bg-white p-4 rounded-md shadow-sm mb-3 border border-pink-100">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full cursor-help">
                    +{suggestion.percentageImprovement}%
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-48 p-2">
                  <p className="text-xs">
                    Using this suggestion improves conversation quality by {suggestion.percentageImprovement}%
                  </p>
                </HoverCardContent>
              </HoverCard>
              <span className="text-xs text-gray-500 ml-2">{suggestion.clarification}</span>
            </div>

            <button
              onClick={onPredictMessages}
              className="text-xs text-purple-600 hover:text-purple-800 flex items-center"
            >
              Predict Next Messages
              <MessageSquare className="h-3 w-3 ml-1" />
            </button>
          </div>

          <p className="text-sm mb-2">{suggestion.content}</p>

          <button
            onClick={() => handleUseSuggestion(suggestion)}
            disabled={loadingStates[suggestion.id]}
            className="text-xs text-purple-600 hover:text-purple-800 disabled:opacity-50"
          >
            {loadingStates[suggestion.id] ? "Sending..." : "Use suggestion"}
          </button>
        </div>
      ))}
    </div>
  )
}

