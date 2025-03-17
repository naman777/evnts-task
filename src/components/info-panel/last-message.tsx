import type { Message } from "@/types/chat"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare } from "lucide-react"

interface LastMessageProps {
  message: Message
}

export default function LastMessage({ message }: LastMessageProps) {
  if (!message) return null

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-500">Last message</span>
      </div>

      <div className="bg-white p-3 rounded-md shadow-sm flex items-start">
        <Avatar className="h-6 w-6 mr-2 bg-purple-500 shrink-0">
          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="OraclA" />
          <AvatarFallback className="bg-purple-500 text-white text-xs">OA</AvatarFallback>
        </Avatar>

        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}

