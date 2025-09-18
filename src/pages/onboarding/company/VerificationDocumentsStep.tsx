import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/onboarding/FileUpload";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ArrowLeft } from "lucide-react";

const verificationDocumentsSchema = z.object({
  declarations: z.object({
    genuineCompany: z.boolean().refine(val => val === true, "This declaration is required"),
    followLaborLaws: z.boolean().refine(val => val === true, "This declaration is required"),
    provideStipend: z.boolean().refine(val => val === true, "This declaration is required"),
    noDiscrimination: z.boolean().refine(val => val === true, "This declaration is required"),
    dataProtection: z.boolean().refine(val => val === true, "This declaration is required"),
  })
});

type VerificationDocumentsData = z.infer<typeof verificationDocumentsSchema>;

interface VerificationDocumentsStepProps {
  onComplete: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export const VerificationDocumentsStep = ({ onComplete, onPrevious, isLoading }: VerificationDocumentsStepProps) => {
  const { userData, updateUserData } = useOnboarding();
  const [registrationCert, setRegistrationCert] = useState<File[]>([]);
  const [taxDocuments, setTaxDocuments] = useState<File[]>([]);
  const [panCard, setPanCard] = useState<File[]>([]);
  const [addressProof, setAddressProof] = useState<File[]>([]);
  const [authorizationLetter, setAuthorizationLetter] = useState<File[]>([]);
  const [additionalDocuments, setAdditionalDocuments] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<VerificationDocumentsData>({
    resolver: zodResolver(verificationDocumentsSchema),
    defaultValues: userData.verificationDocuments || {
      declarations: {
        genuineCompany: false,
        followLaborLaws: false,
        provideStipend: false,
        noDiscrimination: false,
        dataProtection: false,
      }
    }
  });

  const declarations = watch("declarations");

  const onSubmit = (data: VerificationDocumentsData) => {
    updateUserData('verificationDocuments', {
      ...data,
      documents: {
        registrationCert,
        taxDocuments,
        panCard,
        addressProof,
        authorizationLetter,
        additionalDocuments
      }
    });
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Document Upload Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Company Verification Documents</h3>
          <p className="text-sm text-muted-foreground">
            Upload the required documents to verify your company's legitimacy and compliance.
          </p>
        </div>

        <div className="grid gap-6">
          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={10}
            multiple={false}
            onUpload={setRegistrationCert}
            preview={true}
            required={true}
            label="Company Registration Certificate *"
            description="Upload your company's certificate of incorporation or registration (PDF or image, max 10MB)"
            existingFiles={registrationCert}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={10}
            multiple={true}
            onUpload={setTaxDocuments}
            preview={true}
            required={true}
            label="Tax Documents *"
            description="Upload GST certificate, PAN card, or other tax-related documents (PDF or image, max 10MB each)"
            existingFiles={taxDocuments}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            multiple={false}
            onUpload={setPanCard}
            preview={true}
            required={true}
            label="Company PAN Card *"
            description="Upload your company's PAN card (PDF or image, max 5MB)"
            existingFiles={panCard}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            multiple={false}
            onUpload={setAddressProof}
            preview={true}
            required={true}
            label="Address Proof *"
            description="Upload utility bill, lease agreement, or other address proof (PDF or image, max 5MB)"
            existingFiles={addressProof}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            multiple={false}
            onUpload={setAuthorizationLetter}
            preview={true}
            label="Authorization Letter (Optional)"
            description="If registering on behalf of someone else, upload authorization letter (PDF or image, max 5MB)"
            existingFiles={authorizationLetter}
          />

          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            multiple={true}
            onUpload={setAdditionalDocuments}
            preview={true}
            label="Additional Documents (Optional)"
            description="Any other relevant documents like certifications, awards, etc. (PDF or image, max 5MB each)"
            existingFiles={additionalDocuments}
          />
        </div>
      </div>

      {/* Declarations Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Legal Declarations</h3>
        <p className="text-sm text-muted-foreground">
          Please read and agree to the following declarations before completing your registration.
        </p>

        <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="genuineCompany"
              checked={declarations.genuineCompany}
              onCheckedChange={(checked) => setValue("declarations.genuineCompany", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="genuineCompany" className="text-sm font-medium cursor-pointer">
                Genuine Company Declaration *
              </Label>
              <p className="text-xs text-muted-foreground">
                I declare that this is a genuine company and all information provided is accurate and truthful.
              </p>
            </div>
          </div>
          {errors.declarations?.genuineCompany && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.genuineCompany.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="followLaborLaws"
              checked={declarations.followLaborLaws}
              onCheckedChange={(checked) => setValue("declarations.followLaborLaws", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="followLaborLaws" className="text-sm font-medium cursor-pointer">
                Labor Law Compliance *
              </Label>
              <p className="text-xs text-muted-foreground">
                I agree to follow all applicable labor laws and provide a safe working environment for interns.
              </p>
            </div>
          </div>
          {errors.declarations?.followLaborLaws && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.followLaborLaws.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="provideStipend"
              checked={declarations.provideStipend}
              onCheckedChange={(checked) => setValue("declarations.provideStipend", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="provideStipend" className="text-sm font-medium cursor-pointer">
                Stipend Commitment *
              </Label>
              <p className="text-xs text-muted-foreground">
                I commit to providing fair stipend to interns as per the internship terms and conditions.
              </p>
            </div>
          </div>
          {errors.declarations?.provideStipend && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.provideStipend.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="noDiscrimination"
              checked={declarations.noDiscrimination}
              onCheckedChange={(checked) => setValue("declarations.noDiscrimination", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="noDiscrimination" className="text-sm font-medium cursor-pointer">
                Non-Discrimination Policy *
              </Label>
              <p className="text-xs text-muted-foreground">
                I agree to maintain a discrimination-free workplace regardless of gender, caste, religion, or background.
              </p>
            </div>
          </div>
          {errors.declarations?.noDiscrimination && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.noDiscrimination.message}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="dataProtection"
              checked={declarations.dataProtection}
              onCheckedChange={(checked) => setValue("declarations.dataProtection", !!checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="dataProtection" className="text-sm font-medium cursor-pointer">
                Data Protection Agreement *
              </Label>
              <p className="text-xs text-muted-foreground">
                I agree to protect and responsibly handle all student data in accordance with privacy regulations.
              </p>
            </div>
          </div>
          {errors.declarations?.dataProtection && (
            <p className="text-sm text-destructive ml-6">
              {errors.declarations.dataProtection.message}
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