"use client";

import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import toast from "react-hot-toast";

// Define the Suggestion type if not imported
interface Suggestion {
  id: string;
  content: string;
  clarification: string;
  percentageImprovement: number;
}

interface SuggestionListProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onUseSuggestion: (suggestion: Suggestion) => void;
  onPredictMessages: (id: string) => void;
}

export default function SuggestionList({
  suggestions,
  isLoading,
  onUseSuggestion,
  onPredictMessages,
}: SuggestionListProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleUseSuggestion = (suggestion: Suggestion) => {
    setLoadingStates((prev) => ({ ...prev, [suggestion.id]: true }));

    // Simulate loading
    setTimeout(() => {
      onUseSuggestion(suggestion);
      setLoadingStates((prev) => ({ ...prev, [suggestion.id]: false }));
    }, 500);
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1"
        >
          <path
            d="M8 1.5C8 1.5 3 4.5 3 8.5C3 10.4891 4.01089 12 5.5 12C6.98911 12 8 10.4891 8 8.5C8 10.4891 9.01089 12 10.5 12C11.9891 12 13 10.4891 13 8.5C13 4.5 8 1.5 8 1.5Z"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm text-gray-500">
          {isLoading
            ? "Best follow-up suggestions"
            : "Top message follow-up recommendation"}
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <SuggestionSkeleton />
          <SuggestionSkeleton />
        </div>
      ) : (
        suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-gradient-to-r from-[#fdf0f8] to-[#faeaf8] p-4 rounded-md shadow-sm mb-3 border-2 border-blue-500"
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
                      Using this suggestion improves conversation quality by{" "}
                      {suggestion.percentageImprovement}%
                    </p>
                  </HoverCardContent>
                </HoverCard>
                <span className="text-xs text-black ml-2">
                  {suggestion.clarification}
                </span>
              </div>

              <div className="flex items-center gap-1 justify-center">
                <button
                  onClick={() => onPredictMessages(suggestion.id)}
                  className="text-sm font-semibold bg-gradient-to-r from-[#1977F2] to-[#D22163] text-transparent bg-clip-text flex items-center cursor-pointer"
                  type="button"
                >
                  Preview Next Messages
                </button>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(suggestion.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <rect x="2" y="2" width="8" height="8" rx="1" stroke="#6B7280" strokeWidth="1.5" />
                  <path d="M6 6H13C13.5523 6 14 6.44772 14 7V13C14 13.5523 13.5523 14 13 14H7C6.44772 14 6 13.5523 6 13V6Z" stroke="#6B7280" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <p className="text-sm text-[#545961] mb-2">{suggestion.content}</p>

            <button
              onClick={() => handleUseSuggestion(suggestion)}
              disabled={loadingStates[suggestion.id]}
              className="text-sm font-semibold bg-gradient-to-r from-[#1977F2] to-[#D22163] text-transparent bg-clip-text cursor-pointer"
            >
              {loadingStates[suggestion.id] ? "Sending..." : "Use suggestion"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function SuggestionSkeleton() {
  return (
    <div className="bg-gradient-to-r from-[#fdf0f8] to-[#faeaf8]  p-4 rounded-md shadow-sm mb-3 border border-pink-200 overflow-hidden ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Skeleton className="h-4 w-8 rounded-full bg-gray-300" />
          <Skeleton className="h-4 w-20 ml-2 rounded-sm bg-gray-300" />
        </div>
        <Skeleton className="h-4 w-32 rounded-sm bg-gray-300" />
      </div>

      <Skeleton className="h-4 w-full mb-2 rounded-sm bg-gray-300" />
      <Skeleton className="h-4 w-4/5 mb-2 rounded-sm bg-gray-300" />
      <Skeleton className="h-4 w-2/5 mb-4 rounded-sm bg-gray-300" />

      <Skeleton className="h-4 w-24 rounded-sm bg-gray-300" />

  
     
    </div>
  );
}
