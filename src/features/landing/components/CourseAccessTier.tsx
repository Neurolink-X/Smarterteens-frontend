import React from "react";
import { Unlock, Crown } from "lucide-react";

type AccessTier = "free-preview" | "full-access" | "premium";

interface CourseAccessTierProps {
    tier: AccessTier;
    previewLessons?: number;
    totalLessons?: number;
}

const CourseAccessTier: React.FC<CourseAccessTierProps> = ({ 
    tier, 
    previewLessons = 2, 
    totalLessons = 10 
}) => {
    if (tier === "free-preview") {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Unlock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">Free Preview</span>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                    You're viewing the first {previewLessons} lessons. 
                    <span className="font-medium"> Upgrade to unlock full access</span> to all {totalLessons} lessons.
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium underline">
                    Learn about premium access →
                </button>
            </div>
        );
    }

    if (tier === "full-access") {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Unlock className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-900">Full Access</span>
                </div>
                <p className="text-sm text-green-700">
                    You have access to all {totalLessons} lessons in this course.
                </p>
            </div>
        );
    }

    if (tier === "premium") {
        return (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-900">Premium Course</span>
                </div>
                <p className="text-sm text-yellow-700 mb-2">
                    <span className="font-medium">Included with premium access.</span> 
                    This mentor-guided course includes expert feedback and personalized support.
                </p>
                <button className="text-xs text-yellow-600 hover:text-yellow-700 font-medium underline">
                    Upgrade to premium →
                </button>
            </div>
        );
    }

    return null;
};

export default CourseAccessTier;
