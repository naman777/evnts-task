"use client"

import type React from "react"

import { useState } from "react"
import { Paperclip, Clock, Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
      <form onSubmit={handleSubmit} className="flex items-center">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <Paperclip className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="flex-1 p-2 mx-2 bg-transparent focus:outline-none"
        />

        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <Clock className="h-5 w-5" />
        </button>

        <button
          type="submit"
          className="p-2 text-white bg-purple-500 rounded-full hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

