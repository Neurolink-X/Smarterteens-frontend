import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "../data/coursesData";

interface CommunitySignalsProps {
    currentCourseId: number;
}

const CommunitySignals: React.FC<CommunitySignalsProps> = ({ currentCourseId }) => {
    // Find next course to recommend (simple logic)
    const currentIndex = courses.findIndex(c => c.id === currentCourseId);
    const nextCourse = currentIndex >= 0 && currentIndex < courses.length - 1 
        ? courses[currentIndex + 1] 
        : courses.find(c => c.id !== currentCourseId);

    if (!nextCourse) return null;

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        Students who finished this also learned...
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                        {nextCourse.title}
                    </p>
                    <Link
                        to={`/course/${nextCourse.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                    >
                        Explore this course
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CommunitySignals;
