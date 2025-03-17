"use client";

import { useRef, useEffect } from "react";
import type { Message } from "@/types/chat";
import MessageBubble from "@/components/chat/message-bubble";
import ThinkingIndicator from "@/components/chat/thinking-indicator";
import { X } from "lucide-react";
import BackGroundImage from "@/assets/chat/chat-bg.jpeg";

interface ChatAreaProps {
  messages: Message[];
  isThinking: boolean;
  progress: number;
  showPrediction: boolean;
  predictionMessages: Message[];
  onClosePrediction: () => void;
}

export default function ChatArea({
  messages,
  isThinking,
  showPrediction,
  predictionMessages,
  onClosePrediction,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div
      className="relative flex-1 overflow-y-auto bg-[#f9f5f2]"
      style={{
        backgroundImage: `url(${BackGroundImage.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-4 pb-20">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isThinking && <ThinkingIndicator />}

        {showPrediction && (
          <div className="relative mt-4 border border-gray-200 rounded-md bg-white">
            <div className="absolute right-2 top-2">
              <button
                onClick={onClosePrediction}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 py-2 border-b border-gray-200">
              Beginning of Prediction
            </div>

            <div className="p-4">
              {predictionMessages.map((message) => (
                <MessageBubble key={message.id} message={message} isPrediction />
              ))}
            </div>

            <div className="text-center text-sm text-gray-500 py-2 border-t border-gray-200">
              End of Prediction
            </div>

            <div className="p-2 flex justify-center">
              <button
                className="px-4 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                onClick={onClosePrediction}
              >
                Use suggestion
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
