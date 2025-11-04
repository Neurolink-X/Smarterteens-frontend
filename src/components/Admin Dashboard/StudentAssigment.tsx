import {
  Card,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Avatar,
  AvatarFallback,
} from "./ui-primitives";

import { useState, type SetStateAction } from "react";
import { Search, UserPlus, Mail, BookOpen } from "lucide-react";

export function StudentAssignment() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      courses: ["Web Design Fundamentals", "Introduction to Python"],
      status: "Active",
      joinDate: "2024-09-15"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      courses: ["Advanced JavaScript"],
      status: "Active",
      joinDate: "2024-09-20"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      courses: ["Web Design Fundamentals", "Advanced JavaScript", "Introduction to Python"],
      status: "Active",
      joinDate: "2024-08-30"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.w@email.com",
      courses: ["Introduction to Python"],
      status: "Inactive",
      joinDate: "2024-07-10"
    }
  ]);

  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    "Web Design Fundamentals",
    "Advanced JavaScript", 
    "Introduction to Python",
    "React Development",
    "Node.js Backend",
    "Database Design"
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentSelect = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleAssignCourse = () => {
    if (selectedCourse && selectedStudents.length > 0) {
      setStudents(students.map(student => {
        if (selectedStudents.includes(student.id) && !student.courses.includes(selectedCourse)) {
          return {
            ...student,
            courses: [...student.courses, selectedCourse]
          };
        }
        return student;
      }));
      setSelectedStudents([]);
      setSelectedCourse("");
      setIsAssignDialogOpen(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Student Assignment</h1>
          <p className="text-muted-foreground">Manage student enrollments and course assignments.</p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={selectedStudents.length === 0}>
              <UserPlus className="h-4 w-4 mr-2" />
              Assign to Course ({selectedStudents.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Students to Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Selected Students ({selectedStudents.length})</Label>
                <div className="text-sm text-muted-foreground">
                  {selectedStudents.map(id => {
                    const student = students.find(s => s.id === id);
                    return student?.name;
                  }).join(", ")}
                </div>
              </div>
              <div>
                <Label htmlFor="course">Select Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAssignCourse} className="w-full">
                Assign to Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students by name or email..."
          value={searchTerm}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-6">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedStudents.includes(student.id)}
                onCheckedChange={(checked: boolean) => handleStudentSelect(student.id, checked as boolean)}
              />
              
              <Avatar>
                <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3>{student.name}</h3>
                  <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                    {student.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Mail className="h-3 w-3" />
                  {student.email}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    Courses:
                  </div>
                  {student.courses.map((course) => (
                    <Badge key={course} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                  {student.courses.length === 0 && (
                    <span className="text-sm text-muted-foreground">No courses assigned</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Joined: {new Date(student.joinDate).toLocaleDateString()}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
}