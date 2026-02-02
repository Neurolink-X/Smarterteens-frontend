import React from "react";
import { Lock } from "lucide-react";

interface LockedLessonMessageProps {
    onClose: () => void;
}

const LockedLessonMessage: React.FC<LockedLessonMessageProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl animate-in slide-in-left">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Lesson Locked</h3>
                </div>
                <p className="text-gray-600 mb-6">
                    Complete the previous lesson to unlock this one. Keep learning to progress through the course!
                </p>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default LockedLessonMessage;
