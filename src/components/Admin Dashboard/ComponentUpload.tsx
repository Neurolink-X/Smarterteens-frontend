import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Progress,
} from "./ui-primitives";
import { Upload, File, Video, FileText, Download, Trash2 } from "lucide-react";

export function ContentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "JavaScript Fundamentals.pdf",
      type: "PDF",
      size: "2.4 MB",
      course: "Advanced JavaScript",
      uploadDate: "2024-10-25",
      downloads: 45
    },
    {
      id: 2,
      name: "HTML CSS Tutorial Series",
      type: "Video",
      size: "156 MB",
      course: "Web Design Fundamentals",
      uploadDate: "2024-10-20",
      downloads: 89
    },
    {
      id: 3,
      name: "Python Exercises.zip",
      type: "Archive",
      size: "5.1 MB",
      course: "Introduction to Python",
      uploadDate: "2024-10-18",
      downloads: 67
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    course: "",
    type: ""
  });

  const courses = [
    "Web Design Fundamentals",
    "Advanced JavaScript", 
    "Introduction to Python",
    "React Development",
    "Node.js Backend",
    "Database Design"
  ];

  const contentTypes = ["PDF", "Video", "Archive", "Presentation", "Document"];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && newContent.course && newContent.type) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Add the uploaded file to the list
            const newFile = {
              id: uploadedFiles.length + 1,
              name: newContent.title || file.name,
              type: newContent.type,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              course: newContent.course,
              uploadDate: new Date().toISOString().split('T')[0],
              downloads: 0
            };
            setUploadedFiles([newFile, ...uploadedFiles]);
            setNewContent({ title: "", description: "", course: "", type: "" });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-5 w-5" />;
      case "PDF":
      case "Document":
        return <FileText className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const handleDelete = (id: number) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Content Upload</h1>
        <p className="text-muted-foreground">Upload and manage educational content for your courses.</p>
      </div>

      {/* Upload Form */}
      <Card className="p-6">
        <h3 className="mb-4">Upload New Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="title">Content Title</Label>
            <Input
              id="title"
              value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
              placeholder="Enter content title"
            />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Select value={newContent.course} onValueChange={(value) => setNewContent({ ...newContent, course: value })}>
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
            <Label htmlFor="type">Content Type</Label>
            <Select value={newContent.type} onValueChange={(value) => setNewContent({ ...newContent, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="file">Upload File</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading || !newContent.course || !newContent.type}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={newContent.description}
            onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
            placeholder="Brief description of the content"
            rows={2}
          />
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Uploading...</span>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}
      </Card>

      {/* Uploaded Content */}
      <Card className="p-6">
        <h3 className="mb-4">Uploaded Content</h3>
        <div className="space-y-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-accent rounded-lg">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h4 className="font-medium">{file.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{file.type}</Badge>
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.course}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uploaded: {new Date(file.uploadDate).toLocaleDateString()} • {file.downloads} downloads
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(file.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {uploadedFiles.length === 0 && (
          <div className="text-center py-8">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No content uploaded yet.</p>
          </div>
        )}
      </Card>
    </div>
  );
}