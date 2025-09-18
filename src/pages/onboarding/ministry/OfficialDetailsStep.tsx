import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";

const officialDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  officialEmail: z.string().email("Invalid email").refine(
    (email) => email.endsWith(".gov.in") || email.endsWith(".nic.in"),
    "Must be a government email address"
  ),
  phoneNumber: z.string().min(10, "Valid phone number required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  designation: z.string().min(1, "Designation is required"),
  officeAddress: z.object({
    buildingName: z.string().min(1, "Building name is required"),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Valid pincode required"),
  }),
  joiningDate: z.string().min(1, "Joining date is required"),
  reportingOfficer: z.object({
    name: z.string().min(1, "Reporting officer name is required"),
    designation: z.string().min(1, "Reporting officer designation is required"),
    email: z.string().email("Invalid email"),
  })
});

type OfficialDetailsData = z.infer<typeof officialDetailsSchema>;

interface OfficialDetailsStepProps {
  onNext: () => void;
}

export const OfficialDetailsStep = ({ onNext }: OfficialDetailsStepProps) => {
  const { userData, updateUserData } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<OfficialDetailsData>({
    resolver: zodResolver(officialDetailsSchema),
    defaultValues: userData.officialDetails || {
      fullName: "",
      officialEmail: "",
      phoneNumber: "",
      employeeId: "",
      designation: "",
      officeAddress: {
        buildingName: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
      joiningDate: "",
      reportingOfficer: {
        name: "",
        designation: "",
        email: "",
      }
    }
  });

  const onSubmit = (data: OfficialDetailsData) => {
    updateUserData('officialDetails', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Official Details</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your official government employment details for verification.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input
              {...register("fullName")}
              placeholder="Your full name as per official records"
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Official Email *</Label>
            <Input
              type="email"
              {...register("officialEmail")}
              placeholder="name@ministry.gov.in"
            />
            {errors.officialEmail && (
              <p className="text-sm text-destructive">{errors.officialEmail.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input
              {...register("phoneNumber")}
              placeholder="+91 9876543210"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Employee ID *</Label>
            <Input
              {...register("employeeId")}
              placeholder="Your government employee ID"
            />
            {errors.employeeId && (
              <p className="text-sm text-destructive">{errors.employeeId.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Designation *</Label>
            <Input
              {...register("designation")}
              placeholder="Joint Secretary, Director, etc."
            />
            {errors.designation && (
              <p className="text-sm text-destructive">{errors.designation.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Joining Date *</Label>
            <Input
              type="date"
              {...register("joiningDate")}
            />
            {errors.joiningDate && (
              <p className="text-sm text-destructive">{errors.joiningDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Office Address */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Office Address</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Building Name *</Label>
            <Input
              {...register("officeAddress.buildingName")}
              placeholder="Shastri Bhawan, Krishi Bhawan, etc."
            />
            {errors.officeAddress?.buildingName && (
              <p className="text-sm text-destructive">{errors.officeAddress.buildingName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Street Address *</Label>
            <Input
              {...register("officeAddress.street")}
              placeholder="Complete street address"
            />
            {errors.officeAddress?.street && (
              <p className="text-sm text-destructive">{errors.officeAddress.street.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                {...register("officeAddress.city")}
                placeholder="New Delhi"
              />
              {errors.officeAddress?.city && (
                <p className="text-sm text-destructive">{errors.officeAddress.city.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>State *</Label>
              <Input
                {...register("officeAddress.state")}
                placeholder="Delhi"
              />
              {errors.officeAddress?.state && (
                <p className="text-sm text-destructive">{errors.officeAddress.state.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Pincode *</Label>
              <Input
                {...register("officeAddress.pincode")}
                placeholder="110001"
              />
              {errors.officeAddress?.pincode && (
                <p className="text-sm text-destructive">{errors.officeAddress.pincode.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reporting Officer */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Reporting Officer Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              {...register("reportingOfficer.name")}
              placeholder="Reporting officer's full name"
            />
            {errors.reportingOfficer?.name && (
              <p className="text-sm text-destructive">{errors.reportingOfficer.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Designation *</Label>
            <Input
              {...register("reportingOfficer.designation")}
              placeholder="Secretary, Additional Secretary, etc."
            />
            {errors.reportingOfficer?.designation && (
              <p className="text-sm text-destructive">{errors.reportingOfficer.designation.message}</p>
            )}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label>Email *</Label>
            <Input
              type="email"
              {...register("reportingOfficer.email")}
              placeholder="officer@ministry.gov.in"
            />
            {errors.reportingOfficer?.email && (
              <p className="text-sm text-destructive">{errors.reportingOfficer.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" size="lg">
          Continue to Department Information
        </Button>
      </div>
    </form>
  );
};