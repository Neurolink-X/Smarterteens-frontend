import React from "react";
import { Users } from "lucide-react";

interface LearnersLikeYouProps {
    studentsEnrolled: number;
    averageCompletionTime?: string;
}

const LearnersLikeYou: React.FC<LearnersLikeYouProps> = ({ 
    studentsEnrolled, 
    averageCompletionTime = "4 weeks" 
}) => {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                        {studentsEnrolled.toLocaleString()} students are learning this
                    </p>
                    <p className="text-xs text-gray-600">
                        Most learners complete this course in {averageCompletionTime}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LearnersLikeYou;
