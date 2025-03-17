"use client"

import { useState, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import logo from "@/assets/chat/chatbot-logo.svg"


export default function ThinkingIndicator() {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-start mb-4 animate-pulse">
      <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      <div className="max-w-[80%]">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm">Thinking{dots}</p>
        </div>
      </div>
    </div>
  )
}

