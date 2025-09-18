import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OnboardingProvider, useOnboarding } from "@/contexts/OnboardingContext";
import { ProgressIndicator } from "@/components/onboarding/ProgressIndicator";
import { BasicDetailsStep } from "./student/BasicDetailsStep";
import { CareerObjectivesStep } from "./student/CareerObjectivesStep";
import { ProjectsExperienceStep } from "./student/ProjectsExperienceStep";
import { InternshipsStep } from "./student/InternshipsStep";
import { CertificationsStep } from "./student/CertificationsStep";
import { PreferencesStep } from "./student/PreferencesStep";

const STUDENT_STEPS = [
  "Basic Details",
  "Career Objectives", 
  "Projects & Experience",
  "Internships",
  "Certifications",
  "Preferences"
];

const TOTAL_STEPS = 6;

function StudentOnboardingContent() {
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
      navigate("/student/dashboard");
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
        return <BasicDetailsStep onNext={handleNext} />;
      case 2:
        return <CareerObjectivesStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <ProjectsExperienceStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <InternshipsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <CertificationsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 6:
        return <PreferencesStep onComplete={handleComplete} onPrevious={handlePrevious} isLoading={isLoading} />;
      default:
        return <BasicDetailsStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-success/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PM</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Student Onboarding</h1>
          <p className="text-muted-foreground">Complete your profile to get started</p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          userRole="student"
          completedSteps={completedSteps}
          stepNames={STUDENT_STEPS}
        />

        {/* Current Step Content */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-success/20 text-success rounded-full flex items-center justify-center text-sm font-bold">
                {currentStep}
              </span>
              <span>{STUDENT_STEPS[currentStep - 1]}</span>
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

export default function StudentOnboarding() {
  return (
    <OnboardingProvider userRole="student" totalSteps={TOTAL_STEPS}>
      <StudentOnboardingContent />
    </OnboardingProvider>
  );
}