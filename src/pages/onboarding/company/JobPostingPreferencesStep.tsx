import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const jobPostingPreferencesSchema = z.object({
  typicalRoles: z.array(z.string()).min(1, "Add at least one typical role"),
  preferredSkills: z.array(z.string()).min(1, "Add at least one preferred skill"),
  internshipTypes: z.array(z.enum(['paid', 'unpaid', 'stipend', 'full-time-offer'])).min(1, "Select at least one internship type"),
  workModes: z.array(z.enum(['remote', 'hybrid', 'on-site'])).min(1, "Select at least one work mode"),
  preferredEducationLevels: z.array(z.enum(['high-school', 'bachelors', 'masters', 'phd'])).min(1, "Select at least one education level"),
  averageInternshipDuration: z.string().min(1, "Average internship duration is required"),
  mentorshipProgram: z.boolean(),
  certificationOffered: z.boolean(),
  hiringSeasons: z.array(z.string()).min(1, "Select at least one hiring season"),
});

type JobPostingPreferencesData = z.infer<typeof jobPostingPreferencesSchema>;

interface JobPostingPreferencesStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const COMMON_ROLES = [
  "Software Developer", "Data Analyst", "Digital Marketing", "UI/UX Designer",
  "Business Analyst", "Content Writer", "Sales Associate", "HR Assistant",
  "Project Coordinator", "Research Assistant", "Quality Assurance", "DevOps Engineer"
];

const COMMON_SKILLS = [
  "JavaScript", "Python", "Java", "React", "Node.js", "SQL", "Data Analysis",
  "Digital Marketing", "SEO", "Content Writing", "Project Management", "Communication",
  "Problem Solving", "Leadership", "Teamwork", "Critical Thinking"
];

const HIRING_SEASONS = [
  "January-March", "April-June", "July-September", "October-December", "Year-round"
];

export const JobPostingPreferencesStep = ({ onNext, onPrevious }: JobPostingPreferencesStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [roleInput, setRoleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInternshipTypes, setSelectedInternshipTypes] = useState<string[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<string[]>([]);
  const [selectedHiringSeasons, setSelectedHiringSeasons] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<JobPostingPreferencesData>({
    resolver: zodResolver(jobPostingPreferencesSchema),
    defaultValues: userData.jobPostingPreferences || {
      typicalRoles: [],
      preferredSkills: [],
      internshipTypes: [],
      workModes: [],
      preferredEducationLevels: [],
      hiringSeasons: [],
      mentorshipProgram: false,
      certificationOffered: false
    }
  });

  useEffect(() => {
    if (userData.jobPostingPreferences) {
      Object.keys(userData.jobPostingPreferences).forEach(key => {
        setValue(key as keyof JobPostingPreferencesData, userData.jobPostingPreferences[key]);
      });
      setSelectedRoles(userData.jobPostingPreferences.typicalRoles || []);
      setSelectedSkills(userData.jobPostingPreferences.preferredSkills || []);
      setSelectedInternshipTypes(userData.jobPostingPreferences.internshipTypes || []);
      setSelectedWorkModes(userData.jobPostingPreferences.workModes || []);
      setSelectedEducationLevels(userData.jobPostingPreferences.preferredEducationLevels || []);
      setSelectedHiringSeasons(userData.jobPostingPreferences.hiringSeasons || []);
    }
  }, [userData.jobPostingPreferences, setValue]);

  const addRole = (role: string) => {
    if (role && !selectedRoles.includes(role)) {
      const newRoles = [...selectedRoles, role];
      setSelectedRoles(newRoles);
      setValue("typicalRoles", newRoles);
      setRoleInput("");
    }
  };

  const removeRole = (roleToRemove: string) => {
    const newRoles = selectedRoles.filter(role => role !== roleToRemove);
    setSelectedRoles(newRoles);
    setValue("typicalRoles", newRoles);
  };

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setValue("preferredSkills", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(newSkills);
    setValue("preferredSkills", newSkills);
  };

  const toggleInternshipType = (type: string) => {
    const newTypes = selectedInternshipTypes.includes(type)
      ? selectedInternshipTypes.filter(t => t !== type)
      : [...selectedInternshipTypes, type];
    setSelectedInternshipTypes(newTypes);
    setValue("internshipTypes", newTypes as any);
  };

  const toggleWorkMode = (mode: string) => {
    const newModes = selectedWorkModes.includes(mode)
      ? selectedWorkModes.filter(m => m !== mode)
      : [...selectedWorkModes, mode];
    setSelectedWorkModes(newModes);
    setValue("workModes", newModes as any);
  };

  const toggleEducationLevel = (level: string) => {
    const newLevels = selectedEducationLevels.includes(level)
      ? selectedEducationLevels.filter(l => l !== level)
      : [...selectedEducationLevels, level];
    setSelectedEducationLevels(newLevels);
    setValue("preferredEducationLevels", newLevels as any);
  };

  const toggleHiringSeason = (season: string) => {
    const newSeasons = selectedHiringSeasons.includes(season)
      ? selectedHiringSeasons.filter(s => s !== season)
      : [...selectedHiringSeasons, season];
    setSelectedHiringSeasons(newSeasons);
    setValue("hiringSeasons", newSeasons);
  };

  const onSubmit = (data: JobPostingPreferencesData) => {
    updateUserData('jobPostingPreferences', data);
    onNext();
  };

  // Temporary Skip for demo
  const handleSkip = () => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Job Posting Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Help us understand your hiring needs and preferences to better match you with candidates.
        </p>
      </div>

      {/* Typical Roles */}
      <div className="space-y-4">
        <Label>Typical Roles You Hire For *</Label>
        <div className="flex gap-2">
          <Input
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            placeholder="Add a role"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addRole(roleInput);
              }
            }}
          />
          <Button 
            type="button" 
            onClick={() => addRole(roleInput)}
            variant="outline"
          >
            Add
          </Button>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Or select from common roles:</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_ROLES.map(role => (
              <Button
                key={role}
                type="button"
                variant={selectedRoles.includes(role) ? "default" : "outline"}
                size="sm"
                onClick={() => selectedRoles.includes(role) ? removeRole(role) : addRole(role)}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>

        {selectedRoles.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Selected Roles:</p>
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map(role => (
                <span
                  key={role}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {role}
                  <button
                    type="button"
                    onClick={() => removeRole(role)}
                    className="text-primary-foreground/70 hover:text-primary-foreground"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        {errors.typicalRoles && (
          <p className="text-sm text-destructive">{errors.typicalRoles.message}</p>
        )}
      </div>

      {/* Preferred Skills */}
      <div className="space-y-4">
        <Label>Preferred Skills *</Label>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add a skill"
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
        {errors.preferredSkills && (
          <p className="text-sm text-destructive">{errors.preferredSkills.message}</p>
        )}
      </div>

      {/* Internship Types */}
      <div className="space-y-4">
        <Label>Internship Types * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'paid', label: 'Paid Internship' },
            { value: 'unpaid', label: 'Unpaid Internship' },
            { value: 'stipend', label: 'Stipend-based' },
            { value: 'full-time-offer', label: 'Full-time Offer' }
          ].map(type => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={type.value}
                checked={selectedInternshipTypes.includes(type.value)}
                onCheckedChange={() => toggleInternshipType(type.value)}
              />
              <Label htmlFor={type.value} className="text-sm">{type.label}</Label>
            </div>
          ))}
        </div>
        {errors.internshipTypes && (
          <p className="text-sm text-destructive">{errors.internshipTypes.message}</p>
        )}
      </div>

      {/* Work Modes */}
      <div className="space-y-4">
        <Label>Work Modes * (Select all that apply)</Label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'remote', label: 'Remote' },
            { value: 'hybrid', label: 'Hybrid' },
            { value: 'on-site', label: 'On-site' }
          ].map(mode => (
            <div key={mode.value} className="flex items-center space-x-2">
              <Checkbox
                id={mode.value}
                checked={selectedWorkModes.includes(mode.value)}
                onCheckedChange={() => toggleWorkMode(mode.value)}
              />
              <Label htmlFor={mode.value} className="text-sm">{mode.label}</Label>
            </div>
          ))}
        </div>
        {errors.workModes && (
          <p className="text-sm text-destructive">{errors.workModes.message}</p>
        )}
      </div>

      {/* Education Levels */}
      <div className="space-y-4">
        <Label>Preferred Education Levels * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'high-school', label: 'High School' },
            { value: 'bachelors', label: "Bachelor's" },
            { value: 'masters', label: "Master's" },
            { value: 'phd', label: 'PhD' }
          ].map(level => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={level.value}
                checked={selectedEducationLevels.includes(level.value)}
                onCheckedChange={() => toggleEducationLevel(level.value)}
              />
              <Label htmlFor={level.value} className="text-sm">{level.label}</Label>
            </div>
          ))}
        </div>
        {errors.preferredEducationLevels && (
          <p className="text-sm text-destructive">{errors.preferredEducationLevels.message}</p>
        )}
      </div>

      {/* Additional Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="averageInternshipDuration">Average Internship Duration *</Label>
          <Input
            id="averageInternshipDuration"
            {...register("averageInternshipDuration")}
            placeholder="e.g., 3-6 months"
          />
          {errors.averageInternshipDuration && (
            <p className="text-sm text-destructive">{errors.averageInternshipDuration.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label>Additional Programs</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mentorshipProgram"
                {...register("mentorshipProgram")}
              />
              <Label htmlFor="mentorshipProgram" className="text-sm">
                We offer mentorship programs
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="certificationOffered"
                {...register("certificationOffered")}
              />
              <Label htmlFor="certificationOffered" className="text-sm">
                We provide completion certificates
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Seasons */}
      <div className="space-y-4">
        <Label>Typical Hiring Seasons * (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {HIRING_SEASONS.map(season => (
            <div key={season} className="flex items-center space-x-2">
              <Checkbox
                id={season}
                checked={selectedHiringSeasons.includes(season)}
                onCheckedChange={() => toggleHiringSeason(season)}
              />
              <Label htmlFor={season} className="text-sm">{season}</Label>
            </div>
          ))}
        </div>
        {errors.hiringSeasons && (
          <p className="text-sm text-destructive">{errors.hiringSeasons.message}</p>
        )}
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
            Continue to Team Information
          </Button>
        </div>
      </div>
    </form>
  );
};