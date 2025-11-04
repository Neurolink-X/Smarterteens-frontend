import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Textarea, Avatar, AvatarFallback, AvatarImage } from "./ui-primitives";
import { CheckCircle, XCircle, Clock, Eye, GraduationCap, Star, MessageSquare, FileText, User, Mail, Calendar, MapPin, Award } from "lucide-react";

export function MentorApproval() {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  const pendingMentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah.chen@email.com",
      expertise: "Machine Learning & AI",
      experience: "8 years",
      education: "PhD Computer Science - Stanford",
      location: "San Francisco, CA",
      appliedDate: "2024-10-05",
      status: "pending",
      rating: 4.9,
      languages: ["English", "Mandarin"],
      specializations: ["Deep Learning", "Neural Networks", "Computer Vision"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Experienced AI researcher with expertise in machine learning algorithms and deep neural networks. Previously worked at Google AI and published 15+ research papers.",
      portfolio: "https://sarahchen.dev",
      linkedIn: "https://linkedin.com/in/sarahchen"
    },
    {
      id: 2,
      name: "Michael Johnson",
      email: "m.johnson@email.com",
      expertise: "Full Stack Development",
      experience: "6 years",
      education: "MS Software Engineering - MIT",
      location: "Boston, MA",
      appliedDate: "2024-10-06",
      status: "pending",
      rating: 4.7,
      languages: ["English", "Spanish"],
      specializations: ["React", "Node.js", "Cloud Architecture"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Senior full-stack developer with extensive experience in modern web technologies. Led development teams at several tech startups.",
      portfolio: "https://mjohnson.dev",
      linkedIn: "https://linkedin.com/in/michaeljohnson"
    },
    {
      id: 3,
      name: "Lisa Thompson",
      email: "lisa.t@email.com",
      expertise: "Digital Marketing & UX",
      experience: "5 years",
      education: "MBA Marketing - Harvard Business School",
      location: "New York, NY",
      appliedDate: "2024-10-07",
      status: "pending",
      rating: 4.8,
      languages: ["English", "French"],
      specializations: ["SEO", "Content Strategy", "User Research"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b890?w=150&h=150&fit=crop&crop=face",
      bio: "Digital marketing expert with a strong background in user experience design. Helped 50+ companies improve their online presence.",
      portfolio: "https://lisathompson.com",
      linkedIn: "https://linkedin.com/in/lisathompson"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "james.wilson@email.com",
      expertise: "Data Science & Analytics",
      experience: "10 years",
      education: "PhD Statistics - UC Berkeley",
      location: "Seattle, WA",
      appliedDate: "2024-10-08",
      status: "pending",
      rating: 4.9,
      languages: ["English"],
      specializations: ["Statistical Analysis", "Python", "R", "Machine Learning"],
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
      bio: "Data science expert with a decade of experience in statistical analysis and predictive modeling. Former senior data scientist at Microsoft.",
      portfolio: "https://jameswilson.data",
      linkedIn: "https://linkedin.com/in/jameswilson"
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      expertise: "Cybersecurity & Ethical Hacking",
      experience: "7 years",
      education: "MS Cybersecurity - Carnegie Mellon",
      location: "Austin, TX",
      appliedDate: "2024-10-09",
      status: "pending",
      rating: 4.6,
      languages: ["English", "Spanish"],
      specializations: ["Penetration Testing", "Network Security", "Incident Response"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      bio: "Cybersecurity specialist with extensive experience in ethical hacking and security auditing. Certified in multiple security frameworks.",
      portfolio: "https://emmarodriguez.security",
      linkedIn: "https://linkedin.com/in/emmarodriguez"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "interview": return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getExperienceColor = (experience: string) => {
    const years = parseInt(experience);
    if (years >= 8) return "bg-purple-100 text-purple-800 border-purple-200";
    if (years >= 5) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Mentor Approval
          </h1>
          <p className="text-slate-600">Review and approve mentor applications and manage instructor onboarding.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Applications</p>
                <p className="text-2xl font-bold text-slate-900">{pendingMentors.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">3 new this week</p>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Mentors</p>
                <p className="text-2xl font-bold text-slate-900">42</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+8 this month</p>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-slate-900">2.3</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">days</p>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Approval Rate</p>
                <p className="text-2xl font-bold text-slate-900">78%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+5% this quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Applications Table */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            Pending Mentor Applications
          </CardTitle>
          <CardDescription>
            Review mentor applications and conduct approval process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingMentors.map((mentor) => (
                  <TableRow key={mentor.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mentor.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{mentor.name}</p>
                          <p className="text-sm text-slate-500">{mentor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-700">{mentor.expertise}</p>
                        <div className="flex gap-1 mt-1">
                          {mentor.specializations.slice(0, 2).map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getExperienceColor(mentor.experience)}>
                        {mentor.experience}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {mentor.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{mentor.appliedDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(mentor.status)}>
                        Pending Review
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedMentor(mentor)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Mentor Application Review: {mentor.name}</DialogTitle>
                              <DialogDescription>
                                Comprehensive review of mentor application and qualifications
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 pt-4">
                              {/* Mentor Profile Header */}
                              <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={mentor.avatar} />
                                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
                                    {mentor.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-slate-900">{mentor.name}</h3>
                                  <p className="text-slate-600 mb-2">{mentor.expertise}</p>
                                  <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                      <Mail className="h-4 w-4" />
                                      {mentor.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {mentor.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4" />
                                      {mentor.rating}/5.0
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Professional Information */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-slate-900 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-600" />
                                    Professional Background
                                  </h4>
                                  <div className="space-y-3 text-sm">
                                    <div>
                                      <p className="text-slate-600">Education</p>
                                      <p className="font-medium">{mentor.education}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-600">Experience</p>
                                      <p className="font-medium">{mentor.experience} of professional experience</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-600">Languages</p>
                                      <div className="flex gap-1 mt-1">
                                        {mentor.languages.map((lang, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {lang}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h4 className="font-medium text-slate-900 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                    Specializations
                                  </h4>
                                  <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                      {mentor.specializations.map((spec, index) => (
                                        <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                                          {spec}
                                        </Badge>
                                      ))}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <p className="text-slate-600">Portfolio</p>
                                        <a href={mentor.portfolio} className="text-blue-600 hover:underline font-medium">
                                          {mentor.portfolio}
                                        </a>
                                      </div>
                                      <div>
                                        <p className="text-slate-600">LinkedIn</p>
                                        <a href={mentor.linkedIn} className="text-blue-600 hover:underline font-medium">
                                          View Profile
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Biography */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-slate-900 flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-green-600" />
                                  Professional Summary
                                </h4>
                                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg leading-relaxed">
                                  {mentor.bio}
                                </p>
                              </div>

                              {/* Application Details */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-slate-900 flex items-center gap-2">
                                  <Calendar className="h-5 w-5 text-orange-600" />
                                  Application Information
                                </h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <p className="text-slate-600">Application Date</p>
                                    <p className="font-medium">{mentor.appliedDate}</p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <p className="text-slate-600">Current Status</p>
                                    <Badge className={getStatusColor(mentor.status)}>
                                      Pending Review
                                    </Badge>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <p className="text-slate-600">Experience Level</p>
                                    <Badge className={getExperienceColor(mentor.experience)}>
                                      {mentor.experience}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Review Section */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-slate-900">Administrative Notes</h4>
                                <Textarea 
                                  placeholder="Add notes about this mentor application (internal use only)..."
                                  className="min-h-[80px]"
                                />
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-3 pt-4 border-t">
                                <Button className="colorful-button flex-1">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve Mentor
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Schedule Interview
                                </Button>
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}