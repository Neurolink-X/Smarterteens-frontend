import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Target, ArrowRight, Sparkles } from "lucide-react";

interface EmptyStateProps {
    type: "no-courses" | "course-finished" | "welcome-back";
    lastActive?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, lastActive }) => {
    if (type === "no-courses") {
        return (
            <div className="text-center py-16 px-4">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Start Your Learning Journey
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You haven't enrolled in any courses yet. Explore our courses and find the perfect 
                    one to start building your skills.
                </p>
                <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Browse Courses
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    if (type === "course-finished") {
        return (
            <div className="text-center py-16 px-4">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                    <Target className="w-12 h-12 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Course Complete! 🎉
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Great job completing this course! Ready to learn something new? 
                    Explore our other courses to continue building your skills.
                </p>
                <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Explore Next Course
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    if (type === "welcome-back") {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Welcome back! 👋
                        </h3>
                        <p className="text-gray-700 mb-3">
                            {lastActive ? `Last active: ${lastActive}` : "Ready to continue learning?"}
                        </p>
                        <p className="text-sm text-gray-600">
                            Your progress is saved automatically. Pick up where you left off or explore new courses.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default EmptyState;
