import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepProps {
  currentStep: number;
  totalSteps: number;
  userRole: 'student' | 'company' | 'ministry';
  completedSteps: number[];
  stepNames: string[];
}

export const ProgressIndicator = ({ 
  currentStep, 
  totalSteps, 
  userRole,
  completedSteps,
  stepNames
}: ProgressStepProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-success border-success bg-success';
      case 'company': return 'text-amber-600 border-amber-600 bg-amber-600';
      case 'ministry': return 'text-purple-600 border-purple-600 bg-purple-600';
      default: return 'text-primary border-primary bg-primary';
    }
  };

  const roleColors = getRoleColor(userRole);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {/* Step Circle */}
                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                    isCompleted && `${roleColors} text-white`,
                    isCurrent && `border-primary bg-primary/10 text-primary`,
                    isUpcoming && "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>

                {/* Connector Line */}
                {index < totalSteps - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-300",
                    isCompleted ? roleColors.split(' ')[2] : "bg-muted-foreground/30"
                  )} />
                )}
              </div>

              {/* Step Name */}
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-xs font-medium",
                  isCurrent && "text-primary",
                  isCompleted && roleColors.split(' ')[0],
                  isUpcoming && "text-muted-foreground"
                )}>
                  {stepNames[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};