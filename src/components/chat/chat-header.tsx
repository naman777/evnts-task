import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
  username: string
}

export default function ChatHeader({ username }: ChatHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-[#FAF9F5] ">
      <div>
        <h2 className="text-sm text-gray-500">Welcome,</h2>
        <h1 className="text-lg font-medium">{username}</h1>
      </div>
      <Avatar className="h-10 w-10 bg-gray-200">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={username} />
        <AvatarFallback>FR</AvatarFallback>
      </Avatar>
    </div>
  )
}

