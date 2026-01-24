import React, { useState } from "react";
import type { ActivePageType } from "../types";

const ViewCoursePage = ({
    course,
    setActivePage,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === tab
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

export default ViewCoursePage;
