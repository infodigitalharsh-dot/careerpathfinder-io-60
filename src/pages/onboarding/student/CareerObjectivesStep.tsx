import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DynamicFormArray } from "@/components/onboarding/DynamicFormArray";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const careerObjectivesSchema = z.object({
  careerGoals: z.string().min(10, "Please describe your career goals").max(500, "Maximum 500 characters"),
  internshipPreferences: z.array(z.object({
    field: z.string().min(1, "Field is required"),
    location: z.string().min(1, "Location is required"),
    type: z.enum(['part-time', 'full-time', 'remote'])
  })).min(1, "Add at least one internship preference"),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  preferredWorkSchedule: z.enum(['flexible', 'standard', 'weekends']),
  careerInterests: z.array(z.string()).min(1, "Select at least one career interest")
});

type CareerObjectivesData = z.infer<typeof careerObjectivesSchema>;

interface CareerObjectivesStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const CAREER_INTERESTS = [
  "Technology", "Finance", "Healthcare", "Education", "Marketing", 
  "Design", "Research", "Consulting", "Non-profit", "Government",
  "Media", "Startups", "E-commerce", "Manufacturing", "Agriculture"
];

const COMMON_SKILLS = [
  "JavaScript", "Python", "Java", "React", "Node.js", "SQL", "Data Analysis",
  "Digital Marketing", "Project Management", "Communication", "Leadership",
  "Problem Solving", "Critical Thinking", "Teamwork", "Time Management"
];

export const CareerObjectivesStep = ({ onNext, onPrevious }: CareerObjectivesStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<CareerObjectivesData>({
    resolver: zodResolver(careerObjectivesSchema),
    defaultValues: userData.careerObjectives || {
      internshipPreferences: [{ field: "", location: "", type: "full-time" as const }],
      skills: [],
      careerInterests: []
    }
  });

  const { fields: internshipFields, append: addInternship, remove: removeInternship } = useFieldArray({
    control,
    name: "internshipPreferences"
  });

  useEffect(() => {
    if (userData.careerObjectives) {
      Object.keys(userData.careerObjectives).forEach(key => {
        setValue(key as keyof CareerObjectivesData, userData.careerObjectives[key]);
      });
      setSelectedSkills(userData.careerObjectives.skills || []);
      setSelectedInterests(userData.careerObjectives.careerInterests || []);
    }
  }, [userData.careerObjectives, setValue]);

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setValue("skills", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(newSkills);
    setValue("skills", newSkills);
  };

  const toggleInterest = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(newInterests);
    setValue("careerInterests", newInterests);
  };

  const onSubmit = (data: CareerObjectivesData) => {
    updateUserData('careerObjectives', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Career Goals */}
      <div className="space-y-2">
        <Label htmlFor="careerGoals">Career Goals *</Label>
        <Textarea
          id="careerGoals"
          {...register("careerGoals")}
          placeholder="Describe your short-term and long-term career goals..."
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          {watch("careerGoals")?.length || 0}/500 characters
        </p>
        {errors.careerGoals && (
          <p className="text-sm text-destructive">{errors.careerGoals.message}</p>
        )}
      </div>

      {/* Internship Preferences */}
      <div className="space-y-4">
        <Label>Internship Preferences *</Label>
        <DynamicFormArray
          fields={internshipFields}
          onAdd={() => addInternship({ field: "", location: "", type: "full-time" })}
          onRemove={removeInternship}
          maxItems={3}
          addButtonText="Add Another Preference"
          renderField={(field, index) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Field *</Label>
                <Input
                  {...register(`internshipPreferences.${index}.field`)}
                  placeholder="e.g., Software Development"
                />
                {errors.internshipPreferences?.[index]?.field && (
                  <p className="text-sm text-destructive">
                    {errors.internshipPreferences[index]?.field?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Location *</Label>
                <Input
                  {...register(`internshipPreferences.${index}.location`)}
                  placeholder="e.g., Bangalore, Remote"
                />
                {errors.internshipPreferences?.[index]?.location && (
                  <p className="text-sm text-destructive">
                    {errors.internshipPreferences[index]?.location?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select 
                  onValueChange={(value) => setValue(`internshipPreferences.${index}.type`, value as any)}
                  defaultValue={field.type}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        />
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <Label>Skills *</Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill and press Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(skillInput);
                }
              }}
            />
            <Button 
              type="button" 
              onClick={() => addSkill(skillInput)}
              variant="outline"
            >
              Add
            </Button>
          </div>
          
          {/* Common Skills */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Or select from common skills:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_SKILLS.map(skill => (
                <Button
                  key={skill}
                  type="button"
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  size="sm"
                  onClick={() => selectedSkills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Selected Skills:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map(skill => (
                  <span
                    key={skill}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-primary-foreground/70 hover:text-primary-foreground"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {errors.skills && (
          <p className="text-sm text-destructive">{errors.skills.message}</p>
        )}
      </div>

      {/* Work Schedule */}
      <div className="space-y-2">
        <Label>Preferred Work Schedule *</Label>
        <Select onValueChange={(value) => setValue("preferredWorkSchedule", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your preferred work schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flexible">Flexible Hours</SelectItem>
            <SelectItem value="standard">Standard 9-5</SelectItem>
            <SelectItem value="weekends">Including Weekends</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferredWorkSchedule && (
          <p className="text-sm text-destructive">{errors.preferredWorkSchedule.message}</p>
        )}
      </div>

      {/* Career Interests */}
      <div className="space-y-4">
        <Label>Career Interests * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CAREER_INTERESTS.map(interest => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                checked={selectedInterests.includes(interest)}
                onCheckedChange={() => toggleInterest(interest)}
              />
              <Label htmlFor={interest} className="text-sm">{interest}</Label>
            </div>
          ))}
        </div>
        {errors.careerInterests && (
          <p className="text-sm text-destructive">{errors.careerInterests.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button type="submit" size="lg">
          Continue to Projects & Experience
        </Button>
      </div>
    </form>
  );
};