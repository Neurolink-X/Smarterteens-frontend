import React from "react";
import { Eye, BookOpen, TrendingUp, Clock, Shield, Share2 } from "lucide-react";
import { getStudentProfile } from "../../../shared/utils/studentProfile";
import { getCourseById, type Course } from "../data/coursesData";
import StudentProfileCard from "./StudentProfileCard";
import { getProgressSummary } from "../../../shared/utils/progress";
import { getStreak } from "../../../shared/utils/streak";
import { getLastActivityText } from "../../../shared/utils/weeklyGoal";

const ParentView: React.FC = () => {
    // Get enrolled courses with progress
    const enrolledIds = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    const enrolledCourses = enrolledIds
        .map((id: string) => {
            const course = getCourseById(Number(id));
            if (!course) return null;
            const totalLessons = course.modules.reduce(
                (acc, module) => acc + module.lessons.length,
                0
            );
            const progress = getProgressSummary(Number(id), totalLessons);
            return { course, progress };
        })
        .filter(Boolean) as Array<{
        course: Course;
        progress: ReturnType<typeof getProgressSummary>;
    }>;

    const streak = getStreak();
    const lastActive = getLastActivityText();
    const profile = getStudentProfile();
    const totalProgress = enrolledCourses.reduce((sum, { progress }) => sum + progress.percentage, 0);
    const averageProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Parent View</h1>
                            <p className="text-sm text-gray-600">Track your child's learning progress</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">
                                    Progress is tracked automatically
                                </p>
                                <p className="text-xs text-blue-700">
                                    All learning activity is saved automatically. Your child can resume anytime, 
                                    and you can check their progress here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Profile */}
                <div className="mb-8">
                    <StudentProfileCard />
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-900">Enrolled Courses</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{enrolledCourses.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Active courses</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-gray-900">Average Progress</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{averageProgress}%</p>
                        <p className="text-sm text-gray-500 mt-1">Across all courses</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-gray-900">Last Active</h3>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{lastActive}</p>
                        {streak.currentStreak > 0 && (
                            <p className="text-sm text-orange-600 mt-1 font-medium">
                                🔥 {streak.currentStreak}-day learning streak
                            </p>
                        )}
                    </div>
                </div>

                {/* Course Progress List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Course Progress</h2>

                    {enrolledCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">No courses enrolled yet</p>
                            <p className="text-sm text-gray-500">
                                When your child enrolls in a course, their progress will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {enrolledCourses.map(({ course, progress }) => (
                                <div
                                    key={course.id}
                                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">{course.description}</p>
                                        </div>
                                        {progress.isCompleted && (
                                            <div className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                Completed
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-gray-900">
                                                {progress.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${
                                                    progress.isCompleted ? "bg-green-500" : "bg-blue-600"
                                                }`}
                                                style={{ width: `${progress.percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>
                                                {progress.completed} of {progress.total} lessons
                                            </span>
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Share Progress Update */}
                {enrolledCourses.length > 0 && (
                    <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Share Progress Update</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Share your child's learning progress with family and friends.
                        </p>
                        <button
                            onClick={async () => {
                                const shareText = `${profile.name || "My child"} is making great progress on SmarterTeens! ${enrolledCourses.length} course${enrolledCourses.length > 1 ? "s" : ""} enrolled, ${averageProgress}% average progress. ${streak.currentStreak > 0 ? `🔥 ${streak.currentStreak}-day learning streak!` : ""}`;
                                try {
                                    await navigator.clipboard.writeText(shareText);
                                    alert("Progress update copied! Share it with anyone.");
                                } catch (error) {
                                    console.error("Failed to copy:", error);
                                }
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            Copy Progress Update
                        </button>
                        <p className="text-xs text-gray-500 text-center mt-3">
                            Share via WhatsApp, email, or any messaging app
                        </p>
                    </div>
                )}

                {/* Info Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        This is a read-only view. All progress is tracked automatically.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        For questions or support, contact us at info@smarterteens.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ParentView;
