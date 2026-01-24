import React from "react";
import {
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { submissions } from "../data/mockData";
import type { ActivePageType } from "../types";

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
                                    className={`text-xs px-2 py-1 rounded-full ${course.status === "active"
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
            ${isPending
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
                ${isPending
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

export default CoursesPage;
