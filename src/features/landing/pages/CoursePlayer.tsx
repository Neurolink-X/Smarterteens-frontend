import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Check, Lock, Play, ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { getCourseById, getAllLessonsForCourse } from "../data/coursesData";
import {
    completeLesson,
    setCurrentLesson,
    isLessonUnlocked,
    updateProgressPercentage,
    getResumeLessonId,
    isCourseCompleted,
    type CourseProgress,
} from "../../../shared/utils/progress";
import { updateStreak, getStreak } from "../../../shared/utils/streak";
import { getWeeklyGoal, incrementWeeklyGoal } from "../../../shared/utils/weeklyGoal";
import {
    checkAchievements,
    checkStreakAchievement,
    ACHIEVEMENT_DEFINITIONS,
} from "../../../shared/utils/achievements";
import { Flame, Target, List } from "lucide-react";
import AchievementToast from "../components/AchievementToast";
import LockedLessonMessage from "../components/LockedLessonMessage";

const CoursePlayer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const courseId = id ? Number(id) : null;

    const course = courseId ? getCourseById(courseId) : null;
    const allLessons = courseId ? getAllLessonsForCourse(courseId) : [];

    // Check enrollment
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showAchievement, setShowAchievement] = useState<string | null>(null);
    const [showLockedMessage, setShowLockedMessage] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!courseId) return;
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        setIsEnrolled(enrolledCourses.includes(courseId.toString()));
    }, [courseId]);

    // Get resume lesson or start from beginning
    const resumeLessonId = courseId && allLessons.length > 0 
        ? getResumeLessonId(courseId, allLessons) 
        : null;
    const initialLessonIndex = resumeLessonId && allLessons.length > 0
        ? allLessons.findIndex(l => l.id === resumeLessonId)
        : 0;

    const [currentLessonIndex, setCurrentLessonIndex] = useState(
        initialLessonIndex >= 0 && initialLessonIndex < allLessons.length ? initialLessonIndex : 0
    );
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

    // Load progress on mount
    useEffect(() => {
        if (!courseId || allLessons.length === 0) return;

        try {
            const progress = JSON.parse(
                localStorage.getItem("courseProgress") || "{}"
            ) as Record<number, CourseProgress>;

            const courseProgress = progress[courseId];
            if (courseProgress) {
                setCompletedLessons(new Set(courseProgress.completedLessons));
                updateProgressPercentage(courseId, allLessons.length);
            }
        } catch (error) {
            console.error("Failed to load progress:", error);
        }
    }, [courseId, allLessons.length]);

    // Redirect if course not found or not enrolled
    useEffect(() => {
        if (!course || !courseId) {
            navigate("/courses", { replace: true });
            return;
        }
        if (!isEnrolled) {
            navigate(`/course/${courseId}`, { replace: true });
        }
    }, [course, courseId, isEnrolled, navigate]);

    // Handle achievement display
    useEffect(() => {
        if (showAchievement) {
            const timer = setTimeout(() => setShowAchievement(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [showAchievement]);

    if (!course || !courseId || allLessons.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">Course not found</h2>
                    <p className="text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
                    <Link
                        to="/courses"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    if (!isEnrolled) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">Course Not Enrolled</h2>
                    <p className="text-gray-400 mb-6">
                        Please enroll in this course to start learning.
                    </p>
                    <Link
                        to={`/course/${courseId}`}
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                        Go to Course Details
                    </Link>
                </div>
            </div>
        );
    }

    const currentLesson = allLessons[currentLessonIndex];
    const actualProgressPercentage = Math.round(
        (completedLessons.size / allLessons.length) * 100
    );
    const isCompleted = isCourseCompleted(courseId, allLessons.length);
    const wasFirstLesson = completedLessons.size === 0;

    const handleNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            const nextIndex = currentLessonIndex + 1;
            if (nextIndex >= allLessons.length) return;

            const nextLesson = allLessons[nextIndex];
            if (!nextLesson) return;

            // Check if next lesson is unlocked
            if (!isLessonUnlocked(courseId, nextLesson.id, allLessons)) {
                setShowLockedMessage(true);
                return; // Can't proceed to locked lesson
            }

            setCurrentLessonIndex(nextIndex);
            setCurrentLesson(courseId, nextLesson.id);
            // Scroll to top on lesson change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentLessonIndex > 0) {
            const prevIndex = currentLessonIndex - 1;
            setCurrentLessonIndex(prevIndex);
            const prevLesson = allLessons[prevIndex];
            if (prevLesson) {
                setCurrentLesson(courseId, prevLesson.id);
            }
        }
    };

    const handleCompleteLesson = () => {
        if (!currentLesson) return;

        const wasCompleted = completedLessons.has(currentLesson.id);
        if (wasCompleted) return; // Already completed

        // Mark as completed
        completeLesson(courseId, currentLesson.id);
        const newCompleted = new Set([...completedLessons, currentLesson.id]);
        setCompletedLessons(newCompleted);
        updateProgressPercentage(courseId, allLessons.length);

        // Update streak and weekly goal
        updateStreak();
        incrementWeeklyGoal();
        const streak = getStreak();
        checkStreakAchievement(streak.currentStreak);

        // Check achievements
        const unlocked = checkAchievements(
            newCompleted.size,
            allLessons.length,
            wasFirstLesson
        );

        if (unlocked.length > 0) {
            const achievement = ACHIEVEMENT_DEFINITIONS[unlocked[0] as keyof typeof ACHIEVEMENT_DEFINITIONS];
            if (achievement) {
                setShowAchievement(achievement.name);
            }
        }

        // Auto-advance to next lesson if available and unlocked
        if (currentLessonIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentLessonIndex + 1];
            if (nextLesson && isLessonUnlocked(courseId, nextLesson.id, allLessons)) {
                setTimeout(() => {
                    handleNext();
                }, 500);
            }
        }
    };

    const handleLessonClick = (_lessonId: string, lessonIndex: number) => {
        if (lessonIndex < 0 || lessonIndex >= allLessons.length) return;
        const lesson = allLessons[lessonIndex];
        if (!lesson) return;

        if (!isLessonUnlocked(courseId, lesson.id, allLessons)) {
            setShowLockedMessage(true);
            return; // Don't allow clicking locked lessons
        }

        setCurrentLessonIndex(lessonIndex);
        setCurrentLesson(courseId, lesson.id);
        // Scroll to top on lesson change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Group lessons by module for sidebar
    let lessonGlobalIndex = 0;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Achievement Toast */}
            {showAchievement && (
                <AchievementToast
                    achievementName={showAchievement}
                    onClose={() => setShowAchievement(null)}
                />
            )}

            {/* Locked Lesson Message */}
            {showLockedMessage && (
                <LockedLessonMessage onClose={() => setShowLockedMessage(false)} />
            )}

            {/* Header */}
            <div className="h-14 sm:h-16 border-b border-gray-800 flex items-center justify-between px-3 sm:px-4 md:px-6 bg-gray-900 z-10 gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <Link
                        to={`/course/${courseId}`}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Back to course"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline ml-1">Back</span>
                    </Link>
                    <div className="hidden md:block min-w-0 flex-1">
                        <h1 className="font-bold text-lg truncate">{course.title}</h1>
                        <p className="text-sm text-gray-400 truncate">{currentLesson?.title}</p>
                    </div>
                </div>
                {/* Mobile: Contents button to open lesson list */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Open course contents"
                >
                    <List className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                    {/* Learning Streak & Weekly Goal */}
                    <div className="hidden md:flex items-center gap-3">
                        {(() => {
                            const streak = getStreak();
                            if (streak.currentStreak > 0) {
                                return (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                        <Flame className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm font-semibold text-orange-600">
                                            {streak.currentStreak}-day streak
                                        </span>
                                    </div>
                                );
                            }
                            return null;
                        })()}
                        {(() => {
                            const weeklyGoal = getWeeklyGoal();
                            const progress = Math.min((weeklyGoal.completed / weeklyGoal.goal) * 100, 100);
                            return (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <Target className="w-4 h-4 text-blue-500" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-blue-600">
                                            {weeklyGoal.completed}/{weeklyGoal.goal} this week
                                        </span>
                                        <div className="w-16 h-1 bg-blue-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-600 transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                    {isCompleted && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                            <Trophy className="w-3 h-3" />
                            Completed
                        </div>
                    )}
                    <span className="text-sm text-gray-400 hidden sm:inline">
                        {completedLessons.size} / {allLessons.length} completed
                    </span>
                    <div className="w-24 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-500 ease-out"
                            style={{ width: `${actualProgressPercentage}%` }}
                        />
                    </div>
                    <span className="text-sm font-semibold text-green-400 w-12 text-right">
                        {actualProgressPercentage}%
                    </span>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - desktop */}
                <div className="w-80 border-r border-gray-800 bg-gray-950 overflow-y-auto hidden lg:block flex-shrink-0">
                    <div className="p-4 font-bold text-gray-400 uppercase text-xs tracking-wider">
                        Course Content
                    </div>
                    {course.modules.map((module) => {
                        return (
                            <div key={module.id}>
                                <div className="px-4 py-3 bg-gray-900/50 text-sm font-semibold text-gray-300 border-y border-gray-800">
                                    {module.title}
                                </div>
                                <div>
                                    {module.lessons.map((lesson, lIdx) => {
                                        const globalIndex = lessonGlobalIndex++;
                                        if (globalIndex >= allLessons.length) return null;
                                        const isActive = globalIndex === currentLessonIndex;
                                        const isCompleted = completedLessons.has(lesson.id);
                                        const isUnlocked = isLessonUnlocked(courseId, lesson.id, allLessons);
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => handleLessonClick(lesson.id, globalIndex)}
                                                disabled={!isUnlocked}
                                                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-all duration-150 min-h-[44px] ${
                                                    isActive ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500" : isUnlocked ? "hover:bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50" : "opacity-50 cursor-not-allowed text-gray-600"
                                                }`}
                                                aria-label={`${lesson.title}${isCompleted ? " - Completed" : ""}${!isUnlocked ? " - Locked" : ""}`}
                                            >
                                                <div className="w-5 flex justify-center flex-shrink-0">
                                                    {isCompleted ? <Check className="w-4 h-4 text-green-400" /> : isActive ? <Play className="w-4 h-4" /> : !isUnlocked ? <Lock className="w-4 h-4" /> : <span className="text-xs opacity-50">{lIdx + 1}</span>}
                                                </div>
                                                <div className="flex-1 truncate text-left">{lesson.title}</div>
                                                <div className="text-xs opacity-50 flex-shrink-0">{lesson.duration}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile lesson list drawer */}
                {mobileMenuOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" aria-hidden onClick={() => setMobileMenuOpen(false)} />
                        <div className="fixed inset-y-0 left-0 w-full max-w-[320px] bg-gray-950 border-r border-gray-800 overflow-y-auto z-50 lg:hidden animate-slide-in-left">
                            <div className="sticky top-0 bg-gray-950 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                                <span className="font-bold text-gray-300 text-sm uppercase tracking-wider">Course Content</span>
                                <button type="button" onClick={() => setMobileMenuOpen(false)} className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800" aria-label="Close menu">✕</button>
                            </div>
                            <div className="pb-4 safe-area-pb">
                                {course.modules.map((module) => (
                                    <div key={module.id}>
                                        <div className="px-4 py-3 bg-gray-900/50 text-sm font-semibold text-gray-300 border-y border-gray-800">{module.title}</div>
                                        {module.lessons.map((lesson, lIdx) => {
                                            const gIdx = course.modules.slice(0, course.modules.indexOf(module)).reduce((a, m) => a + m.lessons.length, 0) + lIdx;
                                            if (gIdx >= allLessons.length) return null;
                                            const isActive = gIdx === currentLessonIndex;
                                            const isCompleted = completedLessons.has(lesson.id);
                                            const isUnlocked = isLessonUnlocked(courseId, lesson.id, allLessons);
                                            return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => { handleLessonClick(lesson.id, gIdx); setMobileMenuOpen(false); }}
                                                    disabled={!isUnlocked}
                                                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 min-h-[48px] ${
                                                        isActive ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500" : isUnlocked ? "hover:bg-gray-900 text-gray-300" : "opacity-50 cursor-not-allowed text-gray-600"
                                                    }`}
                                                >
                                                    <div className="w-5 flex-shrink-0">
                                                        {isCompleted ? <Check className="w-4 h-4 text-green-400" /> : isActive ? <Play className="w-4 h-4" /> : !isUnlocked ? <Lock className="w-4 h-4" /> : <span className="text-xs opacity-50">{lIdx + 1}</span>}
                                                    </div>
                                                    <div className="flex-1 truncate">{lesson.title}</div>
                                                    <span className="text-xs opacity-50 flex-shrink-0">{lesson.duration}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-black relative">
                    {/* Completion Banner */}
                    {isCompleted && (
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-b border-yellow-500/30 px-6 py-4 animate-in fade-in">
                            <div className="flex items-center gap-3 max-w-4xl mx-auto">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                                <div className="flex-1">
                                    <div className="font-semibold text-yellow-400">
                                        Course Completed!
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Congratulations on completing this course. You can review any lesson anytime.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
                        <div className="w-full max-w-4xl animate-in fade-in duration-200" key={currentLessonIndex}>
                            {/* Lesson Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                    <span>
                                        Module{" "}
                                        {course.modules.findIndex(m =>
                                            m.lessons.some(l => l.id === currentLesson?.id)
                                        ) + 1}
                                    </span>
                                    <span>•</span>
                                    <span>{currentLesson?.type.toUpperCase()}</span>
                                    <span>•</span>
                                    <span>{currentLesson?.duration}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                                    {currentLesson?.title}
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base">
                                    {currentLesson?.description}
                                </p>
                            </div>

                            {/* Content Area */}
                            <div className="aspect-video bg-gray-800 rounded-xl shadow-2xl flex flex-col items-center justify-center text-center p-8 border border-gray-700 mb-6">
                                {currentLesson?.type === "video" ? (
                                    <>
                                        <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
                                            <Play className="w-10 h-10 ml-1" />
                                        </div>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            {currentLesson.content ||
                                                "Video content is loading. Your progress is automatically saved as you complete each lesson."}
                                        </p>
                                    </>
                                ) : currentLesson?.type === "quiz" ? (
                                    <>
                                        <div className="w-20 h-20 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mb-6">
                                            <span className="text-3xl">📝</span>
                                        </div>
                                        <p className="text-gray-400 max-w-md mx-auto mb-4">
                                            {currentLesson.content ||
                                                "Complete this quiz to demonstrate your understanding and unlock the next lesson."}
                                        </p>
                                        <button
                                            onClick={handleCompleteLesson}
                                            disabled={completedLessons.has(currentLesson.id)}
                                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            {completedLessons.has(currentLesson.id)
                                                ? "Already Completed"
                                                : "Mark Quiz Complete"}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 rounded-full bg-orange-600/20 text-orange-400 flex items-center justify-center mb-6">
                                            <span className="text-3xl">📋</span>
                                        </div>
                                        <p className="text-gray-400 max-w-md mx-auto mb-4">
                                            {currentLesson.content ||
                                                "Apply what you've learned by completing this assignment. Submit your work to continue."}
                                        </p>
                                        <button
                                            onClick={handleCompleteLesson}
                                            disabled={completedLessons.has(currentLesson.id)}
                                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            {completedLessons.has(currentLesson.id)
                                                ? "Already Completed"
                                                : "Mark Assignment Complete"}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Lesson Actions */}
                            {currentLesson?.type === "video" && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleCompleteLesson}
                                        disabled={completedLessons.has(currentLesson.id)}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <Check className="w-5 h-5" />
                                        {completedLessons.has(currentLesson.id)
                                            ? "Already Completed"
                                            : "Mark as Complete"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="h-20 border-t border-gray-800 bg-gray-900 flex items-center justify-between px-4 md:px-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentLessonIndex === 0}
                            className="px-4 md:px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Previous lesson"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        <div className="text-sm text-gray-400 hidden md:block">
                            Lesson {currentLessonIndex + 1} of {allLessons.length}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={
                                currentLessonIndex >= allLessons.length - 1 ||
                                !isLessonUnlocked(
                                    courseId,
                                    allLessons[currentLessonIndex + 1]?.id || "",
                                    allLessons
                                )
                            }
                            className="px-4 md:px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={
                                currentLessonIndex >= allLessons.length - 1
                                    ? "Course complete"
                                    : "Next lesson"
                            }
                        >
                            <span className="hidden sm:inline">
                                {isCompleted
                                    ? "Review Course"
                                    : currentLessonIndex >= allLessons.length - 1
                                    ? "Course Complete!"
                                    : "Next Lesson"}
                            </span>
                            <span className="sm:hidden">Next</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
