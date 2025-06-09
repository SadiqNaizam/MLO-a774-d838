import React from 'react';

interface StepperIndicatorProps {
  steps: string[]; // Array of step names/labels
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void; // Optional: allow clicking to navigate steps
}

const StepperIndicator: React.FC<StepperIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  console.log("Rendering StepperIndicator, current step:", currentStep);

  return (
    <div className="flex items-center justify-center w-full p-4">
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex flex-col items-center ${onStepClick ? 'cursor-pointer' : ''}`}
            onClick={onStepClick ? () => onStepClick(index) : undefined}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                ${index <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border text-muted-foreground'}
                transition-colors duration-300`}
            >
              {index < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                index + 1
              )}
            </div>
            <p className={`mt-2 text-xs text-center w-20 truncate ${index <= currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              {label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2
              ${index < currentStep ? 'bg-primary' : 'bg-border'}
              transition-colors duration-300`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepperIndicator;