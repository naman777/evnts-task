import type { Message } from "@/types/chat";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import chatBotLogo from "@/assets/chat/chatbot-logo.svg";
import Image from "next/image";

interface LastMessageProps {
  message: Message;
}

export default function LastMessage({ message }: LastMessageProps) {
  if (!message) return null;

  const formattedTime = message.timestamp
  ? new Date(message.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "N/A";

  return (
    <div className="mb-6" >
      {/* Last Message Header */}
      <div className="flex mb-2">
        <MessageSquare className="h-4 w-4 mr-2 mt-1 text-gray-500" />
        <span className="text-sm text-gray-500">Last message</span>
      </div>

      {/* Message Bubble */}
      <div className="flex items-end gap-2">
        {/* Bot Avatar */}
        {message.sender === "bot" && (
          <Image
            src={chatBotLogo}
            alt="Chatbot"
            width={24}
            height={24}
            className="rounded-full"
          />
        )}

        <div className="bg-white p-3 rounded-md shadow-sm flex items-start border border-gray-100 gap-2 relative" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
          {/* Message Content */}
          <p className="text-sm pb-2">
            {message.content}
            {message.content.includes("select your role") && (
              <span className="font-bold"> select your role</span>
            )}
          </p>

          {/* Timestamp inside bubble */}
          <span className="absolute bottom-1 right-2 text-[10px] text-gray-500">
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
}
