import React from "react";
import { Award, BookOpen, Target, Trophy } from "lucide-react";
import { getAchievements, ACHIEVEMENT_DEFINITIONS } from "../../../shared/utils/achievements";
import { getStreak } from "../../../shared/utils/streak";
import { getProgressSummary } from "../../../shared/utils/progress";
import { getCourseById } from "../data/coursesData";

const BadgeDisplay: React.FC = () => {
    const streak = getStreak();
    const enrolledIds = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    const hasCompletedCourse = enrolledIds.some((id: string) => {
        const course = getCourseById(Number(id));
        if (!course) return false;
        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        const progress = getProgressSummary(Number(id), totalLessons);
        return progress.isCompleted;
    });
    const achievementsData = getAchievements();
    const badges = [
        {
            id: "beginner",
            name: "Beginner",
            icon: BookOpen,
            unlocked: achievementsData[ACHIEVEMENT_DEFINITIONS.FIRST_LESSON.id]?.unlocked || false,
            description: "Completed your first lesson",
        },
        {
            id: "consistent",
            name: "Consistent Learner",
            icon: Target,
            unlocked: streak.currentStreak >= 7 || achievementsData[ACHIEVEMENT_DEFINITIONS.STREAK_7.id]?.unlocked || false,
            description: "7-day learning streak",
        },
        {
            id: "finisher",
            name: "Course Finisher",
            icon: Trophy,
            unlocked: hasCompletedCourse || achievementsData[ACHIEVEMENT_DEFINITIONS.COURSE_COMPLETE.id]?.unlocked || false,
            description: "Completed a full course",
        },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Your Badges</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                        <div
                            key={badge.id}
                            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                                badge.unlocked
                                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-sm"
                                    : "bg-gray-50 border-gray-200 opacity-60"
                            }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    badge.unlocked
                                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                                        : "bg-gray-200 text-gray-400"
                                }`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <p
                                className={`text-xs font-semibold text-center ${
                                    badge.unlocked ? "text-gray-900" : "text-gray-500"
                                }`}
                            >
                                {badge.name}
                            </p>
                            {badge.unlocked && (
                                <p className="text-xs text-gray-600 text-center mt-1">
                                    {badge.description}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
                {badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked
            </p>
        </div>
    );
};

export default BadgeDisplay;
