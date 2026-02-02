import React from "react";
import { Link } from "react-router-dom";
import {
    Search,
    MessageSquare,
    Bookmark,
    Play,
    Trophy,
    Flame,
} from "lucide-react";
import { leaderboard, weeklyChallenges } from "../data/mockData";
import { getCourseById, type Course } from "../../landing/data/coursesData";
import { getProgressSummary } from "../../../shared/utils/progress";
import { getStreak } from "../../../shared/utils/streak";
import { getUnlockedCount } from "../../../shared/utils/achievements";
import WeeklyGoalCard from "../../landing/components/WeeklyGoalCard";
import BadgeDisplay from "../../landing/components/BadgeDisplay";
import EmptyState from "../../landing/components/EmptyState";
import StudentProfileCard from "../../landing/components/StudentProfileCard";
import LearningJourneyTimeline from "../../landing/components/LearningJourneyTimeline";
import { getLastActivityText } from "../../../shared/utils/weeklyGoal";

const GamifiedDashboard: React.FC = () => {
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
        .filter(Boolean) as Array<{ course: Course; progress: ReturnType<typeof getProgressSummary> }>;

    const totalEnrolled = enrolledCourses.length;
    const totalProgress = enrolledCourses.reduce((sum, { progress }) => sum + progress.percentage, 0);
    const averageProgress = totalEnrolled > 0 ? Math.round(totalProgress / totalEnrolled) : 0;
    const streak = getStreak();
    const achievementsUnlocked = getUnlockedCount();

    return (
        <div className="min-h-screen min-h-[100dvh] bg-gray-50">
            {/* Gradient header - responsive */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0CB1B5] via-[#0CB1B5] to-[#FA8F3F] sm:bg-gradient-to-r sm:from-[#0CB1B5] sm:via-[#5ec9cc] sm:to-[#FA8F3F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <img
                            src="/Images/smarterteens_logo.png"
                            alt="SmarterTeens"
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-md"
                        />
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 drop-shadow-sm">
                                SmarterTeens
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-700/90 italic">
                                Gamified Learning
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Main Learning - primary content, first on mobile */}
                    <div className="lg:col-span-7 xl:col-span-8 order-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 overflow-hidden">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                    My Learning
                                </h2>
                                <Link
                                    to="/courses"
                                    className="min-h-[44px] inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Browse All
                                </Link>
                            </div>

                            {(streak.currentStreak > 0 || achievementsUnlocked > 0) && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {streak.currentStreak > 0 && (
                                        <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Flame className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                                <span className="text-xs font-semibold text-gray-700 truncate">
                                                    Learning Streak
                                                </span>
                                            </div>
                                            <div className="text-lg sm:text-xl font-bold text-orange-600">
                                                {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
                                            </div>
                                        </div>
                                    )}
                                    {achievementsUnlocked > 0 && (
                                        <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Trophy className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                                <span className="text-xs font-semibold text-gray-700 truncate">
                                                    Achievements
                                                </span>
                                            </div>
                                            <div className="text-lg sm:text-xl font-bold text-yellow-600">
                                                {achievementsUnlocked} unlocked
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {totalEnrolled > 0 && (
                                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">
                                            Overall Progress
                                        </span>
                                        <span className="text-sm font-bold text-blue-600">
                                            {averageProgress}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                                            style={{ width: `${averageProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        {totalEnrolled} course{totalEnrolled !== 1 ? "s" : ""} enrolled • Progress saved automatically
                                    </p>
                                </div>
                            )}

                            <div className="mb-4">
                                <StudentProfileCard />
                            </div>

                            {(() => {
                                const lastActive = getLastActivityText();
                                if (lastActive !== "Today" && lastActive !== "Never") {
                                    return (
                                        <div className="mb-4">
                                            <EmptyState type="welcome-back" lastActive={lastActive} />
                                        </div>
                                    );
                                }
                                return null;
                            })()}

                            <div className="mb-4">
                                <WeeklyGoalCard />
                            </div>

                            <div className="mb-4">
                                <BadgeDisplay />
                            </div>

                            <div className="space-y-4">
                                {enrolledCourses.length === 0 ? (
                                    <EmptyState type="no-courses" />
                                ) : (
                                    enrolledCourses.map(({ course, progress }) => (
                                        <div
                                            key={course.id}
                                            className="bg-gray-50/80 border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <h4 className="font-bold text-gray-900 text-base truncate">
                                                            {course.title}
                                                        </h4>
                                                        {progress.isCompleted && (
                                                            <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500">{course.difficulty}</p>
                                                </div>
                                                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded flex-shrink-0">
                                                    {progress.percentage}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${progress.percentage}%` }}
                                                />
                                            </div>
                                            <div className="flex flex-wrap justify-between items-center gap-2">
                                                <span className="text-xs text-gray-600">
                                                    {progress.completed} of {progress.total} lessons
                                                </span>
                                                <Link
                                                    to={`/course/${course.id}/learn`}
                                                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    <Play className="w-4 h-4" />
                                                    {progress.isCompleted ? "Review" : "Continue"}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-6 sm:mt-8">
                                <LearningJourneyTimeline />
                            </div>
                        </div>
                    </div>

                    {/* Weekly Challenges - sidebar on desktop */}
                    <div className="lg:col-span-3 xl:col-span-2 order-2 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 sticky top-[calc(var(--navbar-height)+1rem)]">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                                Weekly Challenges
                            </h3>
                            <div className="mb-4 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FA8F3F] pointer-events-none">
                                    <Search className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search challenges..."
                                    className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b8f86] focus:border-[#0b8f86] transition placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-3 max-h-[280px] overflow-y-auto">
                                {weeklyChallenges.map((it, idx) => (
                                    <div key={idx}>
                                        <p className="text-sm mb-1 text-gray-700">{it.title}</p>
                                        <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.max(3, it.progress * 100)}%`,
                                                    background:
                                                        it.progress > 0.5
                                                            ? "linear-gradient(90deg, #36a2ff, #00c0ff)"
                                                            : "linear-gradient(90deg, #ff9f52, #ff7b36)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="mt-4 w-full min-h-[44px] text-white font-semibold rounded-xl bg-[#0b8f86] hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#0b8f86] focus:ring-offset-2"
                            >
                                View All
                            </button>
                        </div>
                    </div>

                    {/* Leaderboard - sidebar on desktop */}
                    <div className="lg:col-span-2 xl:col-span-2 order-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 overflow-hidden">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                                    Leaderboard
                                </h3>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MessageSquare className="w-4 h-4" />
                                    <Search className="w-4 h-4 hidden sm:block" />
                                    <Bookmark className="w-4 h-4 hidden sm:block" />
                                </div>
                            </div>
                            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                                {leaderboard.map((u, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                                                <img
                                                    src={`https://i.pravatar.cc/150?img=${u.img}`}
                                                    alt={u.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm text-gray-800 truncate">
                                                    {u.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {Math.floor(u.pts / 3)} pts
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-[#00bfa6] font-bold text-sm flex-shrink-0">
                                            {u.pts}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamifiedDashboard;
