import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DynamicFormArray } from "@/components/onboarding/DynamicFormArray";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const certificationsSchema = z.object({
  certifications: z.array(z.object({
    name: z.string().min(1, "Certification name is required"),
    issuingOrganization: z.string().min(1, "Issuing organization is required"),
    dateEarned: z.string().min(1, "Date earned is required"),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
    credentialUrl: z.string().url().optional().or(z.literal("")),
  })),
  achievements: z.array(z.object({
    title: z.string().min(1, "Achievement title is required"),
    description: z.string().min(1, "Description is required"),
    dateReceived: z.string().min(1, "Date is required"),
    category: z.enum(['academic', 'professional', 'personal']),
  }))
});

type CertificationsData = z.infer<typeof certificationsSchema>;

interface CertificationsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const CertificationsStep = ({ onNext, onPrevious }: CertificationsStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [certificateFiles, setCertificateFiles] = useState<{ [key: number]: File[] }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<CertificationsData>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: userData.certifications || {
      certifications: [],
      achievements: []
    }
  });

  const { fields: certFields, append: addCertification, remove: removeCertification } = useFieldArray({
    control,
    name: "certifications"
  });

  const { fields: achievementFields, append: addAchievement, remove: removeAchievement } = useFieldArray({
    control,
    name: "achievements"
  });

  useEffect(() => {
    if (userData.certifications) {
      Object.keys(userData.certifications).forEach(key => {
        setValue(key as keyof CertificationsData, userData.certifications[key]);
      });
    }
  }, [userData.certifications, setValue]);

  const onSubmit = (data: CertificationsData) => {
    updateUserData('certifications', { ...data, certificateFiles });
    onNext();
  };

  const handleCertificateFileUpload = (index: number) => (files: File[]) => {
    setCertificateFiles(prev => ({ ...prev, [index]: files }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Certifications Section */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            Add any relevant certifications, online courses, or professional qualifications you've earned.
          </p>
        </div>
        
        <DynamicFormArray
          fields={certFields}
          onAdd={() => addCertification({
            name: "",
            issuingOrganization: "",
            dateEarned: "",
            expiryDate: "",
            credentialId: "",
            credentialUrl: ""
          })}
          onRemove={removeCertification}
          maxItems={10}
          addButtonText="Add Certification"
          emptyMessage="No certifications yet? Add any online courses, professional certificates, or technical qualifications."
          renderField={(field, index) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certification Name *</Label>
                  <Input
                    {...register(`certifications.${index}.name`)}
                    placeholder="e.g., AWS Certified Developer, React Certification"
                  />
                  {errors.certifications?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {errors.certifications[index]?.name?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Issuing Organization *</Label>
                  <Input
                    {...register(`certifications.${index}.issuingOrganization`)}
                    placeholder="e.g., Amazon Web Services, Meta, Coursera"
                  />
                  {errors.certifications?.[index]?.issuingOrganization && (
                    <p className="text-sm text-destructive">
                      {errors.certifications[index]?.issuingOrganization?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Earned *</Label>
                  <Input
                    type="date"
                    {...register(`certifications.${index}.dateEarned`)}
                  />
                  {errors.certifications?.[index]?.dateEarned && (
                    <p className="text-sm text-destructive">
                      {errors.certifications[index]?.dateEarned?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Expiry Date (Optional)</Label>
                  <Input
                    type="date"
                    {...register(`certifications.${index}.expiryDate`)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Credential ID (Optional)</Label>
                  <Input
                    {...register(`certifications.${index}.credentialId`)}
                    placeholder="e.g., ABC123XYZ"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Credential URL (Optional)</Label>
                  <Input
                    {...register(`certifications.${index}.credentialUrl`)}
                    placeholder="https://verify.example.com/credential"
                  />
                </div>
              </div>

              <FileUpload
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5}
                multiple={false}
                onUpload={handleCertificateFileUpload(index)}
                preview={true}
                label="Certificate File (Optional)"
                description="Upload your certificate (PDF or image format, max 5MB)"
                existingFiles={certificateFiles[index] || []}
              />
            </div>
          )}
        />
      </div>

      {/* Achievements Section */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Achievements & Awards</h3>
          <p className="text-sm text-muted-foreground">
            Highlight any awards, recognitions, or significant achievements in academic, professional, or personal areas.
          </p>
        </div>
        
        <DynamicFormArray
          fields={achievementFields}
          onAdd={() => addAchievement({
            title: "",
            description: "",
            dateReceived: "",
            category: "academic"
          })}
          onRemove={removeAchievement}
          maxItems={5}
          addButtonText="Add Achievement"
          emptyMessage="Add any awards, competitions won, or significant accomplishments."
          renderField={(field, index) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Achievement Title *</Label>
                  <Input
                    {...register(`achievements.${index}.title`)}
                    placeholder="e.g., Best Project Award, Dean's List"
                  />
                  {errors.achievements?.[index]?.title && (
                    <p className="text-sm text-destructive">
                      {errors.achievements[index]?.title?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select 
                    onValueChange={(value) => setValue(`achievements.${index}.category`, value as any)}
                    defaultValue={field.category}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.achievements?.[index]?.category && (
                    <p className="text-sm text-destructive">
                      {errors.achievements[index]?.category?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  {...register(`achievements.${index}.description`)}
                  placeholder="Describe the achievement and its significance..."
                  className="min-h-[80px]"
                />
                {errors.achievements?.[index]?.description && (
                  <p className="text-sm text-destructive">
                    {errors.achievements[index]?.description?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date Received *</Label>
                <Input
                  type="date"
                  {...register(`achievements.${index}.dateReceived`)}
                />
                {errors.achievements?.[index]?.dateReceived && (
                  <p className="text-sm text-destructive">
                    {errors.achievements[index]?.dateReceived?.message}
                  </p>
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
          Continue to Preferences
        </Button>
      </div>
    </form>
  );
};