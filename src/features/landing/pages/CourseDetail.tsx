import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, Users, Star, BookOpen, CheckCircle, Trophy } from "lucide-react";
import { getCourseById } from "../data/coursesData";
import { getProgressSummary } from "../../../shared/utils/progress";
import CourseCompletionBanner from "../components/CourseCompletionBanner";
import LearnersLikeYou from "../components/LearnersLikeYou";
import ShareableProgressCard from "../components/ShareableProgressCard";

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const courseId = id ? Number(id) : null;
    const course = courseId ? getCourseById(courseId) : null;

    // Check enrollment
    const [isEnrolled, setIsEnrolled] = React.useState(false);
    const progress = courseId && course
        ? getProgressSummary(courseId, course.modules.flatMap(m => m.lessons).length)
        : null;

    React.useEffect(() => {
        if (!courseId) return;
        try {
            const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
            setIsEnrolled(enrolledCourses.includes(courseId.toString()));
        } catch (error) {
            console.error("Failed to check enrollment:", error);
        }
    }, [courseId]);

    const handleEnroll = () => {
        if (!courseId) return;
        try {
            const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
            if (!enrolledCourses.includes(courseId.toString())) {
                enrolledCourses.push(courseId.toString());
                localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
                setIsEnrolled(true);
                navigate(`/course/${courseId}/learn`);
            }
        } catch (error) {
            console.error("Failed to enroll:", error);
        }
    };

    if (!course) {
        return (
            <div className="min-h-[60vh] bg-gray-50 px-4 py-12 sm:py-16 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Course not found</h1>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        The course you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        to="/courses"
                        className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-blue-600 hover:text-blue-700 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Browse all courses
                    </Link>
                </div>
            </div>
        );
    }

    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const isCompleted = progress?.isCompleted || false;

    return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                    {/* Course Completion Banner */}
                    {isCompleted && course && (
                        <CourseCompletionBanner course={course} />
                    )}
                    {/* Hero Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8 animate-in fade-in duration-200">
                        <div
                            className="h-64 md:h-80 bg-cover bg-center relative"
                            style={{ backgroundImage: `url('${course.image}')` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 text-white">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 leading-tight">
                                    {course.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-100 max-w-3xl leading-relaxed">
                                    {course.description}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            {/* Course Stats */}
                            <div className="flex flex-wrap gap-6 md:gap-8 mb-8">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span className="text-base">{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BookOpen className="w-5 h-5 text-gray-400" />
                                    <span className="text-base">{totalLessons} lessons</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    <span className="text-base">
                                        {course.studentsEnrolled.toLocaleString()} students
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-base font-semibold">{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                                            course.difficulty === "Beginner"
                                                ? "bg-green-100 text-green-800"
                                                : course.difficulty === "Intermediate"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {course.difficulty}
                                    </span>
                                </div>
                            </div>

                            {/* Social Proof */}
                            <LearnersLikeYou 
                                studentsEnrolled={course.studentsEnrolled}
                                averageCompletionTime="4 weeks"
                            />

                            {/* Completion Badge */}
                            {isCompleted && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Trophy className="w-6 h-6 text-yellow-600" />
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                Course Completed!
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                You've completed all {totalLessons} lessons. Review any lesson anytime.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Shareable Progress Card */}
                            {isEnrolled && progress && (
                                <div className="mb-6">
                                    <ShareableProgressCard course={course} progress={progress} />
                                </div>
                            )}

                            {/* Progress Bar (if enrolled) */}
                            {isEnrolled && progress && !isCompleted && (
                                <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-gray-900">
                                            Your Progress
                                        </span>
                                        <span className="text-sm font-bold text-blue-600">
                                            {progress.percentage}% Complete
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        {progress.completed} of {progress.total} lessons completed. Your
                                        progress is saved automatically.
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {isEnrolled ? (
                                    <>
                                        <Link
                                            to={`/course/${courseId}/learn`}
                                            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            {isCompleted ? (
                                                <>
                                                    <Trophy className="w-5 h-5" />
                                                    Review Course
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    Continue Learning
                                                </>
                                            )}
                                        </Link>
                                        <Link
                                            to="/courses"
                                            className="min-h-[48px] inline-flex items-center justify-center px-6 sm:px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                        >
                                            Browse More Courses
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleEnroll}
                                            className="min-h-[48px] inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Enroll Now
                                        </button>
                                        <Link
                                            to="/courses"
                                            className="min-h-[48px] inline-flex items-center justify-center px-6 sm:px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                        >
                                            Back to Courses
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Course Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8 animate-in fade-in duration-200 delay-75">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                            Course Curriculum
                        </h2>
                        <div className="space-y-6">
                            {course.modules.map((module, mIdx) => (
                                <div
                                    key={module.id}
                                    className="border border-gray-200 rounded-xl p-6 md:p-8 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                                                Module {mIdx + 1}: {module.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {module.description}
                                            </p>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium ml-4">
                                            {module.lessons.length} lessons
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {module.lessons.map((lesson, lIdx) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                                    {lIdx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 mb-1">
                                                        {lesson.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {lesson.type.charAt(0).toUpperCase() +
                                                            lesson.type.slice(1)} • {lesson.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructor Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 animate-in fade-in duration-200 delay-150">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            About the Instructor
                        </h2>
                        <div className="flex items-start gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                {course.instructor
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {course.instructor}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Experienced educator with expertise in{" "}
                                    {course.difficulty.toLowerCase()} level courses. Dedicated to helping
                                    students achieve their learning goals through structured, engaging
                                    content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CourseDetail;
