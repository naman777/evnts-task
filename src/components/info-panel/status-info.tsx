export default function StatusInfo() {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
        <h3 className="text-xs text-gray-500 mb-1">Buyer emotion</h3>
        <div className="text-sm font-medium">
          <span className="text-blue-500">Excited</span> <span className="text-yellow-500">😊</span>
        </div>
      </div>

      <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
        <h3 className="text-xs text-gray-500 mb-1">Onboarding Stage</h3>
        <div className="text-sm font-medium text-blue-500">Role & Personalization</div>
      </div>

      <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
        <h3 className="text-xs text-gray-500 mb-1">Current Goal</h3>
        <div className="text-sm font-medium text-blue-500">Identify user role</div>
      </div>
    </div>
  )
}

