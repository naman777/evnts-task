"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@/types/chat";
import { Check, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import chatBotImage from "@/assets/chat/chatbot-logo.svg";
import Image from "next/image";

interface MessageBubbleProps {
  message: Message;
  isPrediction?: boolean;
}

export default function MessageBubble({ message, isPrediction = false }: MessageBubbleProps) {
  const isBot = message.sender === "bot";
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    // Ensure the timestamp is formatted consistently on the client
    setFormattedTime(
      new Date(message.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [message.timestamp]);

  if (isBot) {
    return (
      <div className={cn("flex items-end mb-4 gap-2", isPrediction && "opacity-80")}>
        <Image src={chatBotImage} alt="Chatbot" width={24} height={24} className="rounded-full pb-8" />

        <div className="max-w-[80%]">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="text-xs text-gray-500 mt-1">{formattedTime}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-end mb-4", isPrediction && "opacity-80")}>
      <div className="flex items-start justify-end max-w-[80%]">
        <div className="mr-2">
          <div
            className={cn(
              "p-3 rounded-lg shadow-sm",
              message.isUserSuggestion ? "bg-[#E1FFC7] text-[#545961]" : "bg-[#E1FFC7] text-[#545961]"
            )}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="flex justify-end text-xs text-gray-500 mt-1">
            {formattedTime}
            <Check className="h-4 w-4 ml-1 text-green-500" />
          </div>
        </div>
        <Avatar className="h-10 w-10 bg-gray-200">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Fabio" />
          <AvatarFallback>FR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
