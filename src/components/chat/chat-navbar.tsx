"use client";

import Image from "next/image";
import logo from "@/assets/chat/chatbot-logo.svg"

export default function ChatNavbar() {
  return (
    <div className="flex items-center justify-between p-2 bg-[#FAF9F5] border-1 border-gray-200">
      <div className="flex items-center gap-2 pl-3">
        <Image
          src={logo}
          alt="Logo"
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="text-[#3D3D3D] font-medium text-md">OracIA</span>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
