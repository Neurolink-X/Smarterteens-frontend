import React, { useEffect } from "react";
import { Trophy, X } from "lucide-react";

interface AchievementToastProps {
    achievementName: string;
    onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievementName, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 max-w-sm">
                <Trophy className="w-6 h-6 flex-shrink-0" />
                <div className="flex-1">
                    <div className="font-semibold">Achievement Unlocked!</div>
                    <div className="text-sm opacity-90">{achievementName}</div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AchievementToast;
