"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@/types/chat";
import { Check } from "lucide-react";
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
    setFormattedTime(
      new Date(message.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [message.timestamp]);

  if (isBot) {
    return (
      <div className="flex items-end gap-2 mb-4" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
        {/* Bot Avatar */}
        <Image src={chatBotImage} alt="Chatbot" width={32} height={32} className="rounded-full" />

        <div className="max-w-[75%]">
          <div className="relative bg-white p-3 rounded-lg shadow-md text-sm text-black">
            <p className="pb-2">{message.content}</p>
            {/* Time inside the bubble */}
            <span className="absolute bottom-1 right-2 text-[10px] text-gray-400">{formattedTime}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-4 min-w-[2rem]">
      <div className="flex flex-col items-end max-w-[300px]">
        <div className="relative bg-[#DCF8C6] p-3 rounded-lg shadow-md text-sm text-[#545961] min-w-[7rem] max-w-[550px]">
          <p className="pb-2">{message.content}</p>
  
          {/* Time & checkmark inside the bubble */}
          <span className="absolute bottom-1 right-6 text-[10px] text-gray-600">{formattedTime}</span>
          <Check className="absolute bottom-1 right-2 h-4 w-4 text-green-500" />
        </div>
      </div>
  
      {/* User Avatar */}
      <Avatar className="h-8 w-8 ml-2">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
        <AvatarFallback>FR</AvatarFallback>
      </Avatar>
    </div>
  );
  
}
