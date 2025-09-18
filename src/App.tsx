import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import StudentOnboarding from "./pages/onboarding/StudentOnboarding";
import CompanyOnboarding from "./pages/onboarding/CompanyOnboarding";
import MinistryOnboarding from "./pages/onboarding/MinistryOnboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/applications" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentDashboard />} />
          <Route path="/student/companies" element={<StudentDashboard />} />
          <Route path="/student/notifications" element={<StudentDashboard />} />
          <Route path="/student/assessment" element={<StudentDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/talent" element={<CompanyDashboard />} />
          <Route path="/company/candidates" element={<CompanyDashboard />} />
          <Route path="/company/activity" element={<CompanyDashboard />} />
          <Route path="/company/messages" element={<CompanyDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/onboarding/student" element={<StudentOnboarding />} />
          <Route path="/onboarding/company" element={<CompanyOnboarding />} />
          <Route path="/onboarding/ministry" element={<MinistryOnboarding />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
