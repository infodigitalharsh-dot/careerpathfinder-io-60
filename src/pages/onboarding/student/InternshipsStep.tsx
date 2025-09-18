import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DynamicFormArray } from "@/components/onboarding/DynamicFormArray";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const internshipsSchema = z.object({
  internships: z.array(z.object({
    companyName: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean(),
    description: z.string().max(300, "Description must be under 300 characters"),
    achievements: z.array(z.string()),
    skills: z.array(z.string()).min(1, "Add at least one skill"),
    stipend: z.number().optional(),
    certificateEarned: z.boolean(),
  }))
});

type InternshipsData = z.infer<typeof internshipsSchema>;

interface InternshipsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const InternshipsStep = ({ onNext, onPrevious }: InternshipsStepProps) => {
  const { userData, updateUserData } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<InternshipsData>({
    resolver: zodResolver(internshipsSchema),
    defaultValues: userData.internships || {
      internships: []
    }
  });

  const { fields: internshipFields, append: addInternship, remove: removeInternship } = useFieldArray({
    control,
    name: "internships"
  });

  useEffect(() => {
    if (userData.internships) {
      Object.keys(userData.internships).forEach(key => {
        setValue(key as keyof InternshipsData, userData.internships[key]);
      });
    }
  }, [userData.internships, setValue]);

  const onSubmit = (data: InternshipsData) => {
    updateUserData('internships', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Previous Internships</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about any internships you've completed. This is optional but helps us understand your experience.
        </p>
      </div>

      <DynamicFormArray
        fields={internshipFields}
        onAdd={() => addInternship({
          companyName: "",
          position: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
          achievements: [],
          skills: [],
          stipend: undefined,
          certificateEarned: false
        })}
        onRemove={removeInternship}
        maxItems={5}
        addButtonText="Add Internship"
        emptyMessage="No previous internships? No problem! You can skip this step or add any relevant experience you have."
        renderField={(field, index) => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input
                  {...register(`internships.${index}.companyName`)}
                  placeholder="e.g., Google, Microsoft, Startup Inc."
                />
                {errors.internships?.[index]?.companyName && (
                  <p className="text-sm text-destructive">
                    {errors.internships[index]?.companyName?.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  {...register(`internships.${index}.position`)}
                  placeholder="e.g., Software Engineering Intern"
                />
                {errors.internships?.[index]?.position && (
                  <p className="text-sm text-destructive">
                    {errors.internships[index]?.position?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                {...register(`internships.${index}.description`)}
                placeholder="Describe your role, responsibilities, and what you learned..."
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                {watch(`internships.${index}.description`)?.length || 0}/300 characters
              </p>
              {errors.internships?.[index]?.description && (
                <p className="text-sm text-destructive">
                  {errors.internships[index]?.description?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Skills Gained *</Label>
              <Input
                placeholder="e.g., Python, Machine Learning, Project Management (comma-separated)"
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  setValue(`internships.${index}.skills`, skills);
                }}
              />
              {errors.internships?.[index]?.skills && (
                <p className="text-sm text-destructive">
                  {errors.internships[index]?.skills?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Key Achievements (Optional)</Label>
              <Input
                placeholder="e.g., Improved app performance by 30%, Led team of 3 interns (comma-separated)"
                onChange={(e) => {
                  const achievements = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  setValue(`internships.${index}.achievements`, achievements);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Monthly Stipend (₹) (Optional)</Label>
                <Input
                  type="number"
                  {...register(`internships.${index}.stipend`, { valueAsNumber: true })}
                  placeholder="e.g., 15000"
                />
              </div>
              
              <div className="flex items-center space-x-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`certificate-${index}`}
                    {...register(`internships.${index}.certificateEarned`)}
                  />
                  <Label htmlFor={`certificate-${index}`} className="text-sm">
                    Received Certificate
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`currentlyWorking-${index}`}
                {...register(`internships.${index}.currentlyWorking`)}
              />
              <Label htmlFor={`currentlyWorking-${index}`}>
                I'm currently doing this internship
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  {...register(`internships.${index}.startDate`)}
                />
                {errors.internships?.[index]?.startDate && (
                  <p className="text-sm text-destructive">
                    {errors.internships[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              {!watch(`internships.${index}.currentlyWorking`) && (
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    {...register(`internships.${index}.endDate`)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      />

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button type="submit" size="lg">
          Continue to Certifications
        </Button>
      </div>
    </form>
  );
};