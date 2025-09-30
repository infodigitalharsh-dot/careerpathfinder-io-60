import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Quote,
  Star,
  Heart,
  MapPin,
  Calendar,
  Users,
  Building2,
  Globe,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";

// How It Works Section
function HowItWorksSection() {
  const studentSteps = [
    {
      step: "01",
      title: "Register & Create Profile",
      description: "Sign up and complete your comprehensive profile with skills, education, and preferences."
    },
    {
      step: "02", 
      title: "Get AI Recommendations",
      description: "Our AI analyzes your profile and suggests the best-matched internship opportunities."
    },
    {
      step: "03",
      title: "Apply with One Click",
      description: "Apply to multiple internships instantly with our smart application system."
    },
    {
      step: "04",
      title: "Start Your Journey",
      description: "Get selected, complete your internship, and build your career with certification."
    }
  ];

  const companySteps = [
    {
      step: "01",
      title: "Company Verification",
      description: "Register your company and complete our government-verified onboarding process."
    },
    {
      step: "02",
      title: "Post Opportunities",
      description: "Create detailed internship postings with requirements and expectations."
    },
    {
      step: "03",
      title: "Review AI Matches",
      description: "Get AI-curated candidate recommendations based on your requirements."
    },
    {
      step: "04",
      title: "Hire & Grow",
      description: "Select the best candidates and watch your business grow with fresh talent."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            How It <span className="text-gradient-hero">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A streamlined process designed to connect the right talent with the right opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Students */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center">
              <Users className="h-6 w-6 text-primary mr-3" />
              For Students
            </h3>
            
            {studentSteps.map((step, index) => (
              <Card key={index} className="card-elevated p-6 relative">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < studentSteps.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                )}
              </Card>
            ))}
          </div>

          {/* For Companies */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center">
              <Building2 className="h-6 w-6 text-saffron mr-3" />
              For Companies
            </h3>
            
            {companySteps.map((step, index) => (
              <Card key={index} className="card-elevated p-6 relative">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-saffron to-saffron-light rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < companySteps.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-saffron to-transparent" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Success Stories Section
function SuccessStoriesSection() {
  const stories = [
    {
      name: "Priya Sharma",
      role: "Software Developer",
      company: "TechCorp India",
      location: "Jaipur, Rajasthan",
      image: "👩‍💻",
      story: "Intern Setu changed my life completely. As a student from a small town, I never imagined working with a top tech company. The AI matching was so accurate - it found the perfect role that matched my skills and aspirations.",
      outcome: "Got full-time offer with 40% salary hike",
      rating: 5
    },
    {
      name: "Arjun Patel",
      role: "Marketing Analyst",
      company: "GrowthLabs",
      location: "Ahmedabad, Gujarat",
      image: "👨‍💼", 
      story: "The platform's user-friendly interface and instant application process saved me so much time. I applied to 15 companies in one day and got responses from 8. The quality of companies on this platform is exceptional.",
      outcome: "Secured dream internship in Marketing",
      rating: 5
    },
    {
      name: "Kavya Reddy",
      role: "Data Scientist",
      company: "Analytics Pro",
      location: "Hyderabad, Telangana",
      image: "👩‍🔬",
      story: "What impressed me most was the skill-based matching. The system understood my data science background and connected me with companies that valued my specific skills. The mentorship during internship was incredible.",
      outcome: "Selected for prestigious fellowship program",
      rating: 5
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Real Stories, Real <span className="text-gradient-hero">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover how students across India are building successful careers through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="card-interactive p-6 h-full">
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-muted-foreground" />
                
                <p className="text-muted-foreground italic leading-relaxed">
                  "{story.story}"
                </p>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{story.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.role} at {story.company}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {story.location}
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="mt-3 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {story.outcome}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/success-stories">
            <Button variant="outline" size="lg">
              Read More Stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students and companies who are already part of India's 
            most innovative internship ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth/register?role=student">
              <Button size="xl" variant="outline" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                <Users className="h-5 w-5" />
                Start as Student
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth/register?role=company">
              <Button size="xl" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-full sm:w-auto">
                <Building2 className="h-5 w-5" />
                Register Company
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center text-white/80 text-sm">
            <div>
              <Heart className="h-5 w-5 mx-auto mb-2" />
              <div>Trusted by 125K+ Students</div>
            </div>
            <div>
              <Globe className="h-5 w-5 mx-auto mb-2" />
              <div>Available Pan-India</div>
            </div>
            <div>
              <Calendar className="h-5 w-5 mx-auto mb-2" />
              <div>Apply Anytime, Anywhere</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IS</span>
              </div>
              <div>
                <div className="font-bold text-foreground">Intern Setu</div>
                <div className="text-xs text-muted-foreground">Government of India</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering India's youth through technology-driven internship opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground">About Us</Link>
              <Link to="/how-it-works" className="block text-muted-foreground hover:text-foreground">How it Works</Link>
              <Link to="/success-stories" className="block text-muted-foreground hover:text-foreground">Success Stories</Link>
              <Link to="/help" className="block text-muted-foreground hover:text-foreground">Help & Support</Link>
            </div>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Users</h4>
            <div className="space-y-2 text-sm">
              <Link to="/auth/register?role=student" className="block text-muted-foreground hover:text-foreground">Student Registration</Link>
              <Link to="/auth/register?role=company" className="block text-muted-foreground hover:text-foreground">Company Registration</Link>
              <Link to="/auth/login" className="block text-muted-foreground hover:text-foreground">Login</Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@pminternship.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <a 
                href="https://skilldevelopment.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ministry Website</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Government of India. All rights reserved. | Ministry of Skill Development & Entrepreneurship</p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SuccessStoriesSection />
      <CTASection />
      <Footer />
    </div>
  );
}