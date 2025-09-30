import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const companyProfileSchema = z.object({
  companyDescription: z.string().min(50, "Description must be at least 50 characters").max(1000, "Maximum 1000 characters"),
  mission: z.string().max(500, "Maximum 500 characters").optional(),
  vision: z.string().max(500, "Maximum 500 characters").optional(),
  coreValues: z.array(z.string()).max(5, "Maximum 5 core values"),
  workCulture: z.array(z.string()).min(1, "Select at least one work culture aspect"),
  benefits: z.array(z.string()).min(1, "Select at least one benefit"),
  socialMediaLinks: z.object({
    linkedin: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
    facebook: z.string().url().optional().or(z.literal("")),
    instagram: z.string().url().optional().or(z.literal("")),
  }),
});

type CompanyProfileData = z.infer<typeof companyProfileSchema>;

interface CompanyProfileStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const WORK_CULTURE_OPTIONS = [
  "Collaborative", "Innovative", "Fast-paced", "Flexible", "Remote-friendly",
  "Learning-focused", "Results-oriented", "Diverse & Inclusive", "Entrepreneurial",
  "Work-life balance", "Mentorship-driven", "Open communication"
];

const BENEFITS_OPTIONS = [
  "Health Insurance", "Flexible Hours", "Remote Work", "Learning Budget",
  "Gym Membership", "Free Meals", "Transportation", "Performance Bonus",
  "Stock Options", "Paid Time Off", "Conference Attendance", "Certification Support",
  "Team Outings", "Maternity/Paternity Leave", "Mental Health Support"
];

export const CompanyProfileStep = ({ onNext, onPrevious }: CompanyProfileStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [companyLogo, setCompanyLogo] = useState<File[]>([]);
  const [companyImages, setCompanyImages] = useState<File[]>([]);
  const [coreValueInput, setCoreValueInput] = useState("");
  const [selectedCoreValues, setSelectedCoreValues] = useState<string[]>([]);
  const [selectedWorkCulture, setSelectedWorkCulture] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyProfileData>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: userData.companyProfile || {
      coreValues: [],
      workCulture: [],
      benefits: [],
      socialMediaLinks: {}
    }
  });

  useEffect(() => {
    if (userData.companyProfile) {
      Object.keys(userData.companyProfile).forEach(key => {
        setValue(key as keyof CompanyProfileData, userData.companyProfile[key]);
      });
      setSelectedCoreValues(userData.companyProfile.coreValues || []);
      setSelectedWorkCulture(userData.companyProfile.workCulture || []);
      setSelectedBenefits(userData.companyProfile.benefits || []);
    }
  }, [userData.companyProfile, setValue]);

  const addCoreValue = () => {
    if (coreValueInput && !selectedCoreValues.includes(coreValueInput) && selectedCoreValues.length < 5) {
      const newValues = [...selectedCoreValues, coreValueInput];
      setSelectedCoreValues(newValues);
      setValue("coreValues", newValues);
      setCoreValueInput("");
    }
  };

  const removeCoreValue = (valueToRemove: string) => {
    const newValues = selectedCoreValues.filter(value => value !== valueToRemove);
    setSelectedCoreValues(newValues);
    setValue("coreValues", newValues);
  };

  const toggleWorkCulture = (culture: string) => {
    const newCulture = selectedWorkCulture.includes(culture)
      ? selectedWorkCulture.filter(c => c !== culture)
      : [...selectedWorkCulture, culture];
    setSelectedWorkCulture(newCulture);
    setValue("workCulture", newCulture);
  };

  const toggleBenefit = (benefit: string) => {
    const newBenefits = selectedBenefits.includes(benefit)
      ? selectedBenefits.filter(b => b !== benefit)
      : [...selectedBenefits, benefit];
    setSelectedBenefits(newBenefits);
    setValue("benefits", newBenefits);
  };

  const onSubmit = (data: CompanyProfileData) => {
    updateUserData('companyProfile', { 
      ...data, 
      companyLogo: companyLogo[0] || null,
      companyImages 
    });
    onNext();
  };

  // Temporary Skip for demo
  const handleSkip = () => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Company Profile</h3>
        <p className="text-sm text-muted-foreground">
          Create an engaging profile that attracts the best talent to your company.
        </p>
      </div>

      {/* Company Description */}
      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description *</Label>
        <Textarea
          id="companyDescription"
          {...register("companyDescription")}
          placeholder="Tell students about your company, what you do, and what makes you unique..."
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          {watch("companyDescription")?.length || 0}/1000 characters
        </p>
        {errors.companyDescription && (
          <p className="text-sm text-destructive">{errors.companyDescription.message}</p>
        )}
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="mission">Mission Statement (Optional)</Label>
          <Textarea
            id="mission"
            {...register("mission")}
            placeholder="What is your company's mission?"
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            {watch("mission")?.length || 0}/500 characters
          </p>
          {errors.mission && (
            <p className="text-sm text-destructive">{errors.mission.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="vision">Vision Statement (Optional)</Label>
          <Textarea
            id="vision"
            {...register("vision")}
            placeholder="What is your company's vision for the future?"
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            {watch("vision")?.length || 0}/500 characters
          </p>
          {errors.vision && (
            <p className="text-sm text-destructive">{errors.vision.message}</p>
          )}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-4">
        <Label>Core Values (Max 5)</Label>
        <div className="flex gap-2">
          <Input
            value={coreValueInput}
            onChange={(e) => setCoreValueInput(e.target.value)}
            placeholder="Add a core value"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCoreValue();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addCoreValue}
            variant="outline"
            disabled={selectedCoreValues.length >= 5}
          >
            Add
          </Button>
        </div>
        
        {selectedCoreValues.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCoreValues.map(value => (
              <span
                key={value}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {value}
                <button
                  type="button"
                  onClick={() => removeCoreValue(value)}
                  className="text-primary-foreground/70 hover:text-primary-foreground"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.coreValues && (
          <p className="text-sm text-destructive">{errors.coreValues.message}</p>
        )}
      </div>

      {/* Work Culture */}
      <div className="space-y-4">
        <Label>Work Culture * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {WORK_CULTURE_OPTIONS.map(culture => (
            <div key={culture} className="flex items-center space-x-2">
              <Checkbox
                id={culture}
                checked={selectedWorkCulture.includes(culture)}
                onCheckedChange={() => toggleWorkCulture(culture)}
              />
              <Label htmlFor={culture} className="text-sm">{culture}</Label>
            </div>
          ))}
        </div>
        {errors.workCulture && (
          <p className="text-sm text-destructive">{errors.workCulture.message}</p>
        )}
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <Label>Employee Benefits * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BENEFITS_OPTIONS.map(benefit => (
            <div key={benefit} className="flex items-center space-x-2">
              <Checkbox
                id={benefit}
                checked={selectedBenefits.includes(benefit)}
                onCheckedChange={() => toggleBenefit(benefit)}
              />
              <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
            </div>
          ))}
        </div>
        {errors.benefits && (
          <p className="text-sm text-destructive">{errors.benefits.message}</p>
        )}
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          accept="image/*"
          maxSize={5}
          multiple={false}
          onUpload={setCompanyLogo}
          preview={true}
          required={true}
          label="Company Logo *"
          description="Upload your company logo (Max 5MB)"
          existingFiles={companyLogo}
        />

        <FileUpload
          accept="image/*"
          maxSize={5}
          multiple={true}
          onUpload={setCompanyImages}
          preview={true}
          label="Company Images (Optional)"
          description="Upload office photos, team pictures, etc. (Max 5 images, 5MB each)"
          existingFiles={companyImages}
        />
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <Label>Social Media Links (Optional)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              {...register("socialMediaLinks.linkedin")}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              {...register("socialMediaLinks.twitter")}
              placeholder="https://twitter.com/yourcompany"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              {...register("socialMediaLinks.facebook")}
              placeholder="https://facebook.com/yourcompany"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              {...register("socialMediaLinks.instagram")}
              placeholder="https://instagram.com/yourcompany"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={handleSkip} size="lg">
            Skip (Demo)
          </Button>
          <Button type="submit" size="lg">
            Continue to Job Posting Preferences
          </Button>
        </div>
      </div>
    </form>
  );
};