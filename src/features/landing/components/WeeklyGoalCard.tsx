import React from "react";
import { Target, TrendingUp } from "lucide-react";
import { getWeeklyGoal } from "../../../shared/utils/weeklyGoal";

const WeeklyGoalCard: React.FC = () => {
    const weeklyGoal = getWeeklyGoal();
    const progress = Math.min((weeklyGoal.completed / weeklyGoal.goal) * 100, 100);
    const isComplete = weeklyGoal.completed >= weeklyGoal.goal;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Weekly Goal</h3>
                        <p className="text-xs text-gray-500">Your goal: {weeklyGoal.goal} lessons this week</p>
                    </div>
                </div>
                {isComplete && (
                    <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-semibold">Complete!</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                        {weeklyGoal.completed} of {weeklyGoal.goal} lessons
                    </span>
                    <span className="font-semibold text-gray-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${
                            isComplete ? "bg-green-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {!isComplete && (
                    <p className="text-xs text-gray-500 mt-2">
                        {weeklyGoal.goal - weeklyGoal.completed} more to reach your goal. You've got this!
                    </p>
                )}
                {isComplete && (
                    <p className="text-xs text-green-600 mt-2 font-medium">
                        🎉 Great job! You've reached your weekly goal!
                    </p>
                )}
            </div>
        </div>
    );
};

export default WeeklyGoalCard;
