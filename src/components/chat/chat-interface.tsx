"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import ChatHeader from "@/components/chat/chat-header"
import ChatArea from "@/components/chat/chat-area"
import ChatInput from "@/components/chat/chat-input"
import InfoPanel from "@/components/info-panel/info-panel"
import { useMobile } from "@/hooks/use-mobile"
import type { Message, Suggestion } from "@/types/chat"
import { initialMessages, initialSuggestions } from "@/data/initial-data"

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions)
  const [progress, setProgress] = useState(15)
  const [isThinking, setIsThinking] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)
  const [predictionMessages, setPredictionMessages] = useState<Message[]>([])
  const isMobile = useMobile()

  const handleSendMessage = (content: string, isUserSuggestion = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date().toISOString(),
      isUserSuggestion,
    }

    setMessages((prev) => [...prev, newMessage])
    setIsThinking(true)
    setProgress((prev) => Math.min(prev + 15, 100))

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse: Message

      if (content.includes("Owner/Manager")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          content: "Understood, how many Realtors are in your organization? (You can give an approximate number.)",
          timestamp: new Date().toISOString(),
        }

        setSuggestions([
          {
            id: "1",
            content: "I am an Owner/Manager",
            clarification: "Clarifies position",
            percentageImprovement: 15,
          },
          {
            id: "2",
            content: "I am a Realtor",
            clarification: "Clarifies position",
            percentageImprovement: 15,
          },
        ])
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          content: "Understood, are you independent or agency-affiliated?",
          timestamp: new Date().toISOString(),
        }
      }

      setMessages((prev) => [...prev, botResponse])
      setIsThinking(false)
    }, 2000)
  }

  const handleUseSuggestion = (suggestion: Suggestion) => {
    handleSendMessage(suggestion.content, true)
  }

  const handlePredictMessages = () => {
    setShowPrediction(true)
    setPredictionMessages([
      {
        id: "prediction-1",
        sender: "user",
        content: "I am an Owner/Manager",
        timestamp: new Date().toISOString(),
        isUserSuggestion: true,
      },
      {
        id: "prediction-2",
        sender: "bot",
        content: "Understood, how many Realtors are in your organization? (You can give an approximate number.)",
        timestamp: new Date().toISOString(),
      },
    ])
  }

  const closePrediction = () => {
    setShowPrediction(false)
  }

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatHeader username="Fabio Rossi" />

        <div className={`flex flex-1 ${isMobile ? "flex-col" : "flex-row"}`}>
          <div className="relative flex-1 border-r border-gray-200">
            <ChatArea
              messages={messages}
              isThinking={isThinking}
              progress={progress}
              showPrediction={showPrediction}
              predictionMessages={predictionMessages}
              onClosePrediction={closePrediction}
            />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>

          {(!isMobile || (isMobile && !isThinking)) && (
            <InfoPanel
              lastMessage={messages[messages.length - 1]}
              isThinking={isThinking}
              suggestions={suggestions}
              onUseSuggestion={handleUseSuggestion}
              onPredictMessages={handlePredictMessages}
            />
          )}
        </div>
      </div>
    </div>
  )
}

