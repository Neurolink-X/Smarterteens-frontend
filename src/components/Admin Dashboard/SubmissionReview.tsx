
import { useState } from "react";
import {
  Card,
  Button,
  Badge,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Avatar,
  AvatarFallback,
} from "./ui-primitives";

import {
  FileText,
  Clock,
  User,
  MessageSquare,
  Check,
  X,
  Eye,
} from "lucide-react";

export function SubmissionReview() {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentEmail: "sarah.j@email.com",
      projectTitle: "Personal Portfolio Website",
      course: "Web Design Fundamentals",
      submittedDate: "2024-10-28",
      status: "Pending Review",
      grade: null,
      feedback: "",
      fileUrl: "#"
    },
    {
      id: 2,
      studentName: "Mike Chen",
      studentEmail: "mike.chen@email.com",
      projectTitle: "E-commerce API",
      course: "Advanced JavaScript",
      submittedDate: "2024-10-27",
      status: "Reviewed",
      grade: "A",
      feedback: "Excellent work! The API structure is well-designed and the code is clean.",
      fileUrl: "#"
    },
    {
      id: 3,
      studentName: "Emily Rodriguez",
      studentEmail: "emily.r@email.com",
      projectTitle: "Data Analysis Project",
      course: "Introduction to Python",
      submittedDate: "2024-10-26",
      status: "Pending Review",
      grade: null,
      feedback: "",
      fileUrl: "#"
    },
    {
      id: 4,
      studentName: "David Wilson",
      studentEmail: "david.w@email.com",
      projectTitle: "React Todo App",
      course: "React Development",
      submittedDate: "2024-10-25",
      status: "Needs Revision",
      grade: "C",
      feedback: "Good start, but please add proper error handling and improve the component structure.",
      fileUrl: "#"
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    grade: "",
    feedback: "",
    status: ""
  });

  const [filterStatus, setFilterStatus] = useState("All");

  const statusOptions = ["All", "Pending Review", "Reviewed", "Needs Revision"];
  const gradeOptions = ["A", "B", "C", "D", "F"];

  const filteredSubmissions = submissions.filter(submission => 
    filterStatus === "All" || submission.status === filterStatus
  );

  const handleReviewSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setReviewData({
      grade: submission.grade || "",
      feedback: submission.feedback || "",
      status: submission.status
    });
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (selectedSubmission && reviewData.grade && reviewData.feedback) {
      setSubmissions(submissions.map(submission => 
        submission.id === selectedSubmission.id 
          ? {
              ...submission,
              grade: reviewData.grade,
              feedback: reviewData.feedback,
              status: reviewData.grade === "F" ? "Needs Revision" : "Reviewed"
            }
          : submission
      ));
      setIsReviewDialogOpen(false);
      setSelectedSubmission(null);
      setReviewData({ grade: "", feedback: "", status: "" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      case "Reviewed":
        return "bg-green-100 text-green-800";
      case "Needs Revision":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
      case "F":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const pendingCount = submissions.filter(s => s.status === "Pending Review").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Submission Review</h1>
          <p className="text-muted-foreground">
            Review and grade student project submissions. {pendingCount} submissions pending review.
          </p>
        </div>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Label>Filter by status:</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar>
                  <AvatarFallback>{getInitials(submission.studentName)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{submission.studentName}</h3>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                    {submission.grade && (
                      <Badge className={getGradeColor(submission.grade)}>
                        Grade: {submission.grade}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {submission.projectTitle}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {submission.course}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                    </div>
                  </div>

                  {submission.feedback && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        <MessageSquare className="h-3 w-3" />
                        <span className="text-sm font-medium">Feedback:</span>
                      </div>
                      <p className="text-sm">{submission.feedback}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3 mr-1" />
                  View File
                </Button>
                <Button
                  variant={submission.status === "Pending Review" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReviewSubmission(submission)}
                >
                  {submission.status === "Pending Review" ? "Review" : "Edit Review"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No submissions found for the selected filter.</p>
        </div>
      )}

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Review Submission - {selectedSubmission?.studentName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Project: {selectedSubmission?.projectTitle}
              </p>
              <p className="text-sm text-muted-foreground">
                Course: {selectedSubmission?.course}
              </p>
            </div>

            <div>
              <Label htmlFor="grade">Grade</Label>
              <Select value={reviewData.grade} onValueChange={(value: any) => setReviewData({ ...reviewData, grade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((grade) => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={reviewData.feedback}
                onChange={(e: { target: { value: any; }; }) => setReviewData({ ...reviewData, feedback: e.target.value })}
                placeholder="Provide detailed feedback on the submission..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReview} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}