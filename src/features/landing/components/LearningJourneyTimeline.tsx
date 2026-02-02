import React from "react";
import { BookOpen, CheckCircle, Trophy, Calendar } from "lucide-react";
import { getCourseById } from "../data/coursesData";
import { getProgressSummary } from "../../../shared/utils/progress";
import { getStudentProfile } from "../../../shared/utils/studentProfile";

type TimelineEvent = {
    id: string;
    type: "enrolled" | "lesson_completed" | "course_completed";
    courseId: number;
    courseTitle: string;
    date: string;
    description: string;
};

const LearningJourneyTimeline: React.FC = () => {
    const profile = getStudentProfile();
    const enrolledIds = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    const progress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
    
    // Build timeline events
    const events: TimelineEvent[] = [];
    
    enrolledIds.forEach((id: string) => {
        const courseId = Number(id);
        const course = getCourseById(courseId);
        if (!course) return;

        const courseProgress = progress[courseId];
        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        const progressSummary = getProgressSummary(courseId, totalLessons);

        // Enrollment event
        events.push({
            id: `enrolled-${courseId}`,
            type: "enrolled",
            courseId,
            courseTitle: course.title,
            date: courseProgress?.enrolledAt || profile.createdAt,
            description: `Enrolled in ${course.title}`,
        });

        // Course completion event
        if (progressSummary.isCompleted) {
            events.push({
                id: `completed-${courseId}`,
                type: "course_completed",
                courseId,
                courseTitle: course.title,
                date: courseProgress?.completedAt || new Date().toISOString(),
                description: `Completed ${course.title}`,
            });
        }
    });

    // Sort by date (newest first)
    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const getEventIcon = (type: TimelineEvent["type"]) => {
        switch (type) {
            case "enrolled":
                return <BookOpen className="w-5 h-5 text-blue-600" />;
            case "course_completed":
                return <Trophy className="w-5 h-5 text-yellow-600" />;
            default:
                return <CheckCircle className="w-5 h-5 text-green-600" />;
        }
    };

    const getEventColor = (type: TimelineEvent["type"]) => {
        switch (type) {
            case "enrolled":
                return "bg-blue-100 border-blue-300";
            case "course_completed":
                return "bg-yellow-100 border-yellow-300";
            default:
                return "bg-green-100 border-green-300";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    if (events.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Learning Journey</h3>
                <p className="text-sm text-gray-600">
                    Your learning milestones will appear here as you progress through courses.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Learning Journey</h3>
            <div className="space-y-4">
                {events.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full ${getEventColor(event.type)} border-2 flex items-center justify-center flex-shrink-0`}>
                                {getEventIcon(event.type)}
                            </div>
                            {index < events.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-200 mt-2" />
                            )}
                        </div>

                        {/* Event content */}
                        <div className="flex-1 pb-4">
                            <div className="flex items-start justify-between mb-1">
                                <p className="text-sm font-semibold text-gray-900">{event.description}</p>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(event.date)}
                                </span>
                            </div>
                            <p className="text-xs text-gray-600">{event.courseTitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearningJourneyTimeline;
