import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OnboardingProvider, useOnboarding } from "@/contexts/OnboardingContext";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { CompanyDetailsStep } from "./company/CompanyDetailsStep";
import { CompanyProfileStep } from "./company/CompanyProfileStep";
import { JobPostingPreferencesStep } from "./company/JobPostingPreferencesStep";
import { TeamInformationStep } from "./company/TeamInformationStep";
import { VerificationDocumentsStep } from "./company/VerificationDocumentsStep";

const COMPANY_STEPS = [
  "Company Details",
  "Company Profile", 
  "Job Posting Preferences",
  "Team Information",
  "Verification Documents"
];

const TOTAL_STEPS = 5;

function CompanyOnboardingContent() {
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
      navigate("/company/dashboard");
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
        return <CompanyDetailsStep onNext={handleNext} />;
      case 2:
        return <CompanyProfileStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <JobPostingPreferencesStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <TeamInformationStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <VerificationDocumentsStep onComplete={handleComplete} onPrevious={handlePrevious} isLoading={isLoading} />;
      default:
        return <CompanyDetailsStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PM</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Company Onboarding</h1>
          <p className="text-muted-foreground">Set up your company profile to start hiring</p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          userRole="company"
          completedSteps={completedSteps}
          stepNames={COMPANY_STEPS}
        />

        {/* Current Step Content */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">
                {currentStep}
              </span>
              <span>{COMPANY_STEPS[currentStep - 1]}</span>
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

export default function CompanyOnboarding() {
  return (
    <OnboardingProvider userRole="company" totalSteps={TOTAL_STEPS}>
      <CompanyOnboardingContent />
    </OnboardingProvider>
  );
}