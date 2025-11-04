import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui-primitives";

import {
  Plus,
  Calendar as CalendarIcon,
  FolderOpen,
  Clock,
} from "lucide-react";

import { format } from "date-fns";


export function ProjectManager() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "Create a responsive portfolio using HTML, CSS, and JavaScript",
      course: "Web Design Fundamentals",
      dueDate: "2024-11-15",
      submissions: 45,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "E-commerce API",
      description: "Build a RESTful API for an e-commerce platform using Node.js",
      course: "Advanced JavaScript",
      dueDate: "2024-11-30",
      submissions: 23,
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Data Analysis Project",
      description: "Analyze sales data using Python and create visualizations",
      course: "Introduction to Python",
      dueDate: "2024-11-20",
      submissions: 67,
      difficulty: "Intermediate"
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    course: "",
    dueDate: null,
    difficulty: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const courses = ["Web Design Fundamentals", "Advanced JavaScript", "Introduction to Python", "React Development"];

  const handleCreateProject = () => {
    if (newProject.title && newProject.description && newProject.course && date && newProject.difficulty) {
      const project = {
        id: projects.length + 1,
        ...newProject,
        dueDate: format(date, "yyyy-MM-dd"),
        submissions: 0
      };
      setProjects([...projects, project]);
      setNewProject({ title: "", description: "", course: "", dueDate: null, difficulty: "" });
      setDate(undefined);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Project Management</h1>
          <p className="text-muted-foreground">Create and assign projects to students.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Project description and requirements"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="course">Assign to Course</Label>
                <Select value={newProject.course} onValueChange={(value) => setNewProject({ ...newProject, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={newProject.difficulty} onValueChange={(value) => setNewProject({ ...newProject, difficulty: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateProject} className="w-full">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
              </div>
              <FolderOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{project.difficulty}</Badge>
                <Badge variant="secondary">{project.course}</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                Due: {format(new Date(project.dueDate), "MMM dd, yyyy")}
              </div>
              <p className="text-sm text-muted-foreground">
                {project.submissions} submissions received
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}