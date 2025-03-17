import { CircleUser } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6">
      <div className="w-10 h-10 flex items-center justify-center">
        <CircleUser className="w-8 h-8 text-gray-800" />
      </div>
    </div>
  )
}

