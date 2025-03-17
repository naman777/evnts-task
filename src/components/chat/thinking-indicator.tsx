"use client"

import { useState, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ThinkingIndicator() {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-start mb-4 animate-pulse">
      <Avatar className="h-8 w-8 mr-2 bg-purple-500">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="OraclA" />
        <AvatarFallback className="bg-purple-500 text-white text-xs">OA</AvatarFallback>
      </Avatar>
      <div className="max-w-[80%]">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm">Thinking{dots}</p>
        </div>
      </div>
    </div>
  )
}

