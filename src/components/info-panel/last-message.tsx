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

  return (
    <div className="mb-6">
      <div className="flex  mb-2">
        <MessageSquare className="h-4 w-4 mr-2 mt-1 text-gray-500" />
        <span className="text-sm text-gray-500">Last message</span>
      </div>

      <div className="flex items-end gap-2">
        {message.sender === "bot" && (
          <Image
            src={chatBotLogo}
            alt="Chatbot"
            width={24}
            height={24}
            className="rounded-full "
          />
        )}
        <div className="bg-white p-3 rounded-md shadow-sm flex items-start border border-gray-100 gap-2">
          <p className="text-sm">
            {message.content}
            {message.content.includes("select your role") && (
              <span className="font-bold"> select your role</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
