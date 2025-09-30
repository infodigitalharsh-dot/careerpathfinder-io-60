import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft, Loader2 } from "lucide-react";

const preferencesSchema = z.object({
  preferredTechnologies: z.array(z.string()).max(5, "Maximum 5 technologies"),
  unwillingTechnologies: z.array(z.string()).max(5, "Maximum 5 technologies"),
  motivators: z.array(z.string()).min(1, "Select at least one motivator").max(3, "Maximum 3 motivators"),
  openToRemote: z.boolean(),
  workEnvironmentPreferences: z.object({
    clearResponsibilities: z.boolean(),
    versatileAssignments: z.boolean(),
    teamCollaboration: z.boolean(),
    independentWork: z.boolean(),
  }),
  salaryExpectations: z.object({
    minimum: z.number().min(0, "Minimum salary must be positive"),
    maximum: z.number().min(0, "Maximum salary must be positive"),
    currency: z.enum(['INR', 'USD', 'EUR']),
  }),
  availableStartDate: z.string().min(1, "Available start date is required"),
  willingToRelocate: z.boolean(),
  preferredCompanySize: z.enum(['startup', 'medium', 'large', 'any']),
});

type PreferencesData = z.infer<typeof preferencesSchema>;

interface PreferencesStepProps {
  onComplete: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const TECHNOLOGIES = [
  "JavaScript", "Python", "Java", "React", "Angular", "Vue.js", "Node.js", 
  "Express.js", "Django", "Flask", "Spring Boot", "PHP", "Ruby", "Go", 
  "C++", "C#", ".NET", "SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Git", "Jenkins"
];

const MOTIVATORS = [
  "Learning new technologies", "Career advancement", "Work-life balance",
  "Competitive salary", "Flexible working hours", "Team collaboration",
  "Innovation and creativity", "Making social impact", "Leadership opportunities",
  "International exposure", "Mentorship", "Startup environment"
];

export const PreferencesStep = ({ onComplete, onPrevious, isLoading }: PreferencesStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [preferredTech, setPreferredTech] = useState<string[]>([]);
  const [unwillingTech, setUnwillingTech] = useState<string[]>([]);
  const [selectedMotivators, setSelectedMotivators] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([15000, 50000]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: userData.preferences || {
      preferredTechnologies: [],
      unwillingTechnologies: [],
      motivators: [],
      openToRemote: false,
      workEnvironmentPreferences: {
        clearResponsibilities: false,
        versatileAssignments: false,
        teamCollaboration: false,
        independentWork: false,
      },
      salaryExpectations: {
        minimum: 15000,
        maximum: 50000,
        currency: 'INR'
      },
      availableStartDate: "",
      willingToRelocate: false,
      preferredCompanySize: 'any'
    }
  });

  useEffect(() => {
    if (userData.preferences) {
      Object.keys(userData.preferences).forEach(key => {
        setValue(key as keyof PreferencesData, userData.preferences[key]);
      });
      setPreferredTech(userData.preferences.preferredTechnologies || []);
      setUnwillingTech(userData.preferences.unwillingTechnologies || []);
      setSelectedMotivators(userData.preferences.motivators || []);
      if (userData.preferences.salaryExpectations) {
        setSalaryRange([
          userData.preferences.salaryExpectations.minimum,
          userData.preferences.salaryExpectations.maximum
        ]);
      }
    }
  }, [userData.preferences, setValue]);

  const toggleTechnology = (tech: string, isPreferred: boolean) => {
    if (isPreferred) {
      const newPreferred = preferredTech.includes(tech)
        ? preferredTech.filter(t => t !== tech)
        : preferredTech.length < 5 ? [...preferredTech, tech] : preferredTech;
      setPreferredTech(newPreferred);
      setValue("preferredTechnologies", newPreferred);
    } else {
      const newUnwilling = unwillingTech.includes(tech)
        ? unwillingTech.filter(t => t !== tech)
        : unwillingTech.length < 5 ? [...unwillingTech, tech] : unwillingTech;
      setUnwillingTech(newUnwilling);
      setValue("unwillingTechnologies", newUnwilling);
    }
  };

  const toggleMotivator = (motivator: string) => {
    const newMotivators = selectedMotivators.includes(motivator)
      ? selectedMotivators.filter(m => m !== motivator)
      : selectedMotivators.length < 3 ? [...selectedMotivators, motivator] : selectedMotivators;
    setSelectedMotivators(newMotivators);
    setValue("motivators", newMotivators);
  };

  const handleSalaryChange = (values: number[]) => {
    setSalaryRange(values);
    setValue("salaryExpectations.minimum", values[0]);
    setValue("salaryExpectations.maximum", values[1]);
  };

  const onSubmit = (data: PreferencesData) => {
    updateUserData('preferences', data);
    onComplete();
  };

  // Temporary Skip for demo
  const handleSkip = () => {
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Work Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Help us match you with the perfect internship by sharing your preferences and expectations.
        </p>
      </div>

      {/* Technology Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium">Technology Preferences</h4>
        
        <div className="space-y-3">
          <Label>Preferred Technologies (Max 5)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TECHNOLOGIES.map(tech => (
              <Button
                key={tech}
                type="button"
                variant={preferredTech.includes(tech) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTechnology(tech, true)}
                disabled={!preferredTech.includes(tech) && preferredTech.length >= 5}
                className="justify-start"
              >
                {tech}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {preferredTech.length}/5
          </p>
        </div>

        <div className="space-y-3">
          <Label>Technologies You'd Prefer to Avoid (Max 5)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TECHNOLOGIES.map(tech => (
              <Button
                key={tech}
                type="button"
                variant={unwillingTech.includes(tech) ? "destructive" : "outline"}
                size="sm"
                onClick={() => toggleTechnology(tech, false)}
                disabled={!unwillingTech.includes(tech) && unwillingTech.length >= 5}
                className="justify-start"
              >
                {tech}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {unwillingTech.length}/5
          </p>
        </div>
      </div>

      {/* Motivators */}
      <div className="space-y-4">
        <h4 className="font-medium">What Motivates You? (Select up to 3)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOTIVATORS.map(motivator => (
            <div key={motivator} className="flex items-center space-x-2">
              <Checkbox
                id={motivator}
                checked={selectedMotivators.includes(motivator)}
                onCheckedChange={() => toggleMotivator(motivator)}
                disabled={!selectedMotivators.includes(motivator) && selectedMotivators.length >= 3}
              />
              <Label htmlFor={motivator} className="text-sm">{motivator}</Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Selected: {selectedMotivators.length}/3
        </p>
        {errors.motivators && (
          <p className="text-sm text-destructive">{errors.motivators.message}</p>
        )}
      </div>

      {/* Work Environment */}
      <div className="space-y-4">
        <h4 className="font-medium">Work Environment Preferences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="clearResponsibilities"
              {...register("workEnvironmentPreferences.clearResponsibilities")}
            />
            <Label htmlFor="clearResponsibilities" className="text-sm">
              Clear responsibilities and defined tasks
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="versatileAssignments"
              {...register("workEnvironmentPreferences.versatileAssignments")}
            />
            <Label htmlFor="versatileAssignments" className="text-sm">
              Versatile and varied assignments
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="teamCollaboration"
              {...register("workEnvironmentPreferences.teamCollaboration")}
            />
            <Label htmlFor="teamCollaboration" className="text-sm">
              Collaborative team environment
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="independentWork"
              {...register("workEnvironmentPreferences.independentWork")}
            />
            <Label htmlFor="independentWork" className="text-sm">
              Independent work opportunities
            </Label>
          </div>
        </div>
      </div>

      {/* Salary Expectations */}
      <div className="space-y-4">
        <h4 className="font-medium">Salary Expectations</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Monthly Stipend Range (₹)</Label>
            <Slider
              value={salaryRange}
              onValueChange={handleSalaryChange}
              max={100000}
              min={5000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{salaryRange[0].toLocaleString()}</span>
              <span>₹{salaryRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select onValueChange={(value) => setValue("salaryExpectations.currency", value as any)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Other Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium">Other Preferences</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Available Start Date *</Label>
            <Input
              type="date"
              {...register("availableStartDate")}
            />
            {errors.availableStartDate && (
              <p className="text-sm text-destructive">{errors.availableStartDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Preferred Company Size</Label>
            <Select onValueChange={(value) => setValue("preferredCompanySize", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                <SelectItem value="medium">Medium (51-500 employees)</SelectItem>
                <SelectItem value="large">Large (500+ employees)</SelectItem>
                <SelectItem value="any">No preference</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="openToRemote"
              {...register("openToRemote")}
            />
            <Label htmlFor="openToRemote">
              Open to remote internships
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="willingToRelocate"
              {...register("willingToRelocate")}
            />
            <Label htmlFor="willingToRelocate">
              Willing to relocate for the right opportunity
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={handleSkip} size="lg" disabled={isLoading}>
            Skip (Demo)
          </Button>
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Completing Setup...
              </>
            ) : (
              "Complete Onboarding"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
