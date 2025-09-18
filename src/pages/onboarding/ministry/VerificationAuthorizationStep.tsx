import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const verificationAuthorizationSchema = z.object({
  declarations: z.object({
    governmentEmployee: z.boolean().refine(val => val === true, "This declaration is required"),
    authorizedAccess: z.boolean().refine(val => val === true, "This declaration is required"),
    dataConfidentiality: z.boolean().refine(val => val === true, "This declaration is required"),
    ethicalUse: z.boolean().refine(val => val === true, "This declaration is required"),
    reportingCompliance: z.boolean().refine(val => val === true, "This declaration is required"),
  }),
  digitalSignature: z.string().optional(),
  biometricVerification: z.boolean().optional()
});

type VerificationAuthorizationData = z.infer<typeof verificationAuthorizationSchema>;

interface VerificationAuthorizationStepProps {
  onComplete: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export const VerificationAuthorizationStep = ({ onComplete, onPrevious, isLoading }: VerificationAuthorizationStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [governmentId, setGovernmentId] = useState<File[]>([]);
  const [employeeIdCard, setEmployeeIdCard] = useState<File[]>([]);
  const [authorizationLetter, setAuthorizationLetter] = useState<File[]>([]);
  const [officialOrderCopy, setOfficialOrderCopy] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<VerificationAuthorizationData>({
    resolver: zodResolver(verificationAuthorizationSchema),
    defaultValues: userData.verificationAuthorization || {
      declarations: {
        governmentEmployee: false,
        authorizedAccess: false,
        dataConfidentiality: false,
        ethicalUse: false,
        reportingCompliance: false,
      },
      digitalSignature: "",
      biometricVerification: false
    }
  });

  const declarations = watch("declarations");

  const onSubmit = (data: VerificationAuthorizationData) => {
    updateUserData('verificationAuthorization', {
      ...data,
      documents: {
        governmentId,
        employeeIdCard,
        authorizationLetter,
        officialOrderCopy
      }
    });
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Verification & Authorization</h3>
        <p className="text-sm text-muted-foreground">
          Upload verification documents and complete authorization declarations to finalize your access.
        </p>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-6">
        <h4 className="text-md font-medium">Verification Documents</h4>
        
        <div className="grid gap-6">
          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            multiple={false}
            onUpload={setGovernmentId}
            preview={true}
            required={true}
            label="Government ID *"
            description="Upload Aadhaar card, PAN card, or Voter ID (PDF or image, max 5MB)"
            existingFiles={governmentId}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            multiple={false}
            onUpload={setEmployeeIdCard}
            preview={true}
            required={true}
            label="Employee ID Card *"
            description="Upload your government employee ID card (PDF or image, max 5MB)"
            existingFiles={employeeIdCard}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={10}
            multiple={false}
            onUpload={setAuthorizationLetter}
            preview={true}
            required={true}
            label="Authorization Letter *"
            description="Upload authorization letter from your superior officer for platform access (PDF or image, max 10MB)"
            existingFiles={authorizationLetter}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={10}
            multiple={false}
            onUpload={setOfficialOrderCopy}
            preview={true}
            required={true}
            label="Official Order Copy *"
            description="Upload copy of appointment or transfer order (PDF or image, max 10MB)"
            existingFiles={officialOrderCopy}
          />
        </div>
      </div>

      {/* Digital Signature (Optional) */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Digital Authentication (Optional)</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Digital Signature (Optional)</Label>
            <Input
              {...register("digitalSignature")}
              placeholder="Digital signature certificate details"
            />
            <p className="text-xs text-muted-foreground">
              If you have a digital signature certificate, please provide the details for enhanced security.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="biometricVerification"
              {...register("biometricVerification")}
            />
            <Label htmlFor="biometricVerification" className="text-sm cursor-pointer">
              I consent to biometric verification if required (future implementation)
            </Label>
          </div>
        </div>
      </div>

      {/* Legal Declarations */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Authorization Declarations</h4>
        <p className="text-sm text-muted-foreground">
          Please read and agree to the following declarations before completing your registration.
        </p>

        <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="governmentEmployee"
              checked={declarations.governmentEmployee}
              onCheckedChange={(checked) => setValue("declarations.governmentEmployee", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="governmentEmployee" className="text-sm font-medium cursor-pointer">
                Government Employee Declaration *
              </Label>
              <p className="text-xs text-muted-foreground">
                I confirm that I am a bona fide government employee and all provided information is accurate.
              </p>
            </div>
          </div>
          {errors.declarations?.governmentEmployee && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.governmentEmployee.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="authorizedAccess"
              checked={declarations.authorizedAccess}
              onCheckedChange={(checked) => setValue("declarations.authorizedAccess", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="authorizedAccess" className="text-sm font-medium cursor-pointer">
                Authorized Access Declaration *
              </Label>
              <p className="text-xs text-muted-foreground">
                I have proper authorization from my superior officers to access this platform and its data.
              </p>
            </div>
          </div>
          {errors.declarations?.authorizedAccess && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.authorizedAccess.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="dataConfidentiality"
              checked={declarations.dataConfidentiality}
              onCheckedChange={(checked) => setValue("declarations.dataConfidentiality", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="dataConfidentiality" className="text-sm font-medium cursor-pointer">
                Data Confidentiality Agreement *
              </Label>
              <p className="text-xs text-muted-foreground">
                I agree to maintain strict confidentiality of all student and company data accessed through this platform.
              </p>
            </div>
          </div>
          {errors.declarations?.dataConfidentiality && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.dataConfidentiality.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="ethicalUse"
              checked={declarations.ethicalUse}
              onCheckedChange={(checked) => setValue("declarations.ethicalUse", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="ethicalUse" className="text-sm font-medium cursor-pointer">
                Ethical Use Agreement *
              </Label>
              <p className="text-xs text-muted-foreground">
                I commit to using platform access solely for official purposes and in the interest of the scheme's objectives.
              </p>
            </div>
          </div>
          {errors.declarations?.ethicalUse && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.ethicalUse.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="reportingCompliance"
              checked={declarations.reportingCompliance}
              onCheckedChange={(checked) => setValue("declarations.reportingCompliance", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="reportingCompliance" className="text-sm font-medium cursor-pointer">
                Reporting Compliance *
              </Label>
              <p className="text-xs text-muted-foreground">
                I agree to comply with all reporting requirements and maintain proper documentation of platform usage.
              </p>
            </div>
          </div>
          {errors.declarations?.reportingCompliance && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.reportingCompliance.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? "Completing Registration..." : "Complete Registration"}
        </Button>
      </div>
    </form>
  );
};