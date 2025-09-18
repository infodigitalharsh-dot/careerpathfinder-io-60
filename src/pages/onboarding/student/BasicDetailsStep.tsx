import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { useOnboarding } from "@/contexts/OnboardingContext";

const basicDetailsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number"),
  location: z.string().min(2, "Location is required"),
  educationLevel: z.enum(['high-school', 'bachelors', 'masters', 'phd']),
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
});

type BasicDetailsData = z.infer<typeof basicDetailsSchema>;

interface BasicDetailsStepProps {
  onNext: () => void;
}

export const BasicDetailsStep = ({ onNext }: BasicDetailsStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [profilePicture, setProfilePicture] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BasicDetailsData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: userData.basicDetails || {}
  });

  const watchedEducationLevel = watch("educationLevel");

  useEffect(() => {
    if (userData.basicDetails) {
      Object.keys(userData.basicDetails).forEach(key => {
        setValue(key as keyof BasicDetailsData, userData.basicDetails[key]);
      });
    }
  }, [userData.basicDetails, setValue]);

  const onSubmit = (data: BasicDetailsData) => {
    updateUserData('basicDetails', { 
      ...data, 
      profilePicture: profilePicture[0] || null 
    });
    onNext();
  };

  const handleProfilePictureUpload = (files: File[]) => {
    setProfilePicture(files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="City, State"
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>
        </div>

        {/* Education & Profile */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Education & Profile</h3>
          
          <div className="space-y-2">
            <Label htmlFor="educationLevel">Education Level *</Label>
            <Select onValueChange={(value) => setValue("educationLevel", value as any)} value={watchedEducationLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>
            {errors.educationLevel && (
              <p className="text-sm text-destructive">{errors.educationLevel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell us about yourself in a few words..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {watch("bio")?.length || 0}/300 characters
            </p>
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

              <FileUpload
                accept="image/*"
                maxSize={5}
                multiple={false}
                onUpload={handleProfilePictureUpload}
                preview={true}
                label="Profile Picture (Optional)"
                description="Upload a professional profile picture (Max 5MB)"
                existingFiles={profilePicture}
                className=""
              />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Continue to Career Objectives
        </Button>
      </div>
    </form>
  );
};