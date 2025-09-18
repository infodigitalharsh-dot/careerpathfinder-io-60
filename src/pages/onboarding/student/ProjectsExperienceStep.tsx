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
import { FileUpload } from "@/components/onboarding/FileUpload";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const projectsExperienceSchema = z.object({
  projects: z.array(z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().max(300, "Description must be under 300 characters"),
    liveLink: z.string().url().optional().or(z.literal("")),
    githubLink: z.string().url().optional().or(z.literal("")),
    skillsUsed: z.array(z.string()).min(1, "Add at least one skill"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
  })),
  workExperience: z.array(z.object({
    companyName: z.string().min(1, "Company name is required"),
    title: z.string().min(1, "Job title is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean(),
    description: z.string().max(300, "Description must be under 300 characters"),
    skills: z.array(z.string()).min(1, "Add at least one skill"),
  }))
});

type ProjectsExperienceData = z.infer<typeof projectsExperienceSchema>;

interface ProjectsExperienceStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const ProjectsExperienceStep = ({ onNext, onPrevious }: ProjectsExperienceStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [projectImages, setProjectImages] = useState<{ [key: number]: File[] }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<ProjectsExperienceData>({
    resolver: zodResolver(projectsExperienceSchema),
    defaultValues: userData.projectsExperience || {
      projects: [],
      workExperience: []
    }
  });

  const { fields: projectFields, append: addProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects"
  });

  const { fields: workFields, append: addWork, remove: removeWork } = useFieldArray({
    control,
    name: "workExperience"
  });

  useEffect(() => {
    if (userData.projectsExperience) {
      Object.keys(userData.projectsExperience).forEach(key => {
        setValue(key as keyof ProjectsExperienceData, userData.projectsExperience[key]);
      });
    }
  }, [userData.projectsExperience, setValue]);

  const onSubmit = (data: ProjectsExperienceData) => {
    updateUserData('projectsExperience', { ...data, projectImages });
    onNext();
  };

  const handleProjectImageUpload = (index: number) => (files: File[]) => {
    setProjectImages(prev => ({ ...prev, [index]: files }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Projects Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Projects (Optional)</h3>
        <p className="text-sm text-muted-foreground">
          Showcase your best projects to demonstrate your skills and experience.
        </p>
        
        <DynamicFormArray
          fields={projectFields}
          onAdd={() => addProject({
            title: "",
            description: "",
            liveLink: "",
            githubLink: "",
            skillsUsed: [],
            startDate: "",
            endDate: ""
          })}
          onRemove={removeProject}
          maxItems={5}
          addButtonText="Add Project"
          emptyMessage="No projects added yet. Add your first project to showcase your work."
          renderField={(field, index) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title *</Label>
                  <Input
                    {...register(`projects.${index}.title`)}
                    placeholder="e.g., E-commerce Website"
                  />
                  {errors.projects?.[index]?.title && (
                    <p className="text-sm text-destructive">
                      {errors.projects[index]?.title?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Skills Used *</Label>
                  <Input
                    placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
                    onChange={(e) => {
                      const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setValue(`projects.${index}.skillsUsed`, skills);
                    }}
                  />
                  {errors.projects?.[index]?.skillsUsed && (
                    <p className="text-sm text-destructive">
                      {errors.projects[index]?.skillsUsed?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Describe the project, its purpose, and your role..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  {watch(`projects.${index}.description`)?.length || 0}/300 characters
                </p>
                {errors.projects?.[index]?.description && (
                  <p className="text-sm text-destructive">
                    {errors.projects[index]?.description?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live Link (Optional)</Label>
                  <Input
                    {...register(`projects.${index}.liveLink`)}
                    placeholder="https://your-project.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>GitHub Link (Optional)</Label>
                  <Input
                    {...register(`projects.${index}.githubLink`)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    {...register(`projects.${index}.startDate`)}
                  />
                  {errors.projects?.[index]?.startDate && (
                    <p className="text-sm text-destructive">
                      {errors.projects[index]?.startDate?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>End Date (Optional)</Label>
                  <Input
                    type="date"
                    {...register(`projects.${index}.endDate`)}
                  />
                </div>
              </div>

              <FileUpload
                accept="image/*"
                maxSize={5}
                multiple={false}
                onUpload={handleProjectImageUpload(index)}
                preview={true}
                label="Project Screenshot (Optional)"
                description="Upload a screenshot or image of your project"
                existingFiles={projectImages[index] || []}
              />
            </div>
          )}
        />
      </div>

      {/* Work Experience Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Work Experience (Optional)</h3>
        <p className="text-sm text-muted-foreground">
          Include any relevant work experience, including part-time jobs and freelance work.
        </p>
        
        <DynamicFormArray
          fields={workFields}
          onAdd={() => addWork({
            companyName: "",
            title: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            description: "",
            skills: []
          })}
          onRemove={removeWork}
          maxItems={3}
          addButtonText="Add Work Experience"
          emptyMessage="No work experience added yet. Add your professional experience here."
          renderField={(field, index) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    {...register(`workExperience.${index}.companyName`)}
                    placeholder="e.g., Tech Solutions Inc."
                  />
                  {errors.workExperience?.[index]?.companyName && (
                    <p className="text-sm text-destructive">
                      {errors.workExperience[index]?.companyName?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    {...register(`workExperience.${index}.title`)}
                    placeholder="e.g., Frontend Developer Intern"
                  />
                  {errors.workExperience?.[index]?.title && (
                    <p className="text-sm text-destructive">
                      {errors.workExperience[index]?.title?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  {...register(`workExperience.${index}.description`)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  {watch(`workExperience.${index}.description`)?.length || 0}/300 characters
                </p>
                {errors.workExperience?.[index]?.description && (
                  <p className="text-sm text-destructive">
                    {errors.workExperience[index]?.description?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Skills Used *</Label>
                <Input
                  placeholder="e.g., JavaScript, Problem Solving, Team Collaboration (comma-separated)"
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setValue(`workExperience.${index}.skills`, skills);
                  }}
                />
                {errors.workExperience?.[index]?.skills && (
                  <p className="text-sm text-destructive">
                    {errors.workExperience[index]?.skills?.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`currentlyWorking-${index}`}
                  {...register(`workExperience.${index}.currentlyWorking`)}
                />
                <Label htmlFor={`currentlyWorking-${index}`}>
                  I currently work here
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    {...register(`workExperience.${index}.startDate`)}
                  />
                  {errors.workExperience?.[index]?.startDate && (
                    <p className="text-sm text-destructive">
                      {errors.workExperience[index]?.startDate?.message}
                    </p>
                  )}
                </div>
                
                {!watch(`workExperience.${index}.currentlyWorking`) && (
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      {...register(`workExperience.${index}.endDate`)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button type="submit" size="lg">
          Continue to Internships
        </Button>
      </div>
    </form>
  );
};