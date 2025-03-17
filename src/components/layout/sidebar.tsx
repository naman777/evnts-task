import Image from "next/image"
import logoImage from "@/assets/logo.svg"

export default function Sidebar() {
  return (
    <div className="w-20 bg-[#F3F5F7] border-r border-gray-200 flex flex-col items-center py-6">
      <div className="w-10 h-10 flex items-center justify-center bg-[#F3F5F7]">
        <Image src={logoImage} alt="logo" width={48} height={48} />
      </div>
    </div>
  )
}