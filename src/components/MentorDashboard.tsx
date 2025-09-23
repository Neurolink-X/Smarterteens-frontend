import React, { useState, useRef, useEffect } from "react";
import { motion , AnimatePresence} from "framer-motion";

import {
  Home,
  Users,
  Upload,
  FileText,
  Bell,
  Search,
  BookOpen,
  PieChart as PieIcon,
  UserCircle,
  CheckCircle,
  Clock,
  Star,
  AlertCircle,
  TrendingUp,
  Download
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";
// Notification type and initial notifications
type Notification = {
  id: number;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  { id: 1, title: "New submission", body: "Harry submitted Data Science Project", time: "2h", unread: true },
  { id: 2, title: "Course comment", body: "New comment on 'Let's React!'", time: "4h", unread: true },
  { id: 3, title: "Server", body: "Backup completed successfully", time: "1d", unread: false },
  { id: 4, title: "Reminder", body: "Grade pending assignments", time: "2d", unread: false },
];

// Submission type and submissions array
type Submission = {
  id: number;
  name: string;
  subject: string;
  assignment: string;
  status: string;
  due: string;
  submittedAgo: string;
  avatar: string;
};

const submissions: Submission[] = [
  {
    id: 1,
    name: "Severus Snape",
    subject: "Python",
    assignment: "ML Problems Set #4",
    status: "Pending Review",
    due: "Today, 11:59 PM",
    submittedAgo: "2 hours ago",
    avatar: "https://i.pravatar.cc/48?img=30",
  },
  {
    id: 2,
    name: "Hermione Granger",
    subject: "Gen AI",
    assignment: "Gen AI Assignment",
    status: "Pending Review",
    due: "Tomorrow, 5:00 PM",
    submittedAgo: "1 hour ago",
    avatar: "https://i.pravatar.cc/48?img=32",
  },
  {
    id: 3,
    name: "Harry Potter",
    subject: "Data Science",
    assignment: "Data Science Project",
    status: "Pending Review",
    due: "Sep 20, 10:00 AM",
    submittedAgo: "30 mins ago",
    avatar: "https://i.pravatar.cc/48?img=35",
  },
  {
    id: 4,
    name: "Luna Lovegood",
    subject: "Data Science",
    assignment: "Data Science Project",
    status: "Pending Review",
    due: "Sep 20, 10:00 AM",
    submittedAgo: "30 mins ago",
    avatar: "https://i.pravatar.cc/48?img=36",
    },
  ];
const students = [
  {
    id: 1,
    name: "Ron Weasley",
    email: "anotherWeasley@gmail.com",
    progress: 82,
    assignments: "10/15",
    subjects: ["Python", "AI"],
    lastActive: "2 hours ago",
    avatar: "https://i.pravatar.cc/48?img=20",
  },
  {
    id: 2,
    name: "Hermione Granger",
    email: "hermione@hogwarts.edu",
    progress: 95,
    assignments: "14/15",
    subjects: ["Math", "Physics"],
    lastActive: "30 mins ago",
    avatar: "https://i.pravatar.cc/48?img=21",
  },
  {
    id: 3,
    name: "Harry Potter",
    email: "harry.potter@hogwarts.edu",
    progress: 76,
    assignments: "12/16",
    subjects: ["Defense", "Potions"],
    lastActive: "1 day ago",
    avatar: "https://i.pravatar.cc/48?img=22",
  },
  {
    id: 4,
    name: "Luna Lovegood",
    email: "luna.lovegood@hogwarts.edu",
    progress: 88,
    assignments: "9/12",
    subjects: ["Creativity", "Charms"],
    lastActive: "3 hours ago",
    avatar: "https://i.pravatar.cc/48?img=23",
  },
  {
    id: 5,
    name: "Neville Longbottom",
    email: "neville@hogwarts.edu",
    progress: 69,
    assignments: "7/12",
    subjects: ["Herbology", "Potions"],
    lastActive: "5 hours ago",
    avatar: "https://i.pravatar.cc/48?img=24",
  },
];
const StudentsPage = () => (
<div className="p-6 flex flex-col gap-6 h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-gradient-to-br from-purple-50 to-blue-50">

    {/* Header */}
    <div>
      <h1 className="text-xl font-bold text-gray-800">Assigned Students</h1>
      <p className="text-sm text-gray-500">
        Manage and track your students’ progress here
      </p>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 border-green-400">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-green-500" />
          <p className="text-sm font-medium">Top Performers</p>
        </div>
        <span className="text-lg font-bold">3</span>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 border-yellow-400">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
          <p className="text-sm font-medium">Needs Attention</p>
        </div>
        <span className="text-lg font-bold">1</span>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 border-purple-400">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <p className="text-sm font-medium">Average Progress</p>
        </div>
        <span className="text-lg font-bold">83%</span>
      </div>
    </div>

    {/* Student Cards */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full overflow-y-auto no-scrollbar max-h-[500px] pr-2">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 hover:shadow-lg transition"
        >
          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-full border border-gray-200"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{student.name}</p>
              <p className="text-xs text-gray-500">{student.email}</p>
            </div>
          </div>

          {/* Progress */}
          <div>
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-gray-700">Overall Progress</p>
    <span className="text-xs font-semibold text-gray-600">
      {student.progress}%
    </span>
  </div>
  <div className="w-full bg-gray-200 h-2 rounded-full mt-1 overflow-hidden">
    <div
      className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all"
      style={{ width: `${student.progress}%` }}
    ></div>
  </div>
</div>

{/* Assignments & Subjects */}
<div className="mt-2 flex flex-col gap-1 text-xs text-gray-600">
  <p className="flex items-center gap-1">
    <BookOpen className="w-3 h-3" /> Assignments:{" "}
    <span className="font-medium">{student.assignments}</span>
  </p>
  <div className="flex gap-2 flex-wrap">
    {student.subjects.map((sub, idx) => (
      <span
        key={idx}
        className="px-2 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 text-[11px] shadow-sm"
      >
        {sub}
      </span>
    ))}
  </div>
</div>

          {/* Last Active */}
          <p className="flex items-center gap-1 text-xs text-gray-500 mt-auto">
            <Clock className="w-3 h-3" /> Last active: {student.lastActive}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const UploadPage = () => (
  <div className="p-6 flex flex-col gap-6 h-full bg-gradient-to-br from-pink-50 to-orange-50 overflow-y-auto scrollbar-hide">
    {/* Page Heading */}
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Content</h1>
    <p className="text-gray-500 text-sm -mt-2">
      Share educational content with students here
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      {/* Upload Box */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-purple-400 transition">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Upload className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-gray-700 font-medium">Upload Content Here</p>
          <p className="text-xs text-gray-400 text-center">
            Drop files here or click to browse <br />
            <span className="font-medium">PDF, DOC, MP4, PPT, Images</span> supported
          </p>
          <button className="mt-2 px-4 py-1.5 bg-purple-500 text-white text-sm rounded-lg shadow hover:bg-purple-600">
            Choose Files
          </button>
        </div>

        <div className="flex gap-4 mt-5">
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 text-sm">
            Upload and publish
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg shadow hover:bg-gray-200 text-sm">
            Save as draft
          </button>
        </div>
      </div>

      {/* Right Column: Stats + Recently Uploaded */}
      <div className="flex flex-col gap-4">
        {/* Upload Stats */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
            <PieIcon className="w-5 h-5 text-purple-500" /> Upload Statistics
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Total Uploads</span>
              <span className="font-bold text-gray-800">45</span>
            </li>
            <li className="flex justify-between">
              <span>This Month</span>
              <span className="font-bold text-green-500">12</span>
            </li>
            <li className="flex justify-between">
              <span>Total Downloads</span>
              <span className="font-bold text-blue-500">387</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Avg. Rating</span>
              <span className="flex items-center gap-1 font-bold text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" /> 4.8
              </span>
            </li>
          </ul>
        </div>

        {/* Recently Uploaded */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
            <FileText className="w-5 h-5 text-pink-500" /> Recently Uploaded
          </h2>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-400" /> Python Problems Set #1
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-yellow-500" /> Tailwind Set #2 Solutions
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-500" /> Kotlin Set #3 Solutions
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);


const SubmissionsPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  return (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Review Submissions</h1>
          <p className="text-sm text-gray-500">
            Manage and track your students’ progress here
          </p>
        </div>
        <select className="px-3 py-1.5 rounded-lg border text-sm shadow-sm">
          <option>All Submissions</option>
          <option>Graded</option>
          <option>Pending</option>
        </select>
      </div>

     

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-t-4 border-green-400">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-green-500" />
            <p className="text-sm font-medium">Graded</p>
          </div>
          <span className="text-lg font-bold">3</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-t-4 border-yellow-400">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-yellow-500" />
            <p className="text-sm font-medium">Pending for Review</p>
          </div>
          <span className="text-lg font-bold">3</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-t-4 border-purple-400">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <p className="text-sm font-medium">Average Progress</p>
          </div>
          <span className="text-lg font-bold">83%</span>
        </div>
      </div>

      {/* Submissions Queue */}
      <h2 className="text-lg font-semibold text-gray-800">Submissions Queue</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Side: Submissions List */}
        <div className="flex flex-col gap-4">
          {submissions.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-md p-4 flex gap-3">
              <img
                src={s.avatar}
                alt={s.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">{s.name}</p>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{s.assignment}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <FileText className="w-4 h-4" /> PDF • Due: {s.due} • {s.submittedAgo}
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 flex items-center gap-1">
                    <Download className="w-3 h-3" /> Download
                  </button>
                  <button
                    onClick={() => setSelectedSubmission(s)}
                    className="px-3 py-1 text-xs rounded bg-purple-500 text-white hover:bg-purple-600"
                  >
                    Grade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Grading Form or Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {selectedSubmission ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Grade Assignment
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedSubmission.name} — {selectedSubmission.assignment}
              </p>

              <form className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Score
                  <input
                    type="number"
                    placeholder="Enter score"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-purple-200"
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Feedback
                  <textarea
                    placeholder="Write feedback..."
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-purple-200"
                    rows={4}
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Submit Grade
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <FileText className="w-10 h-10 text-gray-400 mb-2" />
              <h3 className="font-semibold text-gray-700">Select a Submission</h3>
              <p className="text-xs text-gray-500">
                Choose a submission and start grading.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const ProfilePage = ({ setActivePage }: { setActivePage: any }) => (

  <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
    {/* Header */}
    <div className="flex items-center gap-4">
      <img
        src="https://media.craiyon.com/2025-04-17/goEEGsqJStOoz8UpaGH4YQ.webp"
        alt="profile"
        className="w-20 h-20 rounded-full border shadow"
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Lorem Ipsum</h1>
        <p className="text-gray-600 text-sm">AI Specialist</p>
        <p className="text-gray-500 text-xs">PhD in Artificial Intelligence</p>
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-lg font-bold text-purple-600">12</p>
        <p className="text-sm text-gray-500">Courses</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-lg font-bold text-blue-600">325</p>
        <p className="text-sm text-gray-500">Students</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-lg font-bold text-green-600">4.9</p>
        <p className="text-sm text-gray-500">Rating</p>
      </div>
    </div>

    {/* My Courses Button */}
    <button
  onClick={() => setActivePage("courses")}
  className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow hover:scale-105 transition"
>
  My Courses
</button>

  </div>
);
const CreateCoursePage = () => {
  return (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>
        <p className="text-sm text-gray-500">
          Fill in the details to publish your new course.
        </p>
      </div>

      {/* Form */}
      <form className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Course Title
          <input
            type="text"
            placeholder="Enter course title"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-green-200"
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Description
          <textarea
            placeholder="Write a brief description..."
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-green-200"
            rows={4}
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Category
          <select className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-green-200">
            <option>Select category</option>
            <option>Programming</option>
            <option>AI</option>
            <option>Mathematics</option>
            <option>Design</option>
          </select>
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Upload Thumbnail
          <input
            type="file"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm"
          />
        </label>

        <button
          type="submit"
          className="mt-3 px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow hover:scale-105 transition"
        >
          Publish Course
        </button>
      </form>
    </div>
  );
};


// Main Dashboard (Home)
const HomeDashboard = ({
  tab,
  setTab,
}: {
  tab: "students" | "submissions";
  setTab: any;
}) => (
  <div className="grid grid-cols-2 gap-5 mt-5 flex-1 overflow-hidden">
    {/* LEFT COLUMN */}
    <div className="flex flex-col gap-5 h-full">
      {/* Latest Content */}
      <div className="bg-gradient-to-tr from-orange-100 via-pink-50 to-white rounded-2xl p-4 shadow">
        <h2 className="flex items-center gap-2 font-semibold text-sm mb-2 text-gray-700">
          <BookOpen className="w-4 h-4 text-orange-500" /> Latest Content
        </h2>
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
            alt="python"
            className="w-12 h-12"
          />
          <div>
            <h3 className="font-bold text-sm">Introduction to Python</h3>
            <p className="text-xs text-gray-500">Beginner • 30 questions</p>
            <p className="text-xs text-gray-400">
              Lorem ipsum this is the text about the assignment.
            </p>
          </div>
        </div>
        <p className="text-xs text-right text-gray-600 mt-2 cursor-pointer hover:underline">
          View all &gt;
        </p>
      </div>

<div className="bg-gradient-to-br from-green-50 to-yellow-50 p-4 rounded-xl shadow-sm flex flex-col">
  {/* Heading */}
  <div className="flex items-center gap-2 mb-2">
    <Clock className="w-5 h-5 text-green-500" />
    <h2 className="text-lg font-semibold text-gray-800">Assignment Stats</h2>
  </div>

  {/* Legend + Chart */}
  <div className="flex items-center justify-between flex-1 ">
    {/* Legend */}
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-300"></span>
        <span>Overview <strong>2</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
        <span>Pending <strong>3</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-300"></span>
        <span>Graded <strong>10</strong></span>
      </div>
    </div>

    {/* Chart */}
    <div className="w-40 h-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: "Overview", value: 2, fill: "#FCA5A5" },
              { name: "Pending", value: 3, fill: "#FCD34D" },
              { name: "Graded", value: 10, fill: "#86EFAC" },
            ]}
            innerRadius="40%"   // smaller inner radius → thicker donut
            outerRadius="90%"   // controls outer size
            paddingAngle={3}
            dataKey="value"
          />
          <Tooltip
            contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="bg-gradient-to-tr from-blue-50 via-indigo-50 to-white rounded-2xl p-3 shadow flex flex-col h-full overflow-hidden">
      <div className="flex mb-3 bg-gray-100 rounded-full p-1">
        <button
          className={`flex-1 py-1.5 text-sm rounded-full transition ${
            tab === "students"
              ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
              : "text-gray-600"
          }`}
          onClick={() => setTab("students")}
        >
          Students
        </button>
        <button
          className={`flex-1 py-1.5 text-sm rounded-full transition ${
            tab === "submissions"
              ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
              : "text-gray-600"
          }`}
          onClick={() => setTab("submissions")}
        >
          Submissions
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 text-sm">
        {tab === "students" ? (
          <ul className="space-y-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <UserCircle className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-600 text-sm">
                      Student {idx + 1}
                    </p>
                    <p className="text-xs text-gray-500">
                      student{idx + 1}@example.com
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-gradient-to-r from-green-200 to-green-400 text-green-800 text-xs rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Excellent
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">
                      Assignment {idx + 1}
                    </p>
                    <p className="text-xs text-gray-500">Submitted Today</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 text-xs rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Pending
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);
type ActivePageType =
  | "home"
  | "students"
  | "upload"
  | "submissions"
  | "profile"
  | "courses"
  | "create-course"
  | { page: "view-course"; course: any };

const CoursesPage = ({ setActivePage }: { setActivePage: React.Dispatch<React.SetStateAction<ActivePageType>> }) => {
  const courses = [
    {
      id: 1,
      title: "Let's React!",
      desc: "Master modern React patterns and best practices",
      students: 21,
      due: "2024-09-15",
      projects: 3,
      progress: 50,
      status: "active",
    },
    {
      id: 2,
      title: "Jam with Java",
      desc: "Master the concepts of Java and OOPS concepts",
      students: 25,
      due: "2024-10-25",
      projects: 5,
      progress: 73,
      status: "active",
    },
    {
      id: 3,
      title: "Design Dash",
      desc: "Master the fundamentals of UI/UX Design",
      students: 18,
      due: "2024-11-02",
      projects: 2,
      progress: 100,
      status: "completed",
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
      {/* Search + Button */}
      <div className="flex justify-between items-center">
        
       <button
  onClick={() => setActivePage("create-course")}
  className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow hover:scale-105 transition"
>
  Create Course
</button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
      <p className="text-sm text-gray-500 -mt-4">Manage and create your courses here</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left: Courses List */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">{course.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    course.status === "active"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500">{course.desc}</p>

              {/* Meta info */}
              <div className="text-xs text-gray-500 flex gap-4">
                <span>👥 {course.students} Students</span>
                <span>📅 Due: {course.due}</span>
                <span>📂 {course.projects} projects</span>
              </div>

              {/* Progress bar */}
              <div>
                <p className="text-xs text-gray-600 mb-1">Progress</p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{course.progress}%</p>
              </div>

             <button
  onClick={() => setActivePage({ page: "view-course", course })}
  className="self-end mt-2 px-4 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm"
>
  View Course
</button>

            </div>
          ))}
        </div>
{/* Right: Project Submissions */}
<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-auto w-full">
  <h2 className="text-lg font-semibold text-gray-800 mb-5">Project Submissions</h2>

  <div className="space-y-4">
    {submissions.map((s) => {
      const isPending = s.status.toLowerCase().includes("pending");
      const isApproved =
        s.status.toLowerCase().includes("approved") ||
        s.status.toLowerCase().includes("graded");
      const isRevision = s.status.toLowerCase().includes("revision");

      return (
        <div
          key={s.id}
          className={`rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3 border
            ${
              isPending
                ? "bg-yellow-50 border-yellow-200"
                : isApproved
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
        >
          {/* Top row: Avatar + name + time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={s.avatar}
                alt={s.name}
                className="w-10 h-10 rounded-full border shadow-sm"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-500">{s.submittedAgo}</p>
              </div>
            </div>
          </div>

          {/* Middle row: Assignment title */}
          <p className="font-semibold text-gray-900 text-sm">{s.assignment}</p>

          {/* Bottom row: Status badge */}
          <div className="flex justify-end">
            <span
              className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full
                ${
                  isPending
                    ? "bg-yellow-100 text-yellow-800"
                    : isApproved
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
            >
              {isPending && <Clock className="w-3 h-3" />}
              {isApproved && <CheckCircle className="w-3 h-3" />}
              {isRevision && <AlertCircle className="w-3 h-3" />}
              {s.status}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>


      </div>
    </div>
  );
};
// ViewCoursePage.tsx (add inside MentorDashboard.tsx for now)

const ViewCoursePage = ({
  course,
  setActivePage,
}: {
  course: any;
  setActivePage: React.Dispatch<React.SetStateAction<ActivePageType>>;
}) => {
  const [activeTab, setActiveTab] = useState<"curriculum" | "projects" | "resources">("curriculum");

  return (
    <div className="p-6 flex flex-col h-full overflow-y-auto bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setActivePage("courses")}
          className="text-orange-500 text-sm flex items-center gap-1 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
          <p className="text-sm text-gray-500">with Dr. Lorem Ipsum</p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow">
          active
        </span>
      </div>

      {/* Course Header Card */}
      <div className="bg-white rounded-2xl shadow p-6 border border-yellow-200">
        <h1 className="text-xl font-bold text-gray-800">Course Description</h1>
        <div className="mt-2 text-sm text-gray-600">
          Master modern React patterns, hooks, context API, and performance optimization
          techniques to build scalable applications.
        </div>

        {/* Meta + Progress */}
        <div className="mt-4 flex justify-between flex-wrap gap-3 text-sm">
          <div className="flex gap-6">
            <span className="flex items-center gap-1">⏰ 8 weeks</span>
            <span className="flex items-center gap-1">👥 24 students</span>
            <span className="flex items-center gap-1">🏆Advanced</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-600">Overall Progress</span>
            <span className="text-xl font-bold text-blue-600">{course.progress}%</span>
            <div className="w-40 bg-gray-200 h-2 rounded-full mt-1">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex gap-2 bg-gray-100 rounded-full p-1">
          {["curriculum", "projects", "resources"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-800 shadow"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-4">
        {/* Curriculum */}
        {activeTab === "curriculum" && (
          <>
            {[
              { week: 1, title: "React Fundamentals Review", topics: ["Components", "State", "Events"], status: "completed" },
              { week: 2, title: "Hooks Deep Dive", topics: ["useState", "useEffect", "useContext"], status: "in progress" },
              { week: 3, title: "Advanced Patterns", topics: ["Render Props", "Custom Hooks", "Compound Components"], status: "locked" },
            ].map((w, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow border border-gray-100 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Week {w.week}: {w.title}</h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 capitalize shadow">
                    {w.status}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {w.topics.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-gray-100 rounded-full shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button className="self-start px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600">
                  Start Learning
                </button>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <>
            {[
              { title: "Custom Hook Library", due: "2024-09-10", grade: "95%", status: "submitted" },
              { title: "React Dashboard", due: "2024-09-20", grade: "Pending", status: "in review" },
              { title: "Performance Optimization", due: "2024-09-30", grade: "Pending", status: "not submitted" },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow border border-gray-100 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{p.title}</h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 shadow capitalize">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Due: {p.due}</p>
                <p className="text-xs text-gray-500">Grade: {p.grade}</p>
                <button className="mt-2 self-start px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm text-sm">
                  View Submission
                </button>
              </div>
            ))}
          </>
        )}

        {/* Resources */}
        {activeTab === "resources" && (
          <>
            {[
              { name: "React Performance Guide.pdf", size: "2.4 MB" },
              { name: "React Testing Best Practices.pdf", size: "1.8 MB" },
              { name: "React Context Patterns.pdf", size: "3.2 MB" },
            ].map((r, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.size}</p>
                </div>
                <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm text-sm">
                  Download
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};





const MentorDashboard: React.FC = () => {
  const [tab, setTab] = useState<"students" | "submissions">("students");
  const [activePage, setActivePage] = useState<ActivePageType>("home");

  // notifications state + dropdown control
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  function toggleNotif() {
    setNotifOpen((prev) => !prev);
  }

  function markAsRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  // click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notifOpen]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
      bg-[radial-gradient(circle_at_top_left,_#fed7aa,_transparent_60%),radial-gradient(circle_at_top_right,_#fbcfe8,_transparent_60%),radial-gradient(circle_at_bottom_left,_#c7d2fe,_transparent_60%),radial-gradient(circle_at_bottom_right,_#d9f99d,_transparent_60%)] 
      py-10 px-6 mt-16"
    >
      {/* Outer White Container */}
      <div className="flex max-w-5xl w-full h-[80vh] bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 gap-6">
        {/* Sidebar */}
        <aside className="w-16 bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col justify-center items-center py-6 space-y-6 rounded-3xl shadow-md">
          <button
            onClick={() => setActivePage("home")}
            className="p-2 rounded-xl hover:bg-white/30"
          >
            <Home className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setActivePage("students")}
            className="p-2 rounded-xl hover:bg-white/30"
          >
            <Users className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setActivePage("upload")}
            className="p-2 rounded-xl hover:bg-white/30"
          >
            <Upload className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setActivePage("submissions")}
            className="p-2 rounded-xl hover:bg-white/30"
          >
            <FileText className="w-6 h-6 text-white" />
          </button>
        </aside>

        {/* Main Container */}
        <main className="flex-1 bg-gradient-to-tr from-blue-50 via-indigo-50 to-white rounded-3xl p-6 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-yellow-600 drop-shadow-sm">
              Good Morning, Mentor!
            </h1>

            {/* Right side: Notifications + Profile */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={toggleNotif}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span
                      className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-blue-600"
                      style={{ transform: "translate(30%,-30%)" }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-80 rounded-2xl border border-white/20 
                       shadow-2xl bg-white/90 backdrop-blur-xl z-[9999] overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/50">
                        <span className="text-sm font-semibold text-gray-800">
                          Notifications
                        </span>
                        <button
                          onClick={markAllRead}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            className={`w-full text-left px-4 py-3 flex gap-3 items-start transition 
                              hover:bg-white/40 ${
                                n.unread ? "bg-blue-50/60" : ""
                              }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {n.title}
                                </p>
                                <span className="text-xs text-gray-400">
                                  {n.time}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                {n.body}
                              </p>
                            </div>
                            {n.unread && (
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="px-3 py-2 border-t border-gray-200/50">
                        <a
                          href="#"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View all
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile button */}
              <button
                onClick={() => setActivePage("profile")}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <img
                  src="https://media.craiyon.com/2025-04-17/goEEGsqJStOoz8UpaGH4YQ.webp"
                  alt="profile"
                  className="w-9 h-9 rounded-full"
                />
                <div className="hidden sm:block">
                  <p className="font-medium text-sm">Lorem Ipsum</p>
                  <p className="text-xs text-gray-500">AI Specialist</p>
                </div>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-5 relative max-w-sm">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full px-9 py-2.5 bg-white shadow-sm outline-none text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Dynamic Pages */}
          <div className="flex-1 mt-5 overflow-hidden">
            {typeof activePage === "string" && activePage === "home" && (
              <HomeDashboard tab={tab} setTab={setTab} />
            )}
            {typeof activePage === "string" &&
              activePage === "students" && <StudentsPage />}
            {typeof activePage === "string" &&
              activePage === "upload" && <UploadPage />}
            {typeof activePage === "string" &&
              activePage === "submissions" && <SubmissionsPage />}
            {typeof activePage === "string" && activePage === "profile" && (
              <ProfilePage setActivePage={setActivePage} />
            )}
            {typeof activePage === "string" && activePage === "courses" && (
              <CoursesPage setActivePage={setActivePage} />
            )}
            {typeof activePage === "string" &&
              activePage === "create-course" && <CreateCoursePage />}

            {/* NEW: Handle object case for viewing a course */}
            {typeof activePage !== "string" &&
              activePage.page === "view-course" && (
                <ViewCoursePage
                  course={activePage.course}
                  setActivePage={setActivePage}
                />
              )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorDashboard;