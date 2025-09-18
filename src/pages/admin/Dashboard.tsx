import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users,
  Building2,
  Award,
  TrendingUp,
  MapPin,
  BarChart3,
  FileText,
  Bell,
  Shield,
  Target,
  Sparkles,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  DollarSign,
  Globe,
  Calendar,
  UserCheck,
  Briefcase,
  GraduationCap,
  Factory,
  PieChart,
  Download,
  Filter,
  Search,
  Eye,
  Settings
} from "lucide-react";

// Mock data for demonstration
const mockData = {
  overview: {
    totalStudents: 125000,
    totalCompanies: 8500,
    activeInternships: 15000,
    successfulPlacements: 45000,
    applicationSuccessRate: 87,
    diversityQuota: 78,
    ruralParticipation: 45,
    femaleParticipation: 52
  },
  regionalStats: [
    { state: "Maharashtra", students: 18500, companies: 1200, placements: 8900 },
    { state: "Karnataka", students: 16200, companies: 1100, placements: 7800 },
    { state: "Tamil Nadu", students: 14800, companies: 950, placements: 6900 },
    { state: "Delhi", students: 12500, companies: 800, placements: 5800 },
    { state: "Gujarat", students: 11200, companies: 750, placements: 5200 }
  ],
  sectorWise: [
    { sector: "Information Technology", internships: 4500, percentage: 30 },
    { sector: "Manufacturing", internships: 2250, percentage: 15 },
    { sector: "Financial Services", internships: 1800, percentage: 12 },
    { sector: "Healthcare", internships: 1500, percentage: 10 },
    { sector: "Education", internships: 1350, percentage: 9 },
    { sector: "Others", internships: 3600, percentage: 24 }
  ],
  recentAlerts: [
    {
      type: "compliance",
      message: "25 companies require diversity compliance review",
      time: "2 hours ago",
      status: "warning",
      urgent: true
    },
    {
      type: "verification",
      message: "150 new student profiles pending verification",
      time: "4 hours ago",
      status: "info",
      urgent: false
    },
    {
      type: "report",
      message: "Monthly report generation completed",
      time: "6 hours ago",
      status: "success",
      urgent: false
    },
    {
      type: "system",
      message: "High traffic detected - system performing optimally",
      time: "8 hours ago",
      status: "info",
      urgent: false
    }
  ],
  pendingActions: [
    {
      action: "Company Verification",
      count: 45,
      priority: "high",
      description: "New company registrations awaiting approval"
    },
    {
      action: "Content Moderation",
      count: 23,
      priority: "medium",
      description: "Internship postings flagged for review"
    },
    {
      action: "Compliance Check",
      count: 18,
      priority: "high",
      description: "Diversity quota monitoring required"
    },
    {
      action: "Support Tickets",
      count: 67,
      priority: "medium",
      description: "User queries and technical issues"
    }
  ]
};

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive-light text-destructive border-destructive/20";
      case "medium":
        return "bg-warning-light text-warning border-warning/20";
      case "low":
        return "bg-success-light text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="admin" 
        userName="Admin Portal"
        notifications={8}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              PM Internship Scheme Dashboard 🇮🇳
            </h1>
            <p className="text-muted-foreground">
              Government monitoring and administration portal - Ministry of Skill Development & Entrepreneurship
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button variant="hero">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.overview.totalStudents.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary-lighter rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this month
              </div>
            </CardContent>
          </Card>

          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Registered Companies</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.overview.totalCompanies.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-saffron-lighter rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-saffron" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% this month
              </div>
            </CardContent>
          </Card>

          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Internships</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.overview.activeInternships.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-success" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% this month
              </div>
            </CardContent>
          </Card>

          <Card className="card-stats">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Successful Placements</p>
                  <p className="text-2xl font-bold text-foreground">{mockData.overview.successfulPlacements.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-warning" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-success">
                <Award className="h-3 w-3 mr-1" />
                {mockData.overview.applicationSuccessRate}% success rate
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Diversity & Compliance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Diversity Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Diversity Quota</span>
                    <span className="text-sm font-medium">{mockData.overview.diversityQuota}%</span>
                  </div>
                  <Progress value={mockData.overview.diversityQuota} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Rural Participation</span>
                    <span className="text-sm font-medium">{mockData.overview.ruralParticipation}%</span>
                  </div>
                  <Progress value={mockData.overview.ruralParticipation} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Female Participation</span>
                    <span className="text-sm font-medium">{mockData.overview.femaleParticipation}%</span>
                  </div>
                  <Progress value={mockData.overview.femaleParticipation} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span>Pending Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.pendingActions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.count}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.recentAlerts.slice(0, 4).map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {getStatusIcon(alert.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-foreground">{alert.message}</p>
                        {alert.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regional">Regional Data</TabsTrigger>
            <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Platform Growth Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Student Registrations</span>
                      <span className="text-sm font-medium">+12,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Company Onboarding</span>
                      <span className="text-sm font-medium">+650</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Internship Postings</span>
                      <span className="text-sm font-medium">+2,100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Successful Placements</span>
                      <span className="text-sm font-medium">+3,800</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-saffron" />
                    <span>Success Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Application Success Rate</span>
                        <span className="text-sm font-medium">{mockData.overview.applicationSuccessRate}%</span>
                      </div>
                      <Progress value={mockData.overview.applicationSuccessRate} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Internship Completion Rate</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <Progress value={94} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Full-time Conversion</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>State-wise Performance</span>
                </CardTitle>
                <CardDescription>
                  Regional distribution of students, companies, and successful placements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.regionalStats.map((state, index) => (
                    <Card key={index} className="card-interactive p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{state.state}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{state.students.toLocaleString()} students</span>
                            <span>{state.companies.toLocaleString()} companies</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-success">{state.placements.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Placements</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Factory className="h-5 w-5 text-primary" />
                  <span>Industry Sector Distribution</span>
                </CardTitle>
                <CardDescription>
                  Breakdown of internships by industry sectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.sectorWise.map((sector, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-foreground">{sector.sector}</span>
                        <span className="text-sm text-muted-foreground">
                          {sector.internships.toLocaleString()} ({sector.percentage}%)
                        </span>
                      </div>
                      <Progress value={sector.percentage} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Compliance Monitoring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Companies Under Review</span>
                      <Badge className="bg-warning-light text-warning">25</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Verified Companies</span>
                      <Badge className="bg-success-light text-success">8,475</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Policy Violations</span>
                      <Badge className="bg-destructive-light text-destructive">3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Audit Reports Pending</span>
                      <Badge className="bg-warning-light text-warning">12</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="h-5 w-5 text-success" />
                    <span>Verification Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Student Profiles Verified</span>
                      <Badge className="bg-success-light text-success">98.5%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pending Verification</span>
                      <Badge className="bg-warning-light text-warning">150</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Document Issues</span>
                      <Badge className="bg-destructive-light text-destructive">8</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Auto-verified</span>
                      <Badge className="bg-primary-lighter text-primary">89.2%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}