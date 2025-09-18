import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
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
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobDetailsDialog, setShowJobDetailsDialog] = useState(false);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [showApplicationsDialog, setShowApplicationsDialog] = useState(false);
  const [showNotificationsDialog, setShowNotificationsDialog] = useState(false);
  const [showCompaniesDialog, setShowCompaniesDialog] = useState(false);
  const [showAssessmentDialog, setShowAssessmentDialog] = useState(false);
  const navigate = useNavigate();

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

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setShowJobDetailsDialog(true);
  };

  const handleApplyJob = (job: any) => {
    setSelectedJob(job);
    setShowApplicationDialog(true);
  };

  const handleBookmarkJob = (job: any) => {
    toast({
      title: "Job Bookmarked",
      description: `${job.title} has been saved to your bookmarks.`,
    });
  };

  const handleSearchJobs = () => {
    if (searchTerm.trim()) {
      toast({
        title: "Searching Jobs",
        description: `Searching for "${searchTerm}"...`,
      });
      // Implement search logic here
    } else {
      toast({
        title: "Enter Search Term",
        description: "Please enter a search term to find relevant internships.",
        variant: "destructive",
      });
    }
  };

  const handleShowFilters = () => {
    setShowFilterDialog(true);
  };

  const handleAddSkills = () => {
    setShowProfileDialog(true);
  };

  const handleUploadResume = () => {
    toast({
      title: "Upload Resume",
      description: "Opening file upload dialog...",
    });
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.click();
  };

  const handleAddProjects = () => {
    setShowAddProjectDialog(true);
  };

  const handleViewAllApplications = () => {
    setShowApplicationsDialog(true);
  };

  const handleViewAllNotifications = () => {
    setShowNotificationsDialog(true);
  };

  const handleBrowseCompanies = () => {
    setShowCompaniesDialog(true);
  };

  const handleTakeAssessment = () => {
    setShowAssessmentDialog(true);
  };

  const handleDownloadResume = () => {
    toast({
      title: "Downloading Resume",
      description: "Your resume is being downloaded...",
    });
  };

  const handleRefreshRecommendations = () => {
    toast({
      title: "Refreshing Recommendations",
      description: "Getting fresh AI-powered job matches for you...",
    });
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
                  <Button size="sm" variant="outline" onClick={handleAddSkills}>
                    Add Skills
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleUploadResume}>
                    Upload Resume
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleAddProjects}>
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
                  <Button variant="outline" onClick={handleShowFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="hero" onClick={handleSearchJobs}>
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
                <Button variant="outline" size="sm" onClick={handleRefreshRecommendations}>
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
                        <Button size="sm" variant="hero" onClick={() => handleApplyJob(job)}>
                          <Send className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" onClick={() => handleBookmarkJob(job)}>
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleViewJob(job)}>
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
                <Button variant="outline" className="w-full" size="sm" onClick={handleViewAllApplications}>
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
                <Button variant="outline" className="w-full" size="sm" onClick={handleViewAllNotifications}>
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
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleBrowseCompanies}>
                  <Users className="h-4 w-4 mr-2" />
                  Browse Companies
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleTakeAssessment}>
                  <Award className="h-4 w-4 mr-2" />
                  Take Skill Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleDownloadResume}>
                  <FileText className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {/* Job Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this internship at {selectedJob?.company}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Letter</label>
              <textarea 
                className="w-full min-h-[120px] p-3 border border-input rounded-md resize-none"
                placeholder="Write a compelling cover letter explaining why you're perfect for this role..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Resume</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Current Resume
                </Button>
                <Button variant="outline" size="sm">
                  Upload New
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Information</label>
              <textarea 
                className="w-full min-h-[80px] p-3 border border-input rounded-md resize-none"
                placeholder="Any additional information or portfolio links..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplicationDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={() => {
                toast({
                  title: "Application Submitted!",
                  description: `Your application for ${selectedJob?.title} has been successfully submitted.`,
                });
                setShowApplicationDialog(false);
              }}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={showJobDetailsDialog} onOpenChange={setShowJobDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Detailed information about this internship opportunity
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-sm">{selectedJob.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-sm">{selectedJob.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stipend</label>
                  <p className="text-sm">{selectedJob.stipend}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p className="text-sm">{selectedJob.duration}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Match Score</label>
                <Badge className={getMatchScoreColor(selectedJob.matchScore)}>
                  {selectedJob.matchScore}% Match
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Required Skills</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedJob.tags?.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Competition</label>
                <p className="text-sm">{selectedJob.applicants} students have applied</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="hero" onClick={() => handleApplyJob(selectedJob)}>
              Apply Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Jobs</DialogTitle>
            <DialogDescription>
              Apply filters to find the perfect internships for you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="e.g., Bangalore, Mumbai, Remote" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Type</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Remote</Button>
                <Button variant="outline" size="sm">Hybrid</Button>
                <Button variant="outline" size="sm">On-site</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stipend Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Min amount" />
                <Input placeholder="Max amount" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <Input placeholder="e.g., React, Python, Design" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={() => {
                toast({
                  title: "Filters Applied",
                  description: "Your job recommendations have been updated based on your preferences.",
                });
                setShowFilterDialog(false);
              }}
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Update Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Add skills to improve your job matching score.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <Input placeholder="e.g., React, JavaScript, Python (comma separated)" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Beginner</Button>
                <Button variant="outline" size="sm">Intermediate</Button>
                <Button variant="outline" size="sm">Advanced</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={() => {
                toast({
                  title: "Profile Updated!",
                  description: "Your skills have been updated. This will improve your job matching score.",
                });
                setShowProfileDialog(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a project to showcase your skills and experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title *</label>
              <Input placeholder="e.g., E-commerce Website" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <textarea 
                className="w-full min-h-[120px] p-3 border border-input rounded-md resize-none"
                placeholder="Describe what the project does, your role, and key achievements..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date *</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies Used *</label>
              <Input placeholder="e.g., React, Node.js, MongoDB" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Live Link</label>
                <Input placeholder="https://your-project.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub Link</label>
                <Input placeholder="https://github.com/username/project" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Image</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <span className="text-xs text-muted-foreground">JPG, PNG up to 5MB</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProjectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={() => {
                toast({
                  title: "Project Added Successfully!",
                  description: "Your project has been added to your profile.",
                });
                setShowAddProjectDialog(false);
              }}
            >
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Applications Dialog */}
      <Dialog open={showApplicationsDialog} onOpenChange={setShowApplicationsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Applications</DialogTitle>
            <DialogDescription>
              Track the status of all your internship applications.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {mockData.user.applications && (
              <div className="grid gap-4">
                <Card className="card-interactive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Frontend Developer</h4>
                        <p className="text-sm text-muted-foreground">StartupXYZ • Applied 3 days ago</p>
                      </div>
                      <Badge className="ai-score-high">Shortlisted</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-interactive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Analyst</h4>
                        <p className="text-sm text-muted-foreground">TechCorp • Applied 1 week ago</p>
                      </div>
                      <Badge className="ai-score-medium">Under Review</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-interactive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">UI/UX Intern</h4>
                        <p className="text-sm text-muted-foreground">DesignHub • Applied 2 weeks ago</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplicationsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotificationsDialog} onOpenChange={setShowNotificationsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Notifications</DialogTitle>
            <DialogDescription>
              Stay updated with your latest activities and opportunities.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {mockData.recentActivity.map((activity, index) => (
              <Card key={index} className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Companies Dialog */}
      <Dialog open={showCompaniesDialog} onOpenChange={setShowCompaniesDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Browse Companies</DialogTitle>
            <DialogDescription>
              Discover companies offering internship opportunities.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">TechCorp India</h4>
                      <p className="text-sm text-muted-foreground">8 open positions</p>
                      <p className="text-xs text-muted-foreground">Bangalore, Mumbai</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">DataLabs Solutions</h4>
                      <p className="text-sm text-muted-foreground">5 open positions</p>
                      <p className="text-xs text-muted-foreground">Delhi, Hyderabad</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompaniesDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assessment Dialog */}
      <Dialog open={showAssessmentDialog} onOpenChange={setShowAssessmentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Skill Assessment</DialogTitle>
            <DialogDescription>
              Take a skill assessment to improve your profile score and get better job matches.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <Card className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">JavaScript Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">30 questions • 45 minutes</p>
                    </div>
                    <Button variant="outline" size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">React Development</h4>
                      <p className="text-sm text-muted-foreground">25 questions • 40 minutes</p>
                    </div>
                    <Button variant="outline" size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Structures & Algorithms</h4>
                      <p className="text-sm text-muted-foreground">20 questions • 60 minutes</p>
                    </div>
                    <Button variant="outline" size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssessmentDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}