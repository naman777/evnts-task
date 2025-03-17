interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-full w-6 bg-gray-200">
      <div className="h-full bg-blue-500 transition-all duration-700 ease-out" style={{ height: `${progress}%` }} />
    </div>
  )
}

