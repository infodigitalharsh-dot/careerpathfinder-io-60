import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DynamicFormArray } from "@/components/onboarding/DynamicFormArray";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const accessPermissionsSchema = z.object({
  accessLevel: z.enum(['viewer', 'moderator', 'administrator'], {
    required_error: "Please select an access level"
  }),
  permissionAreas: z.object({
    studentDataAccess: z.boolean(),
    companyDataAccess: z.boolean(),
    reportGeneration: z.boolean(),
    policyImplementation: z.boolean(),
    complianceMonitoring: z.boolean(),
    grievanceHandling: z.boolean(),
  }),
  dataAccessJustification: z.string().min(50, "Please provide detailed justification (minimum 50 characters)"),
  supervisionScope: z.array(z.string()).min(1, "At least one supervision area is required")
});

type AccessPermissionsData = z.infer<typeof accessPermissionsSchema>;

interface AccessPermissionsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const AccessPermissionsStep = ({ onNext, onPrevious }: AccessPermissionsStepProps) => {
  const { userData, updateUserData } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<AccessPermissionsData>({
    resolver: zodResolver(accessPermissionsSchema),
    defaultValues: userData.accessPermissions || {
      accessLevel: undefined,
      permissionAreas: {
        studentDataAccess: false,
        companyDataAccess: false,
        reportGeneration: false,
        policyImplementation: false,
        complianceMonitoring: false,
        grievanceHandling: false,
      },
      dataAccessJustification: "",
      supervisionScope: [""]
    }
  });

  const { fields: scopeFields, append: addScope, remove: removeScope } = (useFieldArray as any)({
    control,
    name: "supervisionScope",
  });

  const permissionAreas = watch("permissionAreas");
  const accessLevel = watch("accessLevel");

  const onSubmit = (data: AccessPermissionsData) => {
    updateUserData('accessPermissions', data);
    onNext();
  };

  // Temporary Skip for demo
  const handleSkip = () => {
    onNext();
  };

  const accessLevels = [
    {
      value: "viewer",
      label: "Viewer",
      description: "Read-only access to reports and data dashboards"
    },
    {
      value: "moderator",
      label: "Moderator",
      description: "Can review and approve registrations, generate reports"
    },
    {
      value: "administrator",
      label: "Administrator", 
      description: "Full access including policy implementation and system configuration"
    }
  ];

  const permissionOptions = [
    {
      key: "studentDataAccess",
      label: "Student Data Access",
      description: "Access to student profiles, applications, and academic information"
    },
    {
      key: "companyDataAccess",
      label: "Company Data Access",
      description: "Access to company profiles, job postings, and hiring data"
    },
    {
      key: "reportGeneration",
      label: "Report Generation",
      description: "Generate and download various analytical reports"
    },
    {
      key: "policyImplementation",
      label: "Policy Implementation",
      description: "Implement and modify scheme policies and guidelines"
    },
    {
      key: "complianceMonitoring",
      label: "Compliance Monitoring",
      description: "Monitor and ensure compliance with scheme requirements"
    },
    {
      key: "grievanceHandling",
      label: "Grievance Handling",
      description: "Handle and resolve student and company grievances"
    }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Access Permissions</h3>
        <p className="text-sm text-muted-foreground">
          Define your access level and permissions required for overseeing the PM Internship Scheme.
        </p>
      </div>

      {/* Access Level Selection */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Access Level</h4>
        <Select onValueChange={(value) => setValue("accessLevel", value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your required access level" />
          </SelectTrigger>
          <SelectContent>
            {accessLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div className="space-y-1">
                  <div className="font-medium">{level.label}</div>
                  <div className="text-xs text-muted-foreground">{level.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.accessLevel && (
          <p className="text-sm text-destructive">{errors.accessLevel.message}</p>
        )}
      </div>

      {/* Permission Areas */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Required Permissions</h4>
        <p className="text-sm text-muted-foreground">
          Select the specific areas where you need access to fulfill your responsibilities.
        </p>
        
        <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
          {permissionOptions.map((permission) => (
            <div key={permission.key} className="flex items-start space-x-3">
              <Checkbox
                id={permission.key}
                checked={permissionAreas[permission.key as keyof typeof permissionAreas]}
                onCheckedChange={(checked) => 
                  setValue(`permissionAreas.${permission.key}` as any, !!checked)
                }
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor={permission.key} className="text-sm font-medium cursor-pointer">
                  {permission.label}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {permission.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Access Justification */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Data Access Justification</h4>
        <div className="space-y-2">
          <Label>Justification for Data Access *</Label>
          <Textarea
            {...register("dataAccessJustification")}
            placeholder="Please provide a detailed explanation of why you need access to the requested data and how it relates to your official responsibilities in overseeing the PM Internship Scheme..."
            className="min-h-[120px]"
          />
          {errors.dataAccessJustification && (
            <p className="text-sm text-destructive">{errors.dataAccessJustification.message}</p>
          )}
        </div>
      </div>

      {/* Supervision Scope */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Supervision Scope</h4>
        <p className="text-sm text-muted-foreground">
          Define the specific areas or aspects of the scheme that you will supervise.
        </p>
        
        <DynamicFormArray
          fields={scopeFields}
          onAdd={() => addScope("")}
          onRemove={removeScope}
          maxItems={8}
          addButtonText="Add Supervision Area"
          emptyMessage="Add areas that you will supervise under this scheme."
          renderField={(field, index) => (
            <div className="space-y-2">
              <Textarea
                {...register(`supervisionScope.${index}` as const)}
                placeholder="e.g., Quality assurance of internship programs in technical institutions"
                className="min-h-[60px]"
              />
            </div>
          )}
        />
        {errors.supervisionScope && (
          <p className="text-sm text-destructive">At least one supervision area is required</p>
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
            Continue to Verification
          </Button>
        </div>
      </div>
    </form>
  );
};