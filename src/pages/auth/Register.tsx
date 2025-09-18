import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  EyeOff, 
  User, 
  Building2, 
  Shield, 
  ArrowLeft,
  Mail,
  Lock,
  Phone,
  UserPlus,
  Chrome,
  Linkedin,
  CheckCircle
} from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "company" | "ministry">("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const roleFromUrl = searchParams.get("role") as "student" | "company" | "ministry";
  
  useState(() => {
    if (roleFromUrl && ["student", "company", "ministry"].includes(roleFromUrl)) {
      setSelectedRole(roleFromUrl);
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: `Welcome aboard! Redirecting to your ${selectedRole} onboarding.`,
        variant: "default",
      });

      // Redirect to onboarding based on role
      navigate(`/onboarding/${selectedRole}`);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    toast({
      title: "Social Registration",
      description: `${provider} registration will be implemented soon.`,
      variant: "default",
    });
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "student":
        return {
          icon: User,
          title: "Student Registration",
          description: "Join thousands of students finding their dream internships",
          color: "bg-blue-50 text-blue-700 border-blue-200",
          benefits: [
            "Access to 10,000+ verified internships",
            "AI-powered job matching",
            "Skill development resources",
            "Government certification"
          ]
        };
      case "company":
        return {
          icon: Building2,
          title: "Company Registration",
          description: "Connect with India's brightest young talent",
          color: "bg-amber-50 text-amber-700 border-amber-200",
          benefits: [
            "Access to qualified student talent",
            "Streamlined hiring process",
            "Government partnership benefits",
            "Analytics and reporting tools"
          ]
        };
      case "ministry":
        return {
          icon: Shield,
          title: "Ministry Registration",
          description: "Government oversight and platform monitoring",
          color: "bg-purple-50 text-purple-700 border-purple-200",
          benefits: [
            "Platform oversight and monitoring",
            "Student progress tracking",
            "Company compliance management",
            "Data analytics and insights"
          ]
        };
      default:
        return {
          icon: User,
          title: "Registration",
          description: "Create your account",
          color: "bg-gray-50 text-gray-700 border-gray-200",
          benefits: []
        };
    }
  };

  const roleInfo = getRoleInfo(selectedRole);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-lighter/30 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-pattern-dots opacity-5" />
      
      <div className="w-full max-w-6xl relative">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Government Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PM</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">PM Internship Scheme</h1>
          <p className="text-muted-foreground">Government of India</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Benefits Card */}
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <RoleIcon className="h-6 w-6 text-primary" />
                <Badge className={roleInfo.color}>
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Benefits
                </Badge>
              </div>
              <CardTitle className="text-xl">Why Join Us?</CardTitle>
              <CardDescription>
                {selectedRole === "student" 
                  ? "Transform your career with India's most comprehensive internship platform"
                  : selectedRole === "company"
                  ? "Find exceptional talent and grow your business with government support"
                  : "Monitor and oversee the PM Internship Scheme implementation"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roleInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="card-elevated">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <UserPlus className="h-6 w-6 text-primary" />
                <Badge className={roleInfo.color}>
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                </Badge>
              </div>
              <CardTitle className="text-xl">{roleInfo.title}</CardTitle>
              <CardDescription>{roleInfo.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Role Selection */}
              <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Student</span>
                  </TabsTrigger>
                  <TabsTrigger value="company" className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>Company</span>
                  </TabsTrigger>
                  <TabsTrigger value="ministry" className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Ministry</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedRole} className="space-y-4 mt-6">
                  {/* Registration Form */}
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        {selectedRole === "student" ? "Full Name" : selectedRole === "company" ? "Company Name" : "Official Name"}
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder={selectedRole === "student" ? "Enter your full name" : selectedRole === "company" ? "Enter company name" : "Enter your official name"}
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={selectedRole === "ministry" ? "official@gov.in" : "your@email.com"}
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/code-of-conduct" className="text-primary hover:underline">
                            Code of Conduct
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy"
                          checked={acceptPrivacy}
                          onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
                        />
                        <Label htmlFor="privacy" className="text-sm leading-relaxed">
                          I acknowledge the{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>{" "}
                          and consent to data processing
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      variant="hero"
                      size="lg"
                      disabled={isLoading || !acceptTerms || !acceptPrivacy}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>

                  {/* Social Registration */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or register with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialRegister("Google")}
                      className="w-full"
                    >
                      <Chrome className="h-4 w-4 mr-2" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialRegister("LinkedIn")}
                      className="w-full"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link 
                      to={`/auth/login?role=${selectedRole}`} 
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in here
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Government Footer */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Secured by Government of India | Ministry of Skill Development & Entrepreneurship</p>
        </div>
      </div>
    </div>
  );
}