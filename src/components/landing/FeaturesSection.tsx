import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Globe, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  MapPin,
  BookOpen,
  Award,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced algorithms analyze skills, preferences, and career goals to find perfect internship matches with 95% accuracy.",
    badge: "Smart Technology",
    color: "primary"
  },
  {
    icon: Globe,
    title: "Pan-India Reach",
    description: "Connect with opportunities across all states and union territories, from metropolitan cities to tier-3 towns.",
    badge: "National Coverage",
    color: "saffron"
  },
  {
    icon: Users,
    title: "Diversity & Inclusion",
    description: "Promoting equal opportunities for rural students, women, and underrepresented communities.",
    badge: "Social Impact",
    color: "success"
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description: "Comprehensive learning modules, certifications, and mentorship programs to enhance employability.",
    badge: "Career Growth",
    color: "warning"
  },
  {
    icon: Shield,
    title: "Government Verified",
    description: "All companies are verified and comply with government regulations for safe and secure internships.",
    badge: "Trusted Platform",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Instant Applications",
    description: "Apply to multiple internships with one click. Smart forms pre-fill your information automatically.",
    badge: "Fast Process",
    color: "saffron"
  }
];

const stats = [
  {
    icon: MapPin,
    value: "28+",
    label: "States & UTs Covered",
    description: "Presence across all Indian states"
  },
  {
    icon: BookOpen,
    value: "150+",
    label: "Industry Sectors",
    description: "From IT to Agriculture, all sectors"
  },
  {
    icon: Award,
    value: "98%",
    label: "Completion Rate",
    description: "Students complete their internships"
  },
  {
    icon: Target,
    value: "85%",
    label: "Job Conversion",
    description: "Interns get full-time offers"
  }
];

export function FeaturesSection() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary-lighter text-primary";
      case "saffron":
        return "bg-saffron-lighter text-saffron";
      case "success":
        return "bg-success-light text-success";
      case "warning":
        return "bg-warning-light text-warning";
      default:
        return "bg-primary-lighter text-primary";
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">
            Platform Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="text-gradient-hero">PM Internship Scheme</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Leveraging cutting-edge technology and government backing to create 
            India's most comprehensive internship ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-interactive p-6 group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(feature.color)}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <Badge variant="secondary" className="mb-3">
                {feature.badge}
              </Badge>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 via-saffron/5 to-primary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Platform Impact
            </h3>
            <p className="text-muted-foreground">
              Real numbers that showcase our commitment to India's youth development
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}