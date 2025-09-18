import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  Clock,
  Eye,
  BookmarkPlus,
  Send,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Bell,
  Target,
  Sparkles
} from "lucide-react";

// Mock data for demonstration
const mockData = {
  user: {
    name: "Rahul Sharma",
    profileCompletion: 85,
    applications: {
      total: 12,
      pending: 8,
      shortlisted: 2,
      selected: 1,
      rejected: 1
    }
  },
  recommendations: [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp India",
      location: "Bangalore, Karnataka",
      stipend: "₹25,000/month",
      duration: "6 months",
      matchScore: 95,
      posted: "2 days ago",
      applicants: 45,
      type: "Remote",
      tags: ["React", "JavaScript", "Node.js"]
    },
    {
      id: 2,
      title: "Data Analytics Intern",
      company: "DataLabs Solutions",
      location: "Mumbai, Maharashtra",
      stipend: "₹20,000/month",
      duration: "4 months",
      matchScore: 88,
      posted: "1 day ago",
      applicants: 32,
      type: "Hybrid",
      tags: ["Python", "SQL", "Machine Learning"]
    },
    {
      id: 3,
      title: "Digital Marketing Intern",
      company: "GrowthHub",
      location: "Delhi, NCR",
      stipend: "₹18,000/month",
      duration: "3 months",
      matchScore: 82,
      posted: "3 days ago",
      applicants: 28,
      type: "On-site",
      tags: ["SEO", "Social Media", "Content Marketing"]
    }
  ],
  recentActivity: [
    {
      type: "application",
      message: "Your application for Frontend Developer at StartupXYZ has been shortlisted",
      time: "2 hours ago",
      status: "success"
    },
    {
      type: "new_match",
      message: "5 new internships match your profile",
      time: "4 hours ago",
      status: "info"
    },
    {
      type: "interview",
      message: "Interview scheduled for Data Analyst position on March 15",
      time: "1 day ago",
      status: "warning"
    }
  ]
};

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "ai-score-high";
    if (score >= 70) return "ai-score-medium";
    return "ai-score-low";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "info":
        return <Bell className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="student" 
        userName={mockData.user.name}
        notifications={3}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {mockData.user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to find your next opportunity? We've curated some perfect matches for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Completion */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span>Profile Completion</span>
                    </CardTitle>
                    <CardDescription>
                      Complete your profile to get better job matches
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg font-bold">
                    {mockData.user.profileCompletion}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={mockData.user.profileCompletion} className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    Add Skills
                  </Button>
                  <Button size="sm" variant="outline">
                    Upload Resume
                  </Button>
                  <Button size="sm" variant="outline">
                    Add Projects
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span>Find Internships</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search for internships, companies, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="hero">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-saffron" />
                  <span>AI-Powered Recommendations</span>
                </h2>
                <Button variant="outline" size="sm">
                  Refresh
                </Button>
              </div>

              {mockData.recommendations.map((job) => (
                <Card key={job.id} className="card-interactive">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <Badge className={getMatchScoreColor(job.matchScore)}>
                            {job.matchScore}% Match
                          </Badge>
                          <Badge variant="outline">
                            {job.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.stipend}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Posted {job.posted}</span>
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" variant="hero">
                          <Send className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Sparkles className="h-3 w-3 mr-1 text-saffron" />
                        <span>Why this matches: Strong skills alignment in {job.tags[0]} and {job.tags[1]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Status Overview */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Application Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{mockData.user.applications.total}</div>
                    <div className="text-xs text-muted-foreground">Total Applied</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{mockData.user.applications.pending}</div>
                    <div className="text-xs text-muted-foreground">Under Review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{mockData.user.applications.shortlisted}</div>
                    <div className="text-xs text-muted-foreground">Shortlisted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{mockData.user.applications.selected}</div>
                    <div className="text-xs text-muted-foreground">Selected</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  View All Applications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span>Your Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <Badge variant="outline">23 this week</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Rate</span>
                  <Badge className="ai-score-high">75%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Skill Score</span>
                  <Badge className="ai-score-medium">8.5/10</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Companies
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Award className="h-4 w-4 mr-2" />
                  Take Skill Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}