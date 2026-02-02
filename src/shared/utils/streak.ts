// Learning streak tracking utilities

export type StreakData = {
    currentStreak: number;
    lastActivityDate: string; // YYYY-MM-DD format
    longestStreak: number;
};

const STREAK_KEY = "learningStreak";

// Get today's date in YYYY-MM-DD format
const getToday = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

// Get yesterday's date
const getYesterday = (): string => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
};

// Get streak data
export const getStreak = (): StreakData => {
    try {
        const stored = localStorage.getItem(STREAK_KEY);
        if (!stored) {
            return {
                currentStreak: 0,
                lastActivityDate: "",
                longestStreak: 0,
            };
        }
        return JSON.parse(stored);
    } catch {
        return {
            currentStreak: 0,
            lastActivityDate: "",
            longestStreak: 0,
        };
    }
};

// Update streak when a lesson is completed
export const updateStreak = (): void => {
    const today = getToday();
    const streak = getStreak();

    // If last activity was today, don't increment (already counted)
    if (streak.lastActivityDate === today) {
        return;
    }

    // If last activity was yesterday, continue streak
    if (streak.lastActivityDate === getYesterday()) {
        streak.currentStreak += 1;
    } else {
        // If last activity was more than 1 day ago, reset streak
        streak.currentStreak = 1;
    }

    // Update longest streak if current is longer
    if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
    }

    streak.lastActivityDate = today;

    try {
        localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
    } catch (error) {
        console.error("Failed to save streak:", error);
    }
};

// Check if user has activity today
export const hasActivityToday = (): boolean => {
    const streak = getStreak();
    return streak.lastActivityDate === getToday();
};
