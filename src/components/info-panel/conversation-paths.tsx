"use client";

import { useState, useEffect } from "react";

interface ConversationPathsProps {
  isThinking: boolean;
  suggestions: Suggestion[];
  handleSendMessage: (message: string) => void;
}

export interface Suggestion {
  id: string;
  content: string;
  clarification: string;
  percentageImprovement: number;
}

export default function ConversationPaths({
  isThinking,
  suggestions = [],
  handleSendMessage,
}: ConversationPathsProps) {
  const [dots, setDots] = useState<{ id: number; row: number; col: number }[]>([]);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create the exact triangle pattern from the image
  useEffect(() => {
    // Hardcoded number of dots per row to match the image exactly
    const dotsPerRow = [31, 29, 27, 25, 23, 21, 19, 17,5,1];
    const dotsArray = [];
    let id = 0;
    
    for (let row = 0; row < dotsPerRow.length; row++) {
      for (let col = 0; col < dotsPerRow[row]; col++) {
        dotsArray.push({ 
          id: id++, 
          row: row,
          col: col
        });
      }
    }
    
    setDots(dotsArray);

    // Simulate loading time and then set loaded
    if (isThinking) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [isThinking]);

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

  // Hardcoded suggestion positions based on the exact image
  const getSuggestionPositions = () => {
    if (!suggestions || suggestions.length === 0) return [];

    // These positions match the image exactly
    // Based on counting the dots in the image
    const positions = [
      70,  // 3rd row, middle position
      140, // 5th row, right side
      220  // Bottom row, center
    ];

    return positions.slice(0, suggestions.length);
  };

  const suggestionPositions = getSuggestionPositions();

  return (
    <div className="mb-6 relative">
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
            d="M8 1.5L1 14.5H15L8 1.5Z"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-1 text-sm text-gray-500">
          {isThinking
            ? "Calculating possible conversation paths"
            : `Calculating possible conversation paths - ${suggestions.length} suggestions found.`}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mx-auto bg-[#faf5f5]  rounded-lg">
        {/* Group dots by row */}
        {Array.from(new Set(dots.map(dot => dot.row))).map(rowIndex => {
          const rowDots = dots.filter(dot => dot.row === rowIndex);
          
          return (
            <div key={`row-${rowIndex}`} className="flex gap-1 my-0.5 justify-center">
              {rowDots.map((dot) => {
                const dotIndex = dots.findIndex(d => d.id === dot.id);
                const isSuggestionDot =
                  !isThinking && isLoaded && suggestionPositions.includes(dotIndex);
                const suggestionIndex = suggestionPositions.indexOf(dotIndex);

                return (
                  <div
                    key={`dot-${dot.id}`}
                    className={`h-2 w-2 rounded-full shadow-md ${
                      isThinking 
                        ? "bg-blue-400" 
                        : isSuggestionDot 
                          ? "bg-gradient-to-t from-pink-500 via-pink-400 to-white suggestion-dot" 
                          : "bg-gray-300"
                    } transition-all duration-300`}
                    style={{
                      opacity: isThinking
                        ? Math.random() > 0.7
                          ? 1
                          : 0.7
                        : 1,
                      transform: isThinking
                        ? `scale(${Math.random() > 0.8 ? 1.2 : 1})`
                        : activeSuggestionIndex === suggestionIndex
                        ? "scale(1.5)"
                        : "scale(1)",
                      cursor: isSuggestionDot ? "pointer" : "default",
                      zIndex: isSuggestionDot ? 10 : 1,
                      animation: isThinking
                        ? `${Math.random() > 0.5 ? "pulse" : "none"} ${
                            Math.random() * 2 + 1
                          }s infinite`
                        : "none",
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
          );
        })}
      </div>

      {/* Suggestion card on click */}
      {hoveredSuggestion && hoverPosition && (
        <div
          className="fixed z-50 suggestion-card"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y - 133}px`, // Adjust to position above the dot
            transform: "translate(-50%, 0)",
          }}
        >
          {/* Gradient Border Wrapper */}
          <div
            className="relative p-[1.5px] rounded-lg"
            style={{
              background: "linear-gradient(to right, #1977F2, #D22163)",
            }}
          >
            {/* Card with Padding Inside Gradient Border */}
            <div className="bg-[#FAF9F5] shadow-lg p-4 border w-80 relative rounded-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-2">
                <div className="flex items-center">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-800">
                    +{hoveredSuggestion.percentageImprovement}%
                  </span>
                  <span className="ml-2 text-sm text-green-600">
                    {hoveredSuggestion.clarification}
                  </span>
                </div>

                <button
                  className="px-4 py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1977F2] to-[#D22163] text-sm font-medium border border-transparent cursor-pointer"
                  onClick={(e) => handleUseButtonClick(hoveredSuggestion, e)}
                >
                  Use suggestion
                </button>
              </div>

              {/* Suggestion Content */}
              <p className="text-[#545961]">{hoveredSuggestion.content}</p>

              {/* Triangle at the Bottom with White Fill & Gradient Border */}
              <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-4 h-4">
                <div
                  className="w-4 h-4 bg-[#FAF9F5] rotate-45 border-b border-r"
                  style={{
                    borderImage:
                      "linear-gradient(to right, #1977F2, #D22163) 2",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
