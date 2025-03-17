"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Paths from "@/assets/info-panel/paths.svg";
import Image from "next/image";

interface ConversationPathsProps {
  isThinking: boolean;
  suggestions: Suggestion[];
  onUseSuggestion?: (suggestion: Suggestion) => void;
  handleSendMessage: (message: string) => void;
}

export interface Suggestion {
  messageId: string;
  id: string;
  content: string;
  clarification: string;
  percentageImprovement: number;
}

export default function ConversationPaths({
  isThinking,
  suggestions,
  onUseSuggestion,
  handleSendMessage,
}: ConversationPathsProps) {
  const [dots, setDots] = useState<
    { id: number; color: string; opacity: number }[]
  >([]);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion | null>(
    null
  );
  const [hoverPosition, setHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    // Generate dots in a diamond pattern
    const newDots = [];
    const rows = 15;
    const dotsPerRow = 11;
    const totalDots = rows * dotsPerRow;

    for (let i = 0; i < totalDots; i++) {
      const row = Math.floor(i / dotsPerRow);
      const col = i % dotsPerRow;

      // Calculate distance from center to create diamond shape
      const centerRow = rows / 2;
      const centerCol = dotsPerRow / 2;
      const distanceFromCenter =
        Math.abs(row - centerRow) + Math.abs(col - centerCol);

      // Determine color and opacity based on distance
      let color = "bg-blue-500";
      let opacity = 1 - distanceFromCenter / (rows + dotsPerRow / 2);

      if (opacity < 0.3) {
        opacity = 0.3;
      }

      if (distanceFromCenter > 5) {
        color = "bg-blue-300";
      }

      if (distanceFromCenter > 8) {
        color = "bg-gray-200";
      }

      newDots.push({ id: i, color, opacity });
    }

    setDots(newDots);
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".suggestion-card") &&
        !target.closest(".suggestion-dot")
      ) {
        setActiveSuggestionIndex(null);
        setHoveredSuggestion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDotClick = (suggestionIndex: number, event: React.MouseEvent) => {
    event.stopPropagation();

    // Toggle the card if clicking the same dot
    if (activeSuggestionIndex === suggestionIndex) {
      setActiveSuggestionIndex(null);
      setHoveredSuggestion(null);
      return;
    }

    setActiveSuggestionIndex(suggestionIndex);
    setHoveredSuggestion(suggestions[suggestionIndex]);

    // Position the card above the dot
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    });
  };

  const handleUseButtonClick = (
    suggestion: Suggestion,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    handleSendMessage(suggestion.content);
    // Close the card after using
    setActiveSuggestionIndex(null);
    setHoveredSuggestion(null);
  };

  // Find positions for suggestion dots - place them at strategic points in the diamond
  const getSuggestionPositions = () => {
    if (!suggestions || suggestions.length === 0) return [];

    // Get positions that are roughly in the middle area of the diamond
    const positions = [
      { row: 5, col: 5 },
      { row: 7, col: 3 },
      { row: 9, col: 5 },
    ];

    return positions.slice(0, suggestions.length).map((pos, index) => {
      return pos.row * 11 + pos.col;
    });
  };

  const suggestionPositions = getSuggestionPositions();

  return (
    <div className="mb-6 relative">
      <div className="flex items-center mb-2">
        {/* <Sparkles className="h-4 w-4 mr-2 text-gray-500" /> */}
        <Image src={Paths} alt="path" height={16} width={16} />
        <span className="ml-1 text-sm text-gray-500">
          {isThinking
            ? "Calculating possible conversation paths"
            : `Calculating possible conversation paths - ${suggestions.length} suggestions found.`}
        </span>
      </div>

      <div className="flex flex-wrap justify-center max-w-[300px] mx-auto">
        {dots.map((dot, index) => {
          const isSuggestionDot =
            !isThinking && suggestionPositions.includes(index);
          const suggestionIndex = suggestionPositions.indexOf(index);

          return (
            <div
              key={dot.id}
              className={`h-2 w-2 m-0.5 rounded-full ${
                isSuggestionDot ? "bg-pink-500 suggestion-dot" : dot.color
              } transition-all duration-500`}
              style={{
                opacity: isThinking
                  ? Math.random() > 0.7
                    ? 1
                    : dot.opacity
                  : dot.opacity,
                transform: isThinking
                  ? `scale(${Math.random() > 0.8 ? 1.2 : 1})`
                  : activeSuggestionIndex === suggestionIndex
                  ? "scale(1.5)"
                  : "scale(1)",
                cursor: isSuggestionDot ? "pointer" : "default",
                zIndex: isSuggestionDot ? 10 : 1,
              }}
              onClick={
                isSuggestionDot
                  ? (e) => handleDotClick(suggestionIndex, e)
                  : undefined
              }
            />
          );
        })}
      </div>

      {/* Suggestion card on click */}
      {hoveredSuggestion && hoverPosition && (
        <div
          className="fixed z-50"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y - 120}px`,
            transform: "translate(-50%, 0)",
          }}
        >
          {/* Gradient Border Wrapper */}
          <div
            className="p-[1.5px] "
            style={{
              background: "linear-gradient(to right, #1977F2, #D22163)",
            }}
          >
            {/* Card with Padding Inside Gradient Border */}
            <div className="bg-[#FAF9F5] shadow-lg p-4 border  w-80">
              <div className="flex items-center mb-2 border-b border-gray-200 pb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-800">
                  +{hoveredSuggestion.percentageImprovement}%
                </span>
                <span className="ml-2 text-sm text-green-600">
                  {hoveredSuggestion.clarification}
                </span>

                <button
                  className="px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1977F2] to-[#D22163] text-sm font-medium border border-transparent"
                  onClick={(e) => handleUseButtonClick(hoveredSuggestion, e)}
                >
                  Use suggestion
                </button>
              </div>
              <p className="text-[#545961] mb-3">{hoveredSuggestion.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
