"use client"

import type React from "react"
import { useState } from "react"
import { Paperclip, Clock, Send } from "lucide-react"
import sendButton from "@/assets/chat/send-button.svg"

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
    <div className="absolute bottom-0 left-0 right-0 bg-[#E3EDE7] py-3 px-4 flex items-center gap-3">
      <button type="button" className="text-gray-500 hover:text-gray-700">
        <Paperclip className="h-5 w-5" />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="flex-1 px-4 py-2 bg-white rounded-full outline-none text-sm"
      />

      <button type="button" className="text-gray-500 hover:text-gray-700">
        <Clock className="h-5 w-5" />
      </button>

      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1.5 pr-2 flex items-center justify-center"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  )
}
