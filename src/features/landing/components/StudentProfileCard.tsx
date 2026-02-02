import React, { useState } from "react";
import { Target, Edit2, Check, X } from "lucide-react";
import { getStudentProfile, updateStudentProfile, getLearningStats } from "../../../shared/utils/studentProfile";
import { getStreak } from "../../../shared/utils/streak";

const StudentProfileCard: React.FC = () => {
    const profile = getStudentProfile();
    const stats = getLearningStats();
    const streak = getStreak();
    
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingFocus, setIsEditingFocus] = useState(false);
    const [name, setName] = useState(profile.name);
    const [learningFocus, setLearningFocus] = useState(profile.learningFocus);

    const handleSaveName = () => {
        if (name.trim()) {
            updateStudentProfile({ name: name.trim() });
            setIsEditingName(false);
        }
    };

    const handleSaveFocus = () => {
        if (learningFocus.trim()) {
            updateStudentProfile({ learningFocus: learningFocus.trim() });
            setIsEditingFocus(false);
        }
    };

    const learningFocusOptions = [
        "Future Software Engineer",
        "Future Data Scientist",
        "Future Designer",
        "Future Entrepreneur",
        "Future AI Engineer",
        "Future Product Manager",
        "Future Learner",
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    {isEditingName ? (
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveName();
                                    if (e.key === "Escape") {
                                        setName(profile.name);
                                        setIsEditingName(false);
                                    }
                                }}
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                            <button
                                onClick={handleSaveName}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                aria-label="Save name"
                            >
                                <Check className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setName(profile.name);
                                    setIsEditingName(false);
                                }}
                                className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                aria-label="Cancel"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                            <button
                                onClick={() => setIsEditingName(true)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                aria-label="Edit name"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {isEditingFocus ? (
                        <div className="flex items-center gap-2">
                            <select
                                value={learningFocus}
                                onChange={(e) => setLearningFocus(e.target.value)}
                                onBlur={handleSaveFocus}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveFocus();
                                    if (e.key === "Escape") {
                                        setLearningFocus(profile.learningFocus);
                                        setIsEditingFocus(false);
                                    }
                                }}
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            >
                                {learningFocusOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleSaveFocus}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                aria-label="Save focus"
                            >
                                <Check className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setLearningFocus(profile.learningFocus);
                                    setIsEditingFocus(false);
                                }}
                                className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                aria-label="Cancel"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-600">{profile.learningFocus}</span>
                            <button
                                onClick={() => setIsEditingFocus(true)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                aria-label="Edit learning focus"
                            >
                                <Edit2 className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.coursesEnrolled}</div>
                    <div className="text-xs text-gray-600 mt-1">Courses</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.coursesCompleted}</div>
                    <div className="text-xs text-gray-600 mt-1">Completed</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{streak.currentStreak}</div>
                    <div className="text-xs text-gray-600 mt-1">Day Streak</div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfileCard;
