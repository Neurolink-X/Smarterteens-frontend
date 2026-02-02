// Weekly goal tracking utilities

export type WeeklyGoalData = {
    goal: number; // lessons per week
    completed: number; // lessons completed this week
    weekStart: string; // YYYY-MM-DD
};

const WEEKLY_GOAL_KEY = "weeklyGoal";
const DEFAULT_GOAL = 3; // 3 lessons per week

// Get start of current week (Monday)
const getWeekStart = (): string => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split("T")[0];
};

// Get weekly goal data
export const getWeeklyGoal = (): WeeklyGoalData => {
    try {
        const stored = localStorage.getItem(WEEKLY_GOAL_KEY);
        if (!stored) {
            return {
                goal: DEFAULT_GOAL,
                completed: 0,
                weekStart: getWeekStart(),
            };
        }
        const data: WeeklyGoalData = JSON.parse(stored);
        const currentWeekStart = getWeekStart();
        
        // If it's a new week, reset completed count
        if (data.weekStart !== currentWeekStart) {
            return {
                goal: data.goal || DEFAULT_GOAL,
                completed: 0,
                weekStart: currentWeekStart,
            };
        }
        
        return data;
    } catch {
        return {
            goal: DEFAULT_GOAL,
            completed: 0,
            weekStart: getWeekStart(),
        };
    }
};

// Increment weekly goal progress
export const incrementWeeklyGoal = (): void => {
    const data = getWeeklyGoal();
    data.completed += 1;
    
    try {
        localStorage.setItem(WEEKLY_GOAL_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save weekly goal:", error);
    }
};

// Set weekly goal
export const setWeeklyGoal = (goal: number): void => {
    const data = getWeeklyGoal();
    data.goal = goal;
    
    try {
        localStorage.setItem(WEEKLY_GOAL_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save weekly goal:", error);
    }
};

// Get last activity date (formatted)
export const getLastActivityText = (): string => {
    const streak = JSON.parse(localStorage.getItem("learningStreak") || "{}");
    if (!streak.lastActivityDate) return "Never";
    
    const lastDate = new Date(streak.lastActivityDate);
    const today = new Date();
    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return lastDate.toLocaleDateString();
};
