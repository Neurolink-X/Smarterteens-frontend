import { useState } from "react";
import {
  Button,
  Badge,
  Card,
  Input,
  Textarea,
  Label,
  Progress,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  SelectValue,
} from "./ui-primitives";

import { Plus, Edit, Trash2, Clock, Users } from "lucide-react";


export function CourseManager() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Python",
      description: "Learn the basics of Python programming",
      level: "Beginner",
      duration: "8 weeks",
      students: 156,
      status: "Active"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and frameworks",
      level: "Advanced",
      duration: "12 weeks",
      students: 89,
      status: "Active"
    },
    {
      id: 3,
      title: "Web Design Fundamentals",
      description: "Learn HTML, CSS, and design principles",
      level: "Beginner",
      duration: "6 weeks",
      students: 203,
      status: "Active"
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    level: "",
    duration: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.level && newCourse.duration) {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        students: 0,
        status: "Draft"
      };
      setCourses([...courses, course]);
      setNewCourse({ title: "", description: "", level: "", duration: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Course Management</h1>
          <p className="text-muted-foreground">Create and manage educational courses.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e: { target: { value: any; }; }) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e: { target: { value: any; }; }) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Course description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={newCourse.level} onValueChange={(value: any) => setNewCourse({ ...newCourse, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e: { target: { value: any; }; }) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  placeholder="e.g., 8 weeks"
                />
              </div>
              <Button onClick={handleCreateCourse} className="w-full">
                Create Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
              </div>
              <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>
                {course.status}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{course.level}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-3 w-3" />
                {course.students} students enrolled
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}