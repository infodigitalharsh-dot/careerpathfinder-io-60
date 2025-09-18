import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OnboardingProvider, useOnboarding } from "@/contexts/OnboardingContext";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { OfficialDetailsStep } from "./ministry/OfficialDetailsStep";
import { DepartmentInformationStep } from "./ministry/DepartmentInformationStep";
import { AccessPermissionsStep } from "./ministry/AccessPermissionsStep";
import { VerificationAuthorizationStep } from "./ministry/VerificationAuthorizationStep";

const MINISTRY_STEPS = [
  "Official Details",
  "Department Information", 
  "Access Permissions",
  "Verification & Authorization"
];

const TOTAL_STEPS = 4;

function MinistryOnboardingContent() {
  const { 
    currentStep, 
    nextStep, 
    previousStep, 
    completeOnboarding, 
    isLoading,
    completedSteps 
  } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  const handleComplete = async () => {
    try {
      await completeOnboarding();
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to the PM Internship Scheme. Redirecting to your dashboard...",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <OfficialDetailsStep onNext={handleNext} />;
      case 2:
        return <DepartmentInformationStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <AccessPermissionsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <VerificationAuthorizationStep onComplete={handleComplete} onPrevious={handlePrevious} isLoading={isLoading} />;
      default:
        return <OfficialDetailsStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PM</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Ministry Onboarding</h1>
          <p className="text-muted-foreground">Set up your official access to the platform</p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          userRole="ministry"
          completedSteps={completedSteps}
          stepNames={MINISTRY_STEPS}
        />

        {/* Current Step Content */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">
                {currentStep}
              </span>
              <span>{MINISTRY_STEPS[currentStep - 1]}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function MinistryOnboarding() {
  return (
    <OnboardingProvider userRole="ministry" totalSteps={TOTAL_STEPS}>
      <MinistryOnboardingContent />
    </OnboardingProvider>
  );
}