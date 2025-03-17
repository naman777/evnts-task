export default function StatusInfo({currentGoal, onboardingStage}:{
  currentGoal: string;
  onboardingStage: string;
}) {
  return (
    <div className="flex items-center justify-around text-md text-black border-b  border-gray-200 pb-4 bg-[#FAF9F5]">
      <div className="flex flex-col items-center justify-center gap-1">
        <h3 className="text-md font-medium text-black">Buyer emotion</h3>
        <div className="text-[#1977F2] font-medium flex items-center gap-1">
          Excited <span>😆</span>
        </div>
      </div>

      <div className="w-[1px] h-10 bg-gray-300"></div>

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-md font-medium text-black">Onboarding Stage</h3>
        <div className="text-[#1977F2] font-medium">{onboardingStage}</div>
      </div>

      <div className="w-[1px] h-10 bg-gray-300"></div>

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-md font-medium text-black">Current Goal</h3>
        <div className="text-[#1977F2] font-medium">{currentGoal}</div>
      </div>
    </div>
  );
}
