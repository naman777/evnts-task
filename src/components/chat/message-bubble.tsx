import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message } from "@/types/chat"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
  isPrediction?: boolean
}

export default function MessageBubble({ message, isPrediction = false }: MessageBubbleProps) {
  const isBot = message.sender === "bot"
  const time = new Date(message.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  if (isBot) {
    return (
      <div className={cn("flex items-start mb-4", isPrediction && "opacity-80")}>
        <Avatar className="h-8 w-8 mr-2 bg-purple-500">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="OraclA" />
          <AvatarFallback className="bg-purple-500 text-white text-xs">OA</AvatarFallback>
        </Avatar>
        <div className="max-w-[80%]">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="text-xs text-gray-500 mt-1">{time}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-end mb-4", isPrediction && "opacity-80")}>
      <div className="flex items-start justify-end max-w-[80%]">
        <div className="mr-2">
          <div
            className={cn(
              "p-3 rounded-lg shadow-sm",
              message.isUserSuggestion ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
            )}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="flex justify-end text-xs text-gray-500 mt-1">
            {time} {message.isUserSuggestion && <Check className="h-4 w-4 ml-1 text-green-500" />}
          </div>
        </div>
        <Avatar className="h-8 w-8 bg-gray-200">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>FR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

