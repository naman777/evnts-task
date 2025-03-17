interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="relative h-full max-h-full w-12 bg-white overflow-hidden  ">
      <div
      className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-gradient-to-b from-[#1977F2] to-[#0E458C] transition-all duration-700 ease-out mx-1 "
      style={{ height: `${progress}%` }}
      />
      <p
      className="absolute left-1/2 ml-3 pt-12 -translate-x-1/2 text-white text-xs font-semibold transition-all duration-700 ease-out  "
      style={{ bottom: `${progress}%`, transform: `translate(-50%, 50%)` }}
      >
      {progress}%
      </p>
    </div>
  )
}
