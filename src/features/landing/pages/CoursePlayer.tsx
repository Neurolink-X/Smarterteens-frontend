import React from "react";
import { useParams, Link } from "react-router-dom";

const CoursePlayer: React.FC = () => {
    const { id } = useParams();
    const [currentLessonIndex, setCurrentLessonIndex] = React.useState(0);

    // Mock Content
    const modules = [
        {
            title: "Module 1: Introduction",
            lessons: [
                { title: "Welcome to the Course", duration: "2:30", type: "video" },
                { title: "Setting up your environment", duration: "5:00", type: "video" },
                { title: "First Quiz", duration: "10m", type: "quiz" },
            ]
        },
        {
            title: "Module 2: Core Concepts",
            lessons: [
                { title: "Understanding React", duration: "15:00", type: "video" },
                { title: "State and Props", duration: "20:00", type: "video" },
            ]
        }
    ];

    const allLessons = modules.flatMap(m => m.lessons);
    const currentLesson = allLessons[currentLessonIndex];

    const handleNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
        } else {
            alert("Course Completed!");
        }
    };

    const handlePrev = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900 z-10">
                <div className="flex items-center gap-4">
                    <Link to={`/course/${id}`} className="p-2 hover:bg-gray-800 rounded-full transition">
                        ← Exit
                    </Link>
                    <h1 className="font-bold text-lg hidden sm:block">Course {id}: {currentLesson.title}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Progress: {Math.round(((currentLessonIndex) / allLessons.length) * 100)}%</span>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${((currentLessonIndex) / allLessons.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 border-r border-gray-800 bg-gray-950 overflow-y-auto hidden md:block">
                    <div className="p-4 font-bold text-gray-400 uppercase text-xs tracking-wider">Course Content</div>
                    {modules.map((module, mIdx) => (
                        <div key={mIdx}>
                            <div className="px-4 py-3 bg-gray-900/50 text-sm font-semibold text-gray-300 border-y border-gray-800">
                                {module.title}
                            </div>
                            <div>
                                {module.lessons.map((lesson, lIdx) => {
                                    // Calculate global index
                                    const globalIndex = modules.slice(0, mIdx).reduce((acc, m) => acc + m.lessons.length, 0) + lIdx;
                                    const isActive = globalIndex === currentLessonIndex;
                                    const isCompleted = globalIndex < currentLessonIndex;

                                    return (
                                        <button
                                            key={lIdx}
                                            onClick={() => setCurrentLessonIndex(globalIndex)}
                                            className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${isActive ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500" : "hover:bg-gray-900 text-gray-400"
                                                }`}
                                        >
                                            <div className="w-5 flex justify-center">
                                                {isActive ? "▶" : isCompleted ? "✓" : <span className="text-xs opacity-50">{lIdx + 1}</span>}
                                            </div>
                                            <div className="flex-1 truncate">
                                                {lesson.title}
                                            </div>
                                            <div className="text-xs opacity-50">{lesson.duration}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-black relative">
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-xl shadow-2xl flex flex-col items-center justify-center text-center p-8 border border-gray-700">
                            <div className="w-24 h-24 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
                                <span className="text-4xl">▶</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">{currentLesson.title}</h2>
                            <p className="text-gray-400 max-w-md mx-auto">
                                This is a simulation of the course player content. In a real app, a video player or interactive component would load here.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="h-20 border-t border-gray-800 bg-gray-900 flex items-center justify-between px-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentLessonIndex === 0}
                            className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
                        >
                            {currentLessonIndex === allLessons.length - 1 ? "Finish Course" : "Next Lesson →"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
