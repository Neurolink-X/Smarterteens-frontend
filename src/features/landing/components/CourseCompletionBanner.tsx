// import React from "react";
// import { Link } from "react-router-dom";
// import { Trophy, ArrowRight, Sparkles } from "lucide-react";
// import { Course } from "../data/coursesData";
// import { courses } from "../data/coursesData";

// interface CourseCompletionBannerProps {
//     course: Course;
//     onDismiss?: () => void;
// }

// const CourseCompletionBanner: React.FC<CourseCompletionBannerProps> = ({ course, onDismiss }) => {
//     // Find next course to recommend
//     const currentIndex = courses.findIndex(c => c.id === course.id);
//     const nextCourse = currentIndex >= 0 && currentIndex < courses.length - 1 
//         ? courses[currentIndex + 1] 
//         : courses[0];

//     return (
//         <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mb-8 relative overflow-hidden">
//             {/* Decorative elements */}
//             <div className="absolute top-4 right-4 text-yellow-300">
//                 <Sparkles className="w-16 h-16 opacity-30" />
//             </div>
            
//             <div className="relative z-10">
//                 <div className="flex items-start gap-4 mb-6">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
//                         <Trophy className="w-8 h-8 text-white" />
//                     </div>
//                     <div className="flex-1">
//                         <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                             🎉 Course Completed!
//                         </h2>
//                         <p className="text-lg text-gray-700">
//                             Congratulations! You've successfully completed <span className="font-semibold">{course.title}</span>.
//                         </p>
//                     </div>
//                 </div>

//                 <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-6">
//                     <p className="text-sm text-gray-700 mb-3">
//                         <span className="font-semibold">What's next?</span> Keep building your skills with another course.
//                     </p>
//                     {nextCourse && (
//                         <Link
//                             to={`/course/${nextCourse.id}`}
//                             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                         >
//                             Explore Next Course
//                             <ArrowRight className="w-5 h-5" />
//                         </Link>
//                     )}
//                 </div>

//                 <div className="flex items-center gap-4 text-sm text-gray-600">
//                     <span>✓ All progress saved</span>
//                     <span>•</span>
//                     <span>✓ Certificate ready</span>
//                     <span>•</span>
//                     <span>✓ Skills unlocked</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourseCompletionBanner;


import React from "react";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight, Sparkles } from "lucide-react";
import type { Course } from "../data/coursesData";
import { courses } from "../data/coursesData";

interface CourseCompletionBannerProps {
    course: Course;
    onDismiss?: () => void;
}

const CourseCompletionBanner: React.FC<CourseCompletionBannerProps> = ({ course }) => {
    const currentIndex = courses.findIndex(c => c.id === course.id);
    const nextCourse =
        currentIndex >= 0 && currentIndex < courses.length - 1
            ? courses[currentIndex + 1]
            : courses[0];

    return (
        <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-yellow-300">
                <Sparkles className="w-16 h-16 opacity-30" />
            </div>

            <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            🎉 Course Completed!
                        </h2>
                        <p className="text-lg text-gray-700">
                            Congratulations! You've successfully completed{" "}
                            <span className="font-semibold">{course.title}</span>.
                        </p>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold">What's next?</span> Keep building your skills with another course.
                    </p>
                    {nextCourse && (
                        <Link
                            to={`/course/${nextCourse.id}`}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Explore Next Course
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>✓ All progress saved</span>
                    <span>•</span>
                    <span>✓ Certificate ready</span>
                    <span>•</span>
                    <span>✓ Skills unlocked</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCompletionBanner;
