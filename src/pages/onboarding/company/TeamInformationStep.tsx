import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DynamicFormArray } from "@/components/onboarding/DynamicFormArray";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const teamInformationSchema = z.object({
  hrContacts: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(10, "Valid phone number required"),
    role: z.string().min(1, "Role is required"),
    linkedinProfile: z.string().url().optional().or(z.literal("")),
  })).max(3),
  technicalContacts: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    role: z.string().min(1, "Role is required"),
    department: z.string().min(1, "Department is required"),
  })).max(3),
  companyRepresentative: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(10, "Valid phone number required"),
    designation: z.string().min(1, "Designation is required"),
    yearsWithCompany: z.number().min(0, "Must be 0 or greater"),
  })
});

type TeamInformationData = z.infer<typeof teamInformationSchema>;

interface TeamInformationStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const TeamInformationStep = ({ onNext, onPrevious }: TeamInformationStepProps) => {
  const { userData, updateUserData } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<TeamInformationData>({
    resolver: zodResolver(teamInformationSchema),
    defaultValues: userData.teamInformation || {
      hrContacts: [],
      technicalContacts: [],
      companyRepresentative: {
        name: "",
        email: "",
        phoneNumber: "",
        designation: "",
        yearsWithCompany: 0
      }
    }
  });

  const { fields: hrFields, append: addHrContact, remove: removeHrContact } = useFieldArray({
    control,
    name: "hrContacts"
  });

  const { fields: techFields, append: addTechContact, remove: removeTechContact } = useFieldArray({
    control,
    name: "technicalContacts"
  });

  const onSubmit = (data: TeamInformationData) => {
    updateUserData('teamInformation', data);
    onNext();
  };

  // Temporary Skip for demo
  const handleSkip = () => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* HR Contacts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">HR Contacts</h3>
        <p className="text-sm text-muted-foreground">
          Add key HR personnel who will be involved in the internship program.
        </p>
        
        <DynamicFormArray
          fields={hrFields}
          onAdd={() => addHrContact({
            name: "",
            email: "",
            phoneNumber: "",
            role: "",
            linkedinProfile: ""
          })}
          onRemove={removeHrContact}
          maxItems={3}
          addButtonText="Add HR Contact"
          emptyMessage="Add HR contacts who will manage the internship program."
          renderField={(field, index) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    {...register(`hrContacts.${index}.name`)}
                    placeholder="Contact person name"
                  />
                  {errors.hrContacts?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {errors.hrContacts[index]?.name?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    {...register(`hrContacts.${index}.email`)}
                    placeholder="email@company.com"
                  />
                  {errors.hrContacts?.[index]?.email && (
                    <p className="text-sm text-destructive">
                      {errors.hrContacts[index]?.email?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    {...register(`hrContacts.${index}.phoneNumber`)}
                    placeholder="+91 9876543210"
                  />
                  {errors.hrContacts?.[index]?.phoneNumber && (
                    <p className="text-sm text-destructive">
                      {errors.hrContacts[index]?.phoneNumber?.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Input
                    {...register(`hrContacts.${index}.role`)}
                    placeholder="HR Manager, Recruiter, etc."
                  />
                  {errors.hrContacts?.[index]?.role && (
                    <p className="text-sm text-destructive">
                      {errors.hrContacts[index]?.role?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>LinkedIn Profile (Optional)</Label>
                <Input
                  {...register(`hrContacts.${index}.linkedinProfile`)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          )}
        />
      </div>

      {/* Technical Contacts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Contacts</h3>
        <p className="text-sm text-muted-foreground">
          Add technical team members who will mentor or work with interns.
        </p>
        
        <DynamicFormArray
          fields={techFields}
          onAdd={() => addTechContact({
            name: "",
            email: "",
            role: "",
            department: ""
          })}
          onRemove={removeTechContact}
          maxItems={3}
          addButtonText="Add Technical Contact"
          emptyMessage="Add technical team members for intern mentorship."
          renderField={(field, index) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  {...register(`technicalContacts.${index}.name`)}
                  placeholder="Team lead name"
                />
                {errors.technicalContacts?.[index]?.name && (
                  <p className="text-sm text-destructive">
                    {errors.technicalContacts[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  {...register(`technicalContacts.${index}.email`)}
                  placeholder="email@company.com"
                />
                {errors.technicalContacts?.[index]?.email && (
                  <p className="text-sm text-destructive">
                    {errors.technicalContacts[index]?.email?.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Role *</Label>
                <Input
                  {...register(`technicalContacts.${index}.role`)}
                  placeholder="Tech Lead, Senior Developer, etc."
                />
                {errors.technicalContacts?.[index]?.role && (
                  <p className="text-sm text-destructive">
                    {errors.technicalContacts[index]?.role?.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Department *</Label>
                <Input
                  {...register(`technicalContacts.${index}.department`)}
                  placeholder="Engineering, Product, etc."
                />
                {errors.technicalContacts?.[index]?.department && (
                  <p className="text-sm text-destructive">
                    {errors.technicalContacts[index]?.department?.message}
                  </p>
                )}
              </div>
            </div>
          )}
        />
      </div>

      {/* Company Representative */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Company Representative</h3>
        <p className="text-sm text-muted-foreground">
          Primary contact person representing the company for this internship program.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              {...register("companyRepresentative.name")}
              placeholder="Representative name"
            />
            {errors.companyRepresentative?.name && (
              <p className="text-sm text-destructive">
                {errors.companyRepresentative.name.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              {...register("companyRepresentative.email")}
              placeholder="representative@company.com"
            />
            {errors.companyRepresentative?.email && (
              <p className="text-sm text-destructive">
                {errors.companyRepresentative.email.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input
              {...register("companyRepresentative.phoneNumber")}
              placeholder="+91 9876543210"
            />
            {errors.companyRepresentative?.phoneNumber && (
              <p className="text-sm text-destructive">
                {errors.companyRepresentative.phoneNumber.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Designation *</Label>
            <Input
              {...register("companyRepresentative.designation")}
              placeholder="CTO, VP Engineering, etc."
            />
            {errors.companyRepresentative?.designation && (
              <p className="text-sm text-destructive">
                {errors.companyRepresentative.designation.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Years with Company *</Label>
            <Input
              type="number"
              {...register("companyRepresentative.yearsWithCompany", { valueAsNumber: true })}
              placeholder="5"
              min="0"
            />
            {errors.companyRepresentative?.yearsWithCompany && (
              <p className="text-sm text-destructive">
                {errors.companyRepresentative.yearsWithCompany.message}
              </p>
            )}
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
            Continue to Verification
          </Button>
        </div>
      </div>
    </form>
  );
};