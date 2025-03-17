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
import InfoHeader from "../info-panel/info-header";
import BackGroundImage from "@/assets/chat/chat-bg.jpeg";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([initialMessages[0]]);
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);
  const [progress, setProgress] = useState(15);
  const [isThinking, setIsThinking] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionMessages, setPredictionMessages] = useState<Message[]>([]);
  const isMobile = useMobile();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const [infoPanelWidth, setInfoPanelWidth] = useState(600); // Initial width
  const [isResizing, setIsResizing] = useState(false);

  const currentMessage = messages[currentMessageIndex];
  const filteredSuggestions = suggestions.filter(
    (s) => s.messageId === currentMessage?.id
  );

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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

    // Add user message to chat
    setMessages((prev) => [...prev, newMessage]);
    console.log("User message:", newMessage);
    // Find a matching suggestion
    const matchedSuggestion = initialSuggestions.find(
      (suggestion) => suggestion.content.toLowerCase() === content.toLowerCase()
    );

    if (!matchedSuggestion) {
      // If no match is found, send an error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        content:
          "I didn't understand. Please select from the available options.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsThinking(false);
      return;
    }

    setIsThinking(true);
    setProgress((prev) => Math.min(prev + 10, 100));

    // Find the next message based on the matched suggestion
    const nextMessageIndex = initialMessages.findIndex(
      (msg) => msg.id === matchedSuggestion.messageId
    );

    if (
      nextMessageIndex === -1 ||
      nextMessageIndex === initialMessages.length - 1
    ) {
      // No next message found (end of conversation)
      setIsThinking(false);
      return;
    }

    const nextBotMessage = initialMessages[nextMessageIndex + 1];
    console.log(nextBotMessage)
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, nextBotMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleUseSuggestion = (suggestion: Suggestion) => {
    handleSendMessage(suggestion.content, true);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => prev + 2); // Move to the next message
    }, 1000);
  };

  const handlePredictMessages = (suggestionId: string) => {
    setShowPrediction(true);

    // Find the selected suggestion
    const selectedSuggestion = initialSuggestions.find(
      (s) => s.id === suggestionId
    );

    if (!selectedSuggestion) {
      console.error("Suggestion not found.");
      return;
    }

    // Create the predicted user message
    const predictedUserMessage: Message = {
      id: `prediction-${Date.now()}`,
      sender: "user",
      content: selectedSuggestion.content,
      timestamp: new Date().toISOString(),
      isUserSuggestion: true,
    };

    // Find the next message by messageId + 1
    const nextMessageId = (
      parseInt(selectedSuggestion.messageId) + 1
    ).toString();
    const nextMessage = initialMessages.find((msg) => msg.id === nextMessageId);

    if (!nextMessage) {
      console.error("No valid next message found.");
      setPredictionMessages([predictedUserMessage]);
      return;
    }

    // Create the predicted bot message
    const predictedBotMessage: Message = {
      ...nextMessage,
      id: `prediction-${Date.now() + 1}`,
      timestamp: new Date().toISOString(),
    };

    // Set the predicted messages
    setPredictionMessages([predictedUserMessage, predictedBotMessage]);
  };

  const closePrediction = () => {
    setShowPrediction(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#FAF9F5]">
      <Sidebar />
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
          <ChatHeader username="Fabio Rossi" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
            <ChatNavbar />
            <div className="flex flex-1 overflow-hidden">
              <div className="h-full w-8 bg-gray-50 flex-shrink-0">
                <ProgressBar progress={progress} />
              </div>

              <div className="flex-1 flex flex-col min-w-0 h-full relative mx-4">
                <div
                  className="flex-1 overflow-y-auto pl-4 no-scrollbar"
                  style={{
                    backgroundImage: `url(${BackGroundImage.src})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                  }}
                >
                  <ChatArea
                    messages={messages}
                    isThinking={isThinking}
                    progress={progress}
                    showPrediction={showPrediction}
                    predictionMessages={predictionMessages}
                    onClosePrediction={closePrediction}
                    handleSendMessage={(message:string)=>{
                      handleUseSuggestion({
                        id: "1",
                        messageId: "1",
                        content: message,
                        clarification: "",
                        percentageImprovement: 15,

                      })
                    }}
                  />
                </div>

                <div className="sticky bottom-0 bg-white   border-t border-gray-200 w-full z-10">
                  <ChatInput onSendMessage={handleSendMessage} />
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-2 cursor-col-resize bg-gray-300 hover:bg-gray-400 flex-shrink-0"
            onMouseDown={handleMouseDown}
          />

          <div
            className="h-full flex-shrink-0 overflow-hidden bg-[#FAF9F5]"
            style={{ width: `${infoPanelWidth}px` }}
          >
            <div className="flex flex-col h-full">
              <div className="sticky top-0 z-10 bg-[#FAF9F5] border-b border-gray-200">
                <InfoHeader />
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                <InfoPanel
                  lastMessage={currentMessage}
                  isThinking={isThinking}
                  suggestions={filteredSuggestions}
                  onUseSuggestion={handleUseSuggestion}
                  //@ts-ignore
                  onPredictMessages={(suggestionId: string) =>
                    handlePredictMessages(suggestionId)
                  } // Correctly passing suggestionId
                  //@ts-ignore
                  handleSendMessage={(message:string) => handleSendMessage(message)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
