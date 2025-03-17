"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import ChatHeader from "@/components/chat/chat-header";
import ChatArea from "@/components/chat/chat-area";
import ChatInput from "@/components/chat/chat-input";
import InfoPanel from "@/components/info-panel/info-panel";
import { useMobile } from "@/hooks/use-mobile";
import type { Message, Suggestion } from "@/types/chat";
import { initialMessages, initialSuggestions } from "@/data/initial-data";
import ProgressBar from "../ui/progress-bar";
import ChatNavbar from "./chat-navbar";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);
  const [progress, setProgress] = useState(15);
  const [isThinking, setIsThinking] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionMessages, setPredictionMessages] = useState<Message[]>([]);
  const isMobile = useMobile();

  const [infoPanelWidth, setInfoPanelWidth] = useState(300); // Initial width
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = window.innerWidth - e.clientX;
    setInfoPanelWidth(Math.max(250, Math.min(newWidth, 600))); // Min width 250px, max width 600px
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleSendMessage = (content: string, isUserSuggestion = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date().toISOString(),
      isUserSuggestion,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsThinking(true);
    setProgress((prev) => Math.min(prev + 10, 100));

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse: Message;

      if (content.includes("Owner/Manager")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          content:
            "Understood, how many Realtors are in your organization? (You can give an approximate number.)",
          timestamp: new Date().toISOString(),
        };

        setSuggestions([
          {
            id: "1",
            content: "I am an Owner/Manager",
            clarification: "Clarifies position",
            percentageImprovement: 15,
          },
          {
            id: "2",
            content: "I am a Realtor",
            clarification: "Clarifies position",
            percentageImprovement: 15,
          },
        ]);
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          content: "Understood, are you independent or agency-affiliated?",
          timestamp: new Date().toISOString(),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 2000);
  };

  const handleUseSuggestion = (suggestion: Suggestion) => {
    handleSendMessage(suggestion.content, true);
  };

  const handlePredictMessages = () => {
    setShowPrediction(true);
    setPredictionMessages([
      {
        id: "prediction-1",
        sender: "user",
        content: "I am an Owner/Manager",
        timestamp: new Date().toISOString(),
        isUserSuggestion: true,
      },
      {
        id: "prediction-2",
        sender: "bot",
        content:
          "Understood, how many Realtors are in your organization? (You can give an approximate number.)",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const closePrediction = () => {
    setShowPrediction(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <ChatHeader username="Fabio Rossi" />
        </div>
          <ChatNavbar />
          <div className="flex flex-1 overflow-hidden">
            <div className="h-full w-8 bg-gray-50">
              <ProgressBar progress={progress} />
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto pl-4 no-scrollbar">
              <ChatArea
                messages={messages}
                isThinking={isThinking}
                progress={progress}
                showPrediction={showPrediction}
                predictionMessages={predictionMessages}
                onClosePrediction={closePrediction}
              />
              <div className="sticky bottom-0 bg-white p-2 border-t border-gray-200">
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            </div>

          {/* Divider for resizing */}
          <div
            className="w-2 cursor-col-resize bg-gray-300 hover:bg-gray-400"
            onMouseDown={handleMouseDown}
            />

          <div
            className="overflow-y-auto overflow-x-hidden bg-gray-100 no-scrollbar"
            style={{ width: `${infoPanelWidth}px` }}
            >
            <InfoPanel
              lastMessage={messages[messages.length - 1]}
              isThinking={isThinking}
              suggestions={suggestions}
              onUseSuggestion={handleUseSuggestion}
              onPredictMessages={handlePredictMessages}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
