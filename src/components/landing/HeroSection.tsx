import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  Award, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-primary-lighter/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5" />
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-up">
            {/* Government Badge */}
            <div className="flex items-center space-x-3">
              <Badge className="gov-badge">
                <Award className="h-4 w-4" />
                Government of India Initiative
              </Badge>
              <Badge variant="outline" className="border-saffron text-saffron">
                Digital India
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-gradient-hero">Bridging Dreams</span>
                <br />
                <span className="text-foreground">with Opportunities</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                India's premier AI-powered internship platform connecting talented students 
                with leading companies nationwide. Build your career, grow your business.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register?role=student">
                <Button size="xl" variant="hero" className="w-full sm:w-auto">
                  <Users className="h-5 w-5" />
                  Student Registration
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth/register?role=company">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  <Building2 className="h-5 w-5" />
                  Company Registration
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Live Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-saffron" />
                <span className="text-sm text-muted-foreground">AI-Powered Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Pan-India</span>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics Cards */}
          <div className="space-y-6 animate-scale-in">
            <div className="grid grid-cols-2 gap-4">
              {/* Students Registered */}
              <Card className="card-stats text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-lighter rounded-full mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={125000} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Students Registered</p>
              </Card>

              {/* Companies Participating */}
              <Card className="card-stats text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-saffron-lighter rounded-full mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-saffron" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={8500} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Companies</p>
              </Card>

              {/* Successful Placements */}
              <Card className="card-stats text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-success-light rounded-full mx-auto mb-3">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={45000} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Successful Placements</p>
              </Card>

              {/* Success Rate */}
              <Card className="card-stats text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-warning-light rounded-full mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={87} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </Card>
            </div>

            {/* Featured Achievement */}
            <Card className="card-elevated p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    🏆 National Recognition
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Awarded "Best Digital Initiative" by the Ministry of Skill Development 
                    & Entrepreneurship for bridging the skills gap across India.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-saffron/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
    </section>
  );
}