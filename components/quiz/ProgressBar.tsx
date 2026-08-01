interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div
      className="quiz-progress rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80"
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep + 1}
    >
      <div className="mb-2 flex items-center justify-between text-xs text-slate-500 sm:mb-3 sm:text-sm">
        <span className="font-medium text-slate-600">Quiz progress</span>
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 sm:h-2.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-coral to-[#eb9a7e] transition-all duration-300 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="quiz-progress-steps mt-4 flex gap-2">
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
