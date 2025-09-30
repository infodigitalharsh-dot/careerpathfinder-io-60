import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface OnboardingContextType {
  currentStep: number;
  userData: any;
  userRole: 'student' | 'company' | 'ministry';
  updateUserData: (step: string, data: any) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  completeOnboarding: () => Promise<void>;
  saveProgress: () => Promise<void>;
  isLoading: boolean;
  completedSteps: number[];
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
  userRole: 'student' | 'company' | 'ministry';
  totalSteps: number;
  initialData?: any;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  userRole,
  totalSteps,
  initialData = {}
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const isInitialMount = useRef(true);

  // Load saved progress from localStorage (only once on mount)
  useEffect(() => {
    const savedProgress = localStorage.getItem(`onboarding-${userRole}`);
    if (savedProgress) {
      try {
        const { step, data, completed } = JSON.parse(savedProgress);
        setCurrentStep(step || 1);
        setUserData({ ...initialData, ...data });
        setCompletedSteps(completed || []);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
    isInitialMount.current = false;
  }, []);

  const updateUserData = useCallback((step: string, data: any) => {
    setUserData(prev => ({
      ...prev,
      [step]: data
    }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      const newCompletedSteps = completedSteps.includes(currentStep) 
        ? completedSteps 
        : [...completedSteps, currentStep];
      
      setCompletedSteps(newCompletedSteps);
      setCurrentStep(newStep);
      
      // Save progress immediately after navigation
      const progressData = {
        step: newStep,
        data: userData,
        completed: newCompletedSteps,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`onboarding-${userRole}`, JSON.stringify(progressData));
    }
  }, [currentStep, totalSteps, completedSteps, userData, userRole]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const saveProgress = useCallback(async () => {
    if (isInitialMount.current) return;
    
    try {
      const progressData = {
        step: currentStep,
        data: userData,
        completed: completedSteps,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`onboarding-${userRole}`, JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [currentStep, userData, completedSteps, userRole]);

  const completeOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save complete onboarding data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark all steps as completed
      setCompletedSteps(Array.from({ length: totalSteps }, (_, i) => i + 1));
      
      // Clear saved progress
      localStorage.removeItem(`onboarding-${userRole}`);
      
      console.log('Onboarding completed:', userData);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [totalSteps, userRole, userData]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        userData,
        userRole,
        updateUserData,
        nextStep,
        previousStep,
        goToStep,
        completeOnboarding,
        saveProgress,
        isLoading,
        completedSteps
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};