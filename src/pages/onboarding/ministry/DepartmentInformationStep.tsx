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
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const departmentInformationSchema = z.object({
  ministryName: z.string().min(1, "Ministry name is required"),
  departmentName: z.string().min(1, "Department name is required"),
  divisionName: z.string().optional(),
  sectionName: z.string().optional(),
  officeLocation: z.string().min(1, "Office location is required"),
  jurisdictionArea: z.array(z.string()).min(1, "At least one jurisdiction area is required"),
  primaryResponsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  relatedSchemes: z.array(z.string())
});

type DepartmentInformationData = z.infer<typeof departmentInformationSchema>;

interface DepartmentInformationStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const DepartmentInformationStep = ({ onNext, onPrevious }: DepartmentInformationStepProps) => {
  const { userData, updateUserData } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<DepartmentInformationData>({
    resolver: zodResolver(departmentInformationSchema),
    defaultValues: userData.departmentInformation || {
      ministryName: "",
      departmentName: "",
      divisionName: "",
      sectionName: "",
      officeLocation: "",
      jurisdictionArea: [""],
      primaryResponsibilities: [""],
      relatedSchemes: [""]
    }
  });

  const { fields: jurisdictionFields, append: addJurisdiction, remove: removeJurisdiction } = useFieldArray({
    control,
    name: "jurisdictionArea"
  });

  const { fields: responsibilityFields, append: addResponsibility, remove: removeResponsibility } = useFieldArray({
    control,
    name: "primaryResponsibilities"
  });

  const { fields: schemeFields, append: addScheme, remove: removeScheme } = useFieldArray({
    control,
    name: "relatedSchemes"
  });

  const onSubmit = (data: DepartmentInformationData) => {
    updateUserData('departmentInformation', data);
    onNext();
  };

  const ministries = [
    "Ministry of Education",
    "Ministry of Skill Development and Entrepreneurship",
    "Ministry of Labour and Employment",
    "Ministry of Electronics and Information Technology",
    "Ministry of Commerce and Industry",
    "Ministry of Health and Family Welfare",
    "Ministry of Agriculture and Farmers Welfare",
    "Other"
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Department Information</h3>
        <p className="text-sm text-muted-foreground">
          Provide details about your ministry, department, and areas of responsibility.
        </p>
      </div>

      {/* Ministry and Department Details */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Ministry & Department</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ministry Name *</Label>
            <Select onValueChange={(value) => setValue("ministryName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select ministry" />
              </SelectTrigger>
              <SelectContent>
                {ministries.map((ministry) => (
                  <SelectItem key={ministry} value={ministry}>
                    {ministry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ministryName && (
              <p className="text-sm text-destructive">{errors.ministryName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Department Name *</Label>
            <Input
              {...register("departmentName")}
              placeholder="Department of Higher Education"
            />
            {errors.departmentName && (
              <p className="text-sm text-destructive">{errors.departmentName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Division Name (Optional)</Label>
            <Input
              {...register("divisionName")}
              placeholder="Technical Education Division"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Section Name (Optional)</Label>
            <Input
              {...register("sectionName")}
              placeholder="Policy Planning Section"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label>Office Location *</Label>
            <Input
              {...register("officeLocation")}
              placeholder="Shastri Bhawan, New Delhi"
            />
            {errors.officeLocation && (
              <p className="text-sm text-destructive">{errors.officeLocation.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Jurisdiction Areas */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Jurisdiction Areas</h4>
        <p className="text-sm text-muted-foreground">
          Specify the states, regions, or areas under your jurisdiction for this scheme.
        </p>
        
        <DynamicFormArray
          fields={jurisdictionFields}
          onAdd={() => addJurisdiction("")}
          onRemove={removeJurisdiction}
          maxItems={10}
          addButtonText="Add Jurisdiction Area"
          emptyMessage="Add states or regions under your jurisdiction."
          renderField={(field, index) => (
            <div className="space-y-2">
              <Input
                {...register(`jurisdictionArea.${index}` as const)}
                placeholder="e.g., Delhi, Uttar Pradesh, All India"
              />
            </div>
          )}
        />
        {errors.jurisdictionArea && (
          <p className="text-sm text-destructive">At least one jurisdiction area is required</p>
        )}
      </div>

      {/* Primary Responsibilities */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Primary Responsibilities</h4>
        <p className="text-sm text-muted-foreground">
          List your key areas of responsibility related to internship and employment schemes.
        </p>
        
        <DynamicFormArray
          fields={responsibilityFields}
          onAdd={() => addResponsibility("")}
          onRemove={removeResponsibility}
          maxItems={8}
          addButtonText="Add Responsibility"
          emptyMessage="Add your primary responsibilities."
          renderField={(field, index) => (
            <div className="space-y-2">
              <Textarea
                {...register(`primaryResponsibilities.${index}` as const)}
                placeholder="e.g., Policy formulation for skill development programs"
                className="min-h-[60px]"
              />
            </div>
          )}
        />
        {errors.primaryResponsibilities && (
          <p className="text-sm text-destructive">At least one responsibility is required</p>
        )}
      </div>

      {/* Related Schemes */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Related Government Schemes</h4>
        <p className="text-sm text-muted-foreground">
          List any government schemes related to internships, employment, or skill development that you oversee.
        </p>
        
        <DynamicFormArray
          fields={schemeFields}
          onAdd={() => addScheme("")}
          onRemove={removeScheme}
          maxItems={10}
          addButtonText="Add Related Scheme"
          emptyMessage="Add related government schemes (optional)."
          renderField={(field, index) => (
            <div className="space-y-2">
              <Input
                {...register(`relatedSchemes.${index}` as const)}
                placeholder="e.g., Pradhan Mantri Kaushal Vikas Yojana, PMKVY"
              />
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
          Continue to Access Permissions
        </Button>
      </div>
    </form>
  );
};