import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Award,
  Building2,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Bell,
  Target,
  Sparkles,
  BarChart3,
  UserCheck,
  MessageSquare
} from "lucide-react";

// Mock data for demonstration
const mockData = {
  company: {
    name: "TechCorp India",
    activeInternships: 8,
    totalApplications: 456,
    selectedCandidates: 23,
    averageMatchScore: 82
  },
  internships: [
    {
      id: 1,
      title: "Software Development Intern",
      department: "Engineering",
      location: "Bangalore, Karnataka",
      stipend: "₹25,000/month",
      duration: "6 months",
      applications: 145,
      shortlisted: 12,
      selected: 2,
      status: "Active",
      posted: "5 days ago",
      deadline: "March 25, 2024",
      type: "Remote",
      requiredSkills: ["React", "JavaScript", "Node.js"]
    },
    {
      id: 2,
      title: "Data Analytics Intern",
      department: "Data Science",
      location: "Mumbai, Maharashtra",
      stipend: "₹22,000/month",
      duration: "4 months",
      applications: 89,
      shortlisted: 8,
      selected: 1,
      status: "Active",
      posted: "3 days ago",
      deadline: "March 30, 2024",
      type: "Hybrid",
      requiredSkills: ["Python", "SQL", "Machine Learning"]
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      department: "Design",
      location: "Delhi, NCR",
      stipend: "₹20,000/month",
      duration: "3 months",
      applications: 67,
      shortlisted: 6,
      selected: 0,
      status: "Draft",
      posted: "1 day ago",
      deadline: "April 5, 2024",
      type: "On-site",
      requiredSkills: ["Figma", "Adobe XD", "Prototyping"]
    }
  ],
  topCandidates: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Development Intern",
      score: 96,
      education: "B.Tech CSE, IIT Delhi",
      location: "Delhi, NCR",
      skills: ["React", "Node.js", "MongoDB"],
      status: "Shortlisted",
      avatar: "👩‍💻"
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Data Analytics Intern",
      score: 94,
      education: "B.Sc Statistics, University of Mumbai",
      location: "Mumbai, Maharashtra",
      skills: ["Python", "R", "Tableau"],
      status: "Under Review",
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Kavya Reddy",
      role: "UI/UX Design Intern",
      score: 91,
      education: "B.Des, NID Ahmedabad",
      location: "Hyderabad, Telangana",
      skills: ["Figma", "User Research", "Prototyping"],
      status: "New Application",
      avatar: "👩‍🎨"
    }
  ],
  recentActivity: [
    {
      type: "application",
      message: "15 new applications received for Software Development Intern",
      time: "2 hours ago",
      status: "info"
    },
    {
      type: "interview",
      message: "Interview completed for Data Analytics position - 5 candidates",
      time: "4 hours ago",
      status: "success"
    },
    {
      type: "deadline",
      message: "Application deadline for UI/UX intern position in 3 days",
      time: "1 day ago",
      status: "warning"
    }
  ]
};

export default function CompanyDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success-light text-success";
      case "Draft":
        return "bg-warning-light text-warning";
      case "Closed":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "ai-score-high";
    if (score >= 80) return "ai-score-medium";
    return "ai-score-low";
  };

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-primary-lighter text-primary border-primary/20";
      case "Under Review":
        return "bg-warning-light text-warning border-warning/20";
      case "New Application":
        return "bg-success-light text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
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
        userRole="company" 
        userName={mockData.company.name}
        notifications={5}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {mockData.company.name}! 🏢
            </h1>
            <p className="text-muted-foreground">
              Manage your internship programs and discover top talent from across India.
            </p>
          </div>
          <Button variant="hero" size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Post New Internship
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Internships</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.company.activeInternships}</p>
                </div>
                <div className="w-12 h-12 bg-primary-lighter rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 this month
              </div>
            </CardContent>
          </Card>

          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.company.totalApplications}</p>
                </div>
                <div className="w-12 h-12 bg-saffron-lighter rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-saffron" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Candidates</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.company.selectedCandidates}</p>
                </div>
                <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-success" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <Award className="h-3 w-3 mr-1" />
                85% conversion rate
              </div>
            </CardContent>
          </Card>

          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Match Score</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.company.averageMatchScore}%</p>
                </div>
                <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-warning" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <Target className="h-3 w-3 mr-1" />
                High quality matches
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Internship Management */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Your Internships</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.internships.map((internship) => (
                    <Card key={internship.id} className="card-interactive">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{internship.title}</h3>
                              <Badge className={getStatusColor(internship.status)}>
                                {internship.status}
                              </Badge>
                              <Badge variant="outline">
                                {internship.type}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <Building2 className="h-4 w-4" />
                                <span>{internship.department}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{internship.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{internship.stipend}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{internship.duration}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {internship.requiredSkills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-lg font-bold text-foreground">{internship.applications}</div>
                                <div className="text-xs text-muted-foreground">Applications</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-primary">{internship.shortlisted}</div>
                                <div className="text-xs text-muted-foreground">Shortlisted</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-success">{internship.selected}</div>
                                <div className="text-xs text-muted-foreground">Selected</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="border-t border-border pt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Posted {internship.posted}</span>
                          <span>Deadline: {internship.deadline}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top AI-Matched Candidates */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-saffron" />
                  <span>Top AI Matches</span>
                </CardTitle>
                <CardDescription>
                  AI-curated candidates for your open positions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.topCandidates.map((candidate) => (
                  <Card key={candidate.id} className="card-interactive p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{candidate.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{candidate.name}</h4>
                          <Badge className={getMatchScoreColor(candidate.score)}>
                            {candidate.score}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{candidate.role}</p>
                        <p className="text-xs text-muted-foreground mb-2">{candidate.education}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {candidate.skills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Badge className={getCandidateStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  View All Candidates
                </Button>
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
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="hero" className="w-full justify-start" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Internship
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Talent Pool
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Candidate Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}