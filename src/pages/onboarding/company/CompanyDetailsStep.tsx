import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOnboarding } from "@/contexts/OnboardingContext";

const companyDetailsSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyEmail: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL"),
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  foundedYear: z.number().min(1800, "Invalid year").max(new Date().getFullYear(), "Year cannot be in the future"),
  headOfficeAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  }),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']),
  industry: z.string().min(1, "Industry is required"),
  companyType: z.enum(['startup', 'private', 'public', 'government', 'ngo']),
});

type CompanyDetailsData = z.infer<typeof companyDetailsSchema>;

interface CompanyDetailsStepProps {
  onNext: () => void;
}

const INDUSTRIES = [
  "Information Technology",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Education",
  "E-commerce",
  "Consulting",
  "Media & Entertainment",
  "Telecommunications",
  "Automotive",
  "Real Estate",
  "Agriculture",
  "Energy",
  "Transportation",
  "Other"
];

export const CompanyDetailsStep = ({ onNext }: CompanyDetailsStepProps) => {
  const { userData, updateUserData } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyDetailsData>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: userData.companyDetails || {}
  });

  const watchedCompanySize = watch("companySize");
  const watchedIndustry = watch("industry");
  const watchedCompanyType = watch("companyType");

  useEffect(() => {
    if (userData.companyDetails) {
      Object.keys(userData.companyDetails).forEach(key => {
        if (key === 'headOfficeAddress') {
          Object.keys(userData.companyDetails.headOfficeAddress).forEach(addressKey => {
            setValue(`headOfficeAddress.${addressKey}` as any, userData.companyDetails.headOfficeAddress[addressKey]);
          });
        } else {
          setValue(key as keyof CompanyDetailsData, userData.companyDetails[key]);
        }
      });
    }
  }, [userData.companyDetails, setValue]);

  const onSubmit = (data: CompanyDetailsData) => {
    updateUserData('companyDetails', data);
    onNext();
  };

  // Temporary Skip for demo
  const handleSkip = () => {
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Company Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your company to help students understand who you are.
        </p>
      </div>

      {/* Basic Company Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Basic Information</h4>
          
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              {...register("companyName")}
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyEmail">Company Email *</Label>
            <Input
              id="companyEmail"
              type="email"
              {...register("companyEmail")}
              placeholder="contact@company.com"
            />
            {errors.companyEmail && (
              <p className="text-sm text-destructive">{errors.companyEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website *</Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="https://www.company.com"
            />
            {errors.website && (
              <p className="text-sm text-destructive">{errors.website.message}</p>
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
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Company Details</h4>
          
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number *</Label>
            <Input
              id="registrationNumber"
              {...register("registrationNumber")}
              placeholder="Company registration number"
            />
            {errors.registrationNumber && (
              <p className="text-sm text-destructive">{errors.registrationNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="foundedYear">Founded Year *</Label>
            <Input
              id="foundedYear"
              type="number"
              {...register("foundedYear", { valueAsNumber: true })}
              placeholder="2020"
            />
            {errors.foundedYear && (
              <p className="text-sm text-destructive">{errors.foundedYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company Size *</Label>
            <Select onValueChange={(value) => setValue("companySize", value as any)} value={watchedCompanySize}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-1000">201-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-sm text-destructive">{errors.companySize.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Industry *</Label>
            <Select onValueChange={(value) => setValue("industry", value)} value={watchedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-destructive">{errors.industry.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company Type *</Label>
            <Select onValueChange={(value) => setValue("companyType", value as any)} value={watchedCompanyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="private">Private Limited</SelectItem>
                <SelectItem value="public">Public Limited</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="ngo">NGO/Non-profit</SelectItem>
              </SelectContent>
            </Select>
            {errors.companyType && (
              <p className="text-sm text-destructive">{errors.companyType.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Head Office Address */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Head Office Address</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              {...register("headOfficeAddress.street")}
              placeholder="Building name, street address"
            />
            {errors.headOfficeAddress?.street && (
              <p className="text-sm text-destructive">{errors.headOfficeAddress.street.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              {...register("headOfficeAddress.city")}
              placeholder="City name"
            />
            {errors.headOfficeAddress?.city && (
              <p className="text-sm text-destructive">{errors.headOfficeAddress.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              {...register("headOfficeAddress.state")}
              placeholder="State name"
            />
            {errors.headOfficeAddress?.state && (
              <p className="text-sm text-destructive">{errors.headOfficeAddress.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              {...register("headOfficeAddress.country")}
              placeholder="Country name"
              defaultValue="India"
            />
            {errors.headOfficeAddress?.country && (
              <p className="text-sm text-destructive">{errors.headOfficeAddress.country.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              {...register("headOfficeAddress.pincode")}
              placeholder="6-digit pincode"
            />
            {errors.headOfficeAddress?.pincode && (
              <p className="text-sm text-destructive">{errors.headOfficeAddress.pincode.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="ghost" onClick={handleSkip} size="lg">
          Skip (Demo)
        </Button>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Continue to Company Profile
        </Button>
      </div>
    </form>
  );
};