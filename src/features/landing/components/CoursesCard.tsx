import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star, CheckCircle, Trophy } from "lucide-react";
import type { Course } from "../data/coursesData";
import { getProgressSummary } from "../../../shared/utils/progress";

type Props = {
    course: Course;
    variant?: "large" | "small";
};

const CourseCard: React.FC<Props> = ({ course, variant = "small" }) => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    const isEnrolled = enrolledCourses.includes(course.id.toString());
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const progress = isEnrolled
        ? getProgressSummary(course.id, totalLessons)
        : null;

    // LARGE VARIANT
    if (variant === "large") {
        return (
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row animate-in fade-in">
                <div className="w-full md:w-1/2 lg:w-1/2 lg:mr-5 md:mr-5 mr-3 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-52 sm:h-60 md:h-full object-cover object-center"
                    />
                </div>

                <div className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 mt-4 md:mt-0">
                    <div className="p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    {course.title}
                                </h2>
                                {isEnrolled && (
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                                {progress?.isCompleted && (
                                    <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-2">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {course.studentsEnrolled.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    {course.rating}
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mb-2">
                                Difficulty: {course.difficulty}
                            </p>
                            <p className="text-gray-700 mt-3 text-sm sm:text-base line-clamp-2">
                                {course.description}
                            </p>
                            
                            {/* Clear Outcomes Section */}
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs font-semibold text-gray-700 mb-2">What You'll Build:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">✓</span>
                                        <span>Real projects you can showcase</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">✓</span>
                                        <span>Skills employers actually want</span>
                                    </li>
                                </ul>
                                <div className="mt-2 pt-2 border-t border-blue-200">
                                    <span className="text-xs text-gray-500">
                                        Time: {course.duration} • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                                    </span>
                                </div>
                            </div>
                            
                            {isEnrolled && progress && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-600">
                                            Your Progress
                                        </span>
                                        <span className="text-xs font-semibold text-blue-600">
                                            {progress.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {isEnrolled ? (
                                <Link
                                    to={`/course/${course.id}/learn`}
                                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base inline-block flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {progress?.isCompleted ? (
                                        <>
                                            <Trophy className="w-4 h-4" />
                                            Review Course
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Continue Learning
                                        </>
                                    )}
                                </Link>
                            ) : (
                                <Link
                                    to={`/course/${course.id}`}
                                    className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base inline-block transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {course.primaryAction || "Enroll Now"}
                                </Link>
                            )}
                            <Link
                                to={`/course/${course.id}`}
                                className="px-3 sm:px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {course.secondaryAction || "Learn More"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // SMALL VARIANT
    return (
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 animate-in fade-in">
            {/* Image */}
            <div className="w-full md:w-1/4 lg:w-1/4 md:mr-5 rounded-xl overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-52 sm:h-60 md:h-full object-cover object-center"
                />
            </div>

            {/* Content */}
            <div className="w-full md:w-3/4 lg:w-3/4 p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {course.title}
                        </h2>
                        {isEnrolled && (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                        {progress?.isCompleted && (
                            <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.studentsEnrolled.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            {course.rating}
                        </span>
                        <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
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
                    <p className="text-gray-700 mt-2 text-sm sm:text-base line-clamp-2">
                        {course.description}
                    </p>
                    
                    {/* Clear Outcomes Section */}
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs font-semibold text-gray-700 mb-2">What You'll Build:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">✓</span>
                                <span>Real projects you can showcase</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">✓</span>
                                <span>Skills employers actually want</span>
                            </li>
                        </ul>
                        <div className="mt-2 pt-2 border-t border-blue-200">
                            <span className="text-xs text-gray-500">
                                Time: {course.duration} • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                            </span>
                        </div>
                    </div>
                    
                    {isEnrolled && progress && (
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-600">
                                    Progress
                                </span>
                                <span className="text-xs font-semibold text-blue-600">
                                    {progress.percentage}%
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                    {isEnrolled ? (
                        <Link
                            to={`/course/${course.id}/learn`}
                            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base inline-block flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {progress?.isCompleted ? (
                                <>
                                    <Trophy className="w-4 h-4" />
                                    Review
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Continue
                                </>
                            )}
                        </Link>
                    ) : (
                        <Link
                            to={`/course/${course.id}`}
                            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base inline-block transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {course.primaryAction || "Enroll Now"}
                        </Link>
                    )}
                    <Link
                        to={`/course/${course.id}`}
                        className="px-3 sm:px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {course.secondaryAction || "Learn More"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
