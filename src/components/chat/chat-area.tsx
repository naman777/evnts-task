"use client";

import { useRef, useEffect } from "react";
import type { Message } from "@/types/chat";
import MessageBubble from "@/components/chat/message-bubble";
import ThinkingIndicator from "@/components/chat/thinking-indicator";
import { X } from "lucide-react";
import BackGroundImage from "@/assets/chat/chat-bg.jpeg";
import Image from "next/image";
import logo from "@/assets/chat/chatbot-logo.svg";

interface ChatAreaProps {
  messages: Message[];
  isThinking: boolean;
  progress: number;
  showPrediction: boolean;
  predictionMessages: Message[];
  onClosePrediction: () => void;
  handleSendMessage: (message: string) => void;
}

export default function ChatArea({
  messages,
  isThinking,
  showPrediction,
  predictionMessages,
  onClosePrediction,
  handleSendMessage
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
          <div className="relative mt-4 rounded-md bg-transparent border border-[#6366f1]/10 shadow-md overflow-hidden">
            {/* Close button */}
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={onClosePrediction}
                className="p-1 rounded-full hover:bg-gray-100 bg-white/80"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <div className="bg-[#f9f5f2]/50 ">
              <div className="text-center text-sm text-gray-600 py-3 flex items-center justify-center gap-3">
                <div className="h-[1px] bg-gray-300 flex-1 max-w-[120px]"></div>
                <span className="bg-white px-2 rounded-md py-1">
                  Beginning of Prediction
                </span>
                <div className="h-[1px] bg-gray-300 flex-1 max-w-[120px]"></div>
              </div>

              <div className="px-4 py-2">
                {predictionMessages.map((message, index) => (
                  <div key={message.id || index} className="mb-4">
                    {
                      //@ts-ignore
                      message.sender === "user" ? (
                        <div>
                          <div className="p-2 flex  justify-end pr-12 rounded-md">
                            <button
                              className="px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1977F2] to-[#D22163] border border-transparent rounded-md hover:bg-[#1977F2]/5 transition-colors text-xs font-medium"
                              style={{
                                borderImage:
                                  "linear-gradient(to right, #1977F2, #D22163) 1",
                              }}
                              onClick={()=>{
                                handleSendMessage(message.content)  
                                onClosePrediction()
                              }}
                            >
                              Use suggestion
                            </button>
                          </div>
                          <div className="flex justify-end items-end gap-2">
                            <div className="flex flex-col items-end">
                              <div className="bg-[#d1ffc9] rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] break-words">
                                <p>{message.content}</p>
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src="/placeholder.svg?height=32&width=32"
                                alt="User"
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end gap-2">
                          <div className="">
                            <Image
                              src={logo}
                              alt="Assistant"
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] break-words shadow-sm">
                              <p>{message.content}</p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                ))}
              </div>

              <div className="text-center text-sm text-gray-600 py-3 flex items-center justify-center gap-3">
                <div className="h-[1px] bg-gray-300 flex-1 max-w-[120px]"></div>
                <span className="bg-white px-2 rounded-md py-1">
                  End of Prediction
                </span>
                <div className="h-[1px] bg-gray-300 flex-1 max-w-[120px]"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
