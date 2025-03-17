"use client"

import { useState } from "react"
import type { Suggestion } from "@/types/chat"
import { Sparkles, MessageSquare } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Skeleton } from "@/components/ui/skeleton"
import AiImage from "@/assets/info-panel/ai.svg"
import Image from "next/image"


interface SuggestionListProps {
  suggestions: Suggestion[]
  isLoading: boolean
  onUseSuggestion: (suggestion: Suggestion) => void
  onPredictMessages: (id:string) => void
}

export default function SuggestionList({
  suggestions,
  isLoading,
  onUseSuggestion,
  onPredictMessages,
}: SuggestionListProps) {
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
      <div className="flex items-center mb-2 ">
        <Image src={AiImage} alt="AI" width={16} height={16} />
        <span className="text-sm text-gray-500">
          {isLoading ? "Best follow-up suggestions" : "Top message follow-up recommendation"}
        </span>
      </div>

      {isLoading ? (
        <>
          <SuggestionSkeleton />
          <SuggestionSkeleton />
        </>
      ) : (
        suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-gradient-to-r from-[#fdf0f8] to-[#faeaf8] p-4 rounded-md shadow-sm mb-3 border-2 border-blue-500 "
          >
            <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
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
                <span className="text-xs text-black ml-2">{suggestion.clarification}</span>
              </div>

              <button
                onClick={()=> onPredictMessages(suggestion.id)}
              className="text-sm font-semibold bg-gradient-to-r from-[#1977F2] to-[#D22163] text-transparent bg-clip-text flex items-center">
              
                Preview Next Messages
                <MessageSquare className="h-3 w-3 ml-1" />
              </button>
            </div>

            <p className="text-sm text-[#545961] mb-2">{suggestion.content}</p>

            <button
              onClick={() => handleUseSuggestion(suggestion)}
              disabled={loadingStates[suggestion.id]}
              className="text-sm font-semibold bg-gradient-to-r from-[#1977F2] to-[#D22163] text-transparent bg-clip-text"
            >
              {loadingStates[suggestion.id] ? "Sending..." : "Use suggestion"}
            </button>
          </div>
        ))
      )}
    </div>
  )
}

function SuggestionSkeleton() {
  return (
    <div className="bg-gradient-to-r from-[#fdf0f8] to-[#faeaf8] p-4 rounded-md shadow-sm mb-3 border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Skeleton className="h-4 w-8 rounded-full bg-gray-200" />
          <Skeleton className="h-4 w-20 ml-2 rounded-sm bg-gray-200" />
        </div>
        <Skeleton className="h-4 w-32 rounded-sm bg-gray-200" />
      </div>

      <Skeleton className="h-4 w-full mb-2 rounded-sm bg-gray-200" />
      <Skeleton className="h-4 w-4/5 mb-2 rounded-sm bg-gray-200" />
      <Skeleton className="h-4 w-2/5 mb-4 rounded-sm bg-gray-200" />

      <Skeleton className="h-4 w-24 rounded-sm bg-gray-200" />
    </div>
  )
}

