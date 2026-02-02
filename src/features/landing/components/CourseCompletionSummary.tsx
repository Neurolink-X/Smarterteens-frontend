import React from "react";
import { Trophy, CheckCircle, Clock } from "lucide-react";

interface CourseCompletionSummaryProps {
    courseTitle: string;
    totalLessons: number;
    completedLessons: number;
}

const CourseCompletionSummary: React.FC<CourseCompletionSummaryProps> = ({
    courseTitle,
    totalLessons,
    completedLessons,
}) => {
    return (
        <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-8 text-center animate-in fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Congratulations!</h2>
            <p className="text-lg text-gray-700 mb-6">
                You've completed <strong>{courseTitle}</strong>
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{completedLessons}</div>
                    <div className="text-xs text-gray-600">Lessons</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Complete</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{totalLessons}</div>
                    <div className="text-xs text-gray-600">Total</div>
                </div>
            </div>
            <p className="text-sm text-gray-600">
                You can review any lesson anytime. Keep up the great work!
            </p>
        </div>
    );
};

export default CourseCompletionSummary;
