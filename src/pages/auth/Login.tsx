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
  Chrome,
  Linkedin
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "company" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const roleFromUrl = searchParams.get("role") as "student" | "company" | "admin";
  
  useState(() => {
    if (roleFromUrl && ["student", "company", "admin"].includes(roleFromUrl)) {
      setSelectedRole(roleFromUrl);
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to your ${selectedRole} dashboard.`,
        variant: "default",
      });

      // Redirect based on role
      navigate(`/${selectedRole}/dashboard`);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `${provider} login will be implemented soon.`,
      variant: "default",
    });
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "student":
        return {
          icon: User,
          title: "Student Login",
          description: "Access your internship applications and opportunities",
          color: "bg-blue-100 text-blue-800 border-blue-200"
        };
      case "company":
        return {
          icon: Building2,
          title: "Company Login",
          description: "Manage your internship postings and candidates",
          color: "bg-green-100 text-green-800 border-green-200"
        };
      case "admin":
        return {
          icon: Shield,
          title: "Admin Login",
          description: "Government portal for scheme management",
          color: "bg-purple-100 text-purple-800 border-purple-200"
        };
      default:
        return {
          icon: User,
          title: "Login",
          description: "Access your account",
          color: "bg-gray-100 text-gray-800 border-gray-200"
        };
    }
  };

  const roleInfo = getRoleInfo(selectedRole);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-lighter/30 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-pattern-dots opacity-5" />
      
      <div className="w-full max-w-md relative">
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
            <span className="text-white font-bold text-xl">IS</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Intern Setu</h1>
          <p className="text-muted-foreground">Government of India</p>
        </div>

        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <RoleIcon className="h-6 w-6 text-primary" />
              <Badge className={roleInfo.color}>
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{roleInfo.title}</CardTitle>
            <CardDescription>{roleInfo.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection */}
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Student</span>
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Company</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedRole} className="space-y-4 mt-6">
                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email or Phone</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Link 
                      to="/auth/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="hero"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                {/* Social Login */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full"
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("LinkedIn")}
                    className="w-full"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>

                {/* Register Link */}
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link 
                    to={`/auth/register?role=${selectedRole}`} 
                    className="text-primary hover:underline font-medium"
                  >
                    Register here
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Government Footer */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Secured by Government of India | Ministry of Skill Development & Entrepreneurship</p>
        </div>
      </div>
    </div>
  );
}