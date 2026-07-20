interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span className="font-medium text-slate-600">Quiz progress</span>
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-coral to-[#eb9a7e] transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`h-2 flex-1 rounded-full ${index <= currentStep ? "bg-spruce/70" : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
