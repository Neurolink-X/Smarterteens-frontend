import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";
import { Badge } from "../../../shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../shared/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shared/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../../shared/ui/avatar";
import { CheckCircle, XCircle, Clock, Eye, BookOpen, User, Star } from "lucide-react";

export function CourseApproval() {
  const [activeTab, setActiveTab] = useState("courses");

  const pendingCourses = [
    {
      id: 1,
      title: "Advanced Machine Learning Fundamentals",
      instructor: "Dr. Sarah Chen",
      category: "Technology",
      duration: "12 weeks",
      lessons: 24,
      price: 299,
      rating: 4.8,
      students: 156,
      status: "pending",
      submittedDate: "2024-10-01",
      description: "Comprehensive course covering ML algorithms, neural networks, and practical applications.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b890?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "Creative Writing Workshop",
      instructor: "Prof. Michael Johnson",
      category: "Arts & Literature",
      duration: "8 weeks",
      lessons: 16,
      price: 199,
      rating: 4.6,
      students: 89,
      status: "pending",
      submittedDate: "2024-10-03",
      description: "Interactive workshop focusing on storytelling techniques and creative expression.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      instructor: "Lisa Thompson",
      category: "Business",
      duration: "10 weeks",
      lessons: 20,
      price: 249,
      rating: 4.9,
      students: 203,
      status: "pending",
      submittedDate: "2024-10-05",
      description: "Complete guide to modern digital marketing strategies and tools.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const pendingMentors = [
    {
      id: 1,
      name: "Dr. James Wilson",
      expertise: "Data Science & AI",
      experience: "10+ years",
      education: "PhD Computer Science, MIT",
      rating: 4.9,
      courses: 12,
      students: 2500,
      status: "pending",
      appliedDate: "2024-10-02",
      bio: "Former Google AI researcher with extensive experience in machine learning and data analytics.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      expertise: "UX/UI Design",
      experience: "8+ years",
      education: "Masters in Design, Stanford",
      rating: 4.8,
      courses: 8,
      students: 1800,
      status: "pending",
      appliedDate: "2024-10-04",
      bio: "Lead designer at top tech companies with passion for teaching design principles.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Robert Chang",
      expertise: "Financial Planning",
      experience: "15+ years",
      education: "MBA Finance, Wharton",
      rating: 4.7,
      courses: 6,
      students: 1200,
      status: "pending",
      appliedDate: "2024-10-06",
      bio: "Certified financial planner helping students understand personal finance and investing.",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Course & Mentor Approval
          </h1>
          <p className="text-slate-600">Review and approve pending course submissions and mentor applications.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Courses</p>
                <p className="text-2xl font-bold text-slate-900">{pendingCourses.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">3 new this week</p>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Mentors</p>
                <p className="text-2xl font-bold text-slate-900">{pendingMentors.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">2 verified this week</p>
          </CardContent>
        </Card>

        <Card className="professional-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Review Time</p>
                <p className="text-2xl font-bold text-slate-900">2.4</p>
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
                <p className="text-2xl font-bold text-slate-900">94%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Courses and Mentors */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            Pending Approvals
          </CardTitle>
          <CardDescription>
            Review submissions and applications requiring approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Courses ({pendingCourses.length})
              </TabsTrigger>
              <TabsTrigger value="mentors" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Mentors ({pendingMentors.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingCourses.map((course) => (
                      <TableRow key={course.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">{course.title}</p>
                            <p className="text-sm text-slate-500">{course.duration} • {course.lessons} lessons</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={course.avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs">
                                {course.instructor.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{course.instructor}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${course.price}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(course.status)}>
                            Pending Review
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Course Review: {course.title}</DialogTitle>
                                  <DialogDescription>
                                    Review course details and make approval decision
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Instructor</p>
                                      <p className="text-sm">{course.instructor}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Category</p>
                                      <p className="text-sm">{course.category}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Duration</p>
                                      <p className="text-sm">{course.duration}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Price</p>
                                      <p className="text-sm">${course.price}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-slate-600 mb-2">Description</p>
                                    <p className="text-sm text-slate-700">{course.description}</p>
                                  </div>
                                  <div className="flex gap-3 pt-4">
                                    <Button className="colorful-button flex-1">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Course
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Course
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
            </TabsContent>

            <TabsContent value="mentors" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Rating</TableHead>
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
                              <p className="text-sm text-slate-500">{mentor.education}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{mentor.expertise}</Badge>
                        </TableCell>
                        <TableCell>{mentor.experience}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{mentor.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(mentor.status)}>
                            Pending Review
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Mentor Review: {mentor.name}</DialogTitle>
                                  <DialogDescription>
                                    Review mentor application and credentials
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Expertise</p>
                                      <p className="text-sm">{mentor.expertise}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Experience</p>
                                      <p className="text-sm">{mentor.experience}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Education</p>
                                      <p className="text-sm">{mentor.education}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-600">Current Students</p>
                                      <p className="text-sm">{mentor.students.toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-slate-600 mb-2">Bio</p>
                                    <p className="text-sm text-slate-700">{mentor.bio}</p>
                                  </div>
                                  <div className="flex gap-3 pt-4">
                                    <Button className="colorful-button flex-1">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Mentor
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Application
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}