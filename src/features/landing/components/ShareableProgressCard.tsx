// import React, { useState } from "react";
// import { Share2, Copy, Check, Trophy } from "lucide-react";
// import { Course } from "../data/coursesData";
// import { getProgressSummary } from "../../../shared/utils/progress";
// import { getStudentProfile } from "../../../shared/utils/studentProfile";
// import { getStreak } from "../../../shared/utils/streak";

// interface ShareableProgressCardProps {
//     course: Course;
//     progress: ReturnType<typeof getProgressSummary>;
// }

// const ShareableProgressCard: React.FC<ShareableProgressCardProps> = ({ course, progress }) => {
//     const [copied, setCopied] = useState(false);
//     const profile = getStudentProfile();
//     const streak = getStreak();

//     const shareText = progress.isCompleted
//         ? `🎉 I just completed "${course.title}" on SmarterTeens! ${streak.currentStreak > 0 ? `🔥 ${streak.currentStreak}-day learning streak!` : ""}`
//         : `📚 I'm ${progress.percentage}% through "${course.title}" on SmarterTeens! ${streak.currentStreak > 0 ? `🔥 ${streak.currentStreak}-day learning streak!` : ""}`;

//     const handleCopy = async () => {
//         try {
//             await navigator.clipboard.writeText(shareText);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         } catch (error) {
//             console.error("Failed to copy:", error);
//         }
//     };

//     return (
//         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
//             <div className="flex items-center gap-3 mb-4">
//                 <Share2 className="w-5 h-5 text-blue-600" />
//                 <h3 className="text-lg font-semibold text-gray-900">Share Your Progress</h3>
//             </div>

//             {/* Shareable Card Preview */}
//             <div className="bg-white rounded-lg p-5 mb-4 shadow-sm border border-gray-200">
//                 <div className="flex items-center gap-3 mb-3">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
//                         {profile.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div>
//                         <p className="font-semibold text-gray-900">{profile.name}</p>
//                         <p className="text-xs text-gray-500">SmarterTeens Learner</p>
//                     </div>
//                 </div>
//                 <div className="mb-3">
//                     <p className="text-sm text-gray-700 mb-2">{course.title}</p>
//                     <div className="flex items-center gap-2 mb-2">
//                         {progress.isCompleted ? (
//                             <>
//                                 <Trophy className="w-5 h-5 text-yellow-600" />
//                                 <span className="text-sm font-semibold text-gray-900">Course Completed!</span>
//                             </>
//                         ) : (
//                             <>
//                                 <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div
//                                         className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
//                                         style={{ width: `${progress.percentage}%` }}
//                                     />
//                                 </div>
//                                 <span className="text-sm font-semibold text-gray-900">{progress.percentage}%</span>
//                             </>
//                         )}
//                     </div>
//                     {streak.currentStreak > 0 && (
//                         <p className="text-xs text-orange-600 font-medium">
//                             🔥 {streak.currentStreak}-day learning streak
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* Copy Button */}
//             <button
//                 onClick={handleCopy}
//                 className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
//             >
//                 {copied ? (
//                     <>
//                         <Check className="w-5 h-5" />
//                         Copied!
//                     </>
//                 ) : (
//                     <>
//                         <Copy className="w-5 h-5" />
//                         Copy Progress Text
//                     </>
//                 )}
//             </button>

//             <p className="text-xs text-gray-500 text-center mt-3">
//                 Share your learning journey with friends and family
//             </p>
//         </div>
//     );
// };

// export default ShareableProgressCard;


import React, { useState } from "react";
import { Share2, Copy, Check, Trophy } from "lucide-react";
import type { Course } from "../data/coursesData";
import { getProgressSummary } from "../../../shared/utils/progress";
import { getStudentProfile } from "../../../shared/utils/studentProfile";
import { getStreak } from "../../../shared/utils/streak";

interface ShareableProgressCardProps {
    course: Course;
    progress: ReturnType<typeof getProgressSummary>;
}

const ShareableProgressCard: React.FC<ShareableProgressCardProps> = ({ course, progress }) => {
    const [copied, setCopied] = useState(false);
    const profile = getStudentProfile();
    const streak = getStreak();

    const shareText = progress.isCompleted
        ? `🎉 I just completed "${course.title}" on SmarterTeens! ${
              streak.currentStreak > 0 ? `🔥 ${streak.currentStreak}-day learning streak!` : ""
          }`
        : `📚 I'm ${progress.percentage}% through "${course.title}" on SmarterTeens! ${
              streak.currentStreak > 0 ? `🔥 ${streak.currentStreak}-day learning streak!` : ""
          }`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy progress text:", error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Share Your Progress
                </h3>
            </div>

            {/* Shareable Preview */}
            <div className="bg-white rounded-lg p-5 mb-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                        {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{profile.name}</p>
                        <p className="text-xs text-gray-500">SmarterTeens Learner</p>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-2">{course.title}</p>

                    <div className="flex items-center gap-2 mb-2">
                        {progress.isCompleted ? (
                            <>
                                <Trophy className="w-5 h-5 text-yellow-600" />
                                <span className="text-sm font-semibold text-gray-900">
                                    Course Completed
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                                        style={{ width: `${progress.percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                    {progress.percentage}%
                                </span>
                            </>
                        )}
                    </div>

                    {streak.currentStreak > 0 && (
                        <p className="text-xs text-orange-600 font-medium">
                            🔥 {streak.currentStreak}-day learning streak
                        </p>
                    )}
                </div>
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {copied ? (
                    <>
                        <Check className="w-5 h-5" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy className="w-5 h-5" />
                        Copy Progress Text
                    </>
                )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
                Share your learning journey with friends and family
            </p>
        </div>
    );
};

export default ShareableProgressCard;
