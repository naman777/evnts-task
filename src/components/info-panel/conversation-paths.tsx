"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

interface ConversationPathsProps {
  isThinking: boolean
}

export default function ConversationPaths({ isThinking }: ConversationPathsProps) {
  const [dots, setDots] = useState<{ id: number; color: string; opacity: number }[]>([])

  useEffect(() => {
    // Generate dots in a diamond pattern
    const newDots = []
    const rows = 10
    const dotsPerRow = 11
    const totalDots = rows * dotsPerRow

    for (let i = 0; i < totalDots; i++) {
      const row = Math.floor(i / dotsPerRow)
      const col = i % dotsPerRow

      // Calculate distance from center to create diamond shape
      const centerRow = rows / 2
      const centerCol = dotsPerRow / 2
      const distanceFromCenter = Math.abs(row - centerRow) + Math.abs(col - centerCol)

      // Determine color and opacity based on distance
      let color = "bg-blue-500"
      let opacity = 1 - distanceFromCenter / (rows + dotsPerRow / 2)

      if (opacity < 0.3) {
        opacity = 0.3
      }

      if (distanceFromCenter > 5) {
        color = "bg-blue-300"
      }

      if (distanceFromCenter > 8) {
        color = "bg-gray-200"
      }

      newDots.push({ id: i, color, opacity })
    }

    setDots(newDots)
  }, [])

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Sparkles className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-500">
          {isThinking
            ? "Calculating possible conversation paths"
            : "Calculating possible conversation paths - 3 suggestions found."}
        </span>
      </div>

      <div className="flex flex-wrap justify-center max-w-[300px] mx-auto">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className={`h-2 w-2 m-0.5 rounded-full ${dot.color} transition-all duration-500`}
            style={{
              opacity: isThinking ? (Math.random() > 0.7 ? 1 : dot.opacity) : dot.opacity,
              transform: isThinking ? `scale(${Math.random() > 0.8 ? 1.2 : 1})` : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

