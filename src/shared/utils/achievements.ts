// Achievement tracking utilities

export type Achievement = {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: number;
};

const ACHIEVEMENTS_KEY = "achievements";

// Achievement definitions
export const ACHIEVEMENT_DEFINITIONS = {
    FIRST_LESSON: {
        id: "first_lesson",
        name: "Getting Started",
        description: "Complete your first lesson",
    },
    HALFWAY: {
        id: "halfway",
        name: "Halfway There",
        description: "Reach 50% progress in any course",
    },
    COURSE_COMPLETE: {
        id: "course_complete",
        name: "Course Master",
        description: "Complete an entire course",
    },
    STREAK_7: {
        id: "streak_7",
        name: "Week Warrior",
        description: "Maintain a 7-day learning streak",
    },
} as const;

// Get all achievements
export const getAchievements = (): Record<string, Achievement> => {
    try {
        const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

// Unlock an achievement
export const unlockAchievement = (achievementId: string): boolean => {
    const achievements = getAchievements();
    
    // Don't unlock if already unlocked
    if (achievements[achievementId]?.unlocked) {
        return false;
    }

    const definition = Object.values(ACHIEVEMENT_DEFINITIONS).find(
        a => a.id === achievementId
    );

    if (!definition) return false;

    achievements[achievementId] = {
        ...definition,
        unlocked: true,
        unlockedAt: Date.now(),
    };

    try {
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
        return true;
    } catch (error) {
        console.error("Failed to save achievement:", error);
        return false;
    }
};

// Check and unlock achievements based on progress
export const checkAchievements = (
    completedLessons: number,
    totalLessons: number,
    isFirstLesson: boolean
): string[] => {
    const unlocked: string[] = [];

    // First lesson achievement
    if (isFirstLesson) {
        if (unlockAchievement(ACHIEVEMENT_DEFINITIONS.FIRST_LESSON.id)) {
            unlocked.push(ACHIEVEMENT_DEFINITIONS.FIRST_LESSON.id);
        }
    }

    // Halfway achievement
    if (totalLessons > 0) {
        const progress = (completedLessons / totalLessons) * 100;
        if (progress >= 50 && progress < 100) {
            if (unlockAchievement(ACHIEVEMENT_DEFINITIONS.HALFWAY.id)) {
                unlocked.push(ACHIEVEMENT_DEFINITIONS.HALFWAY.id);
            }
        }
    }

    // Course complete achievement
    if (completedLessons >= totalLessons && totalLessons > 0) {
        if (unlockAchievement(ACHIEVEMENT_DEFINITIONS.COURSE_COMPLETE.id)) {
            unlocked.push(ACHIEVEMENT_DEFINITIONS.COURSE_COMPLETE.id);
        }
    }

    return unlocked;
};

// Check streak achievement
export const checkStreakAchievement = (currentStreak: number): boolean => {
    if (currentStreak >= 7) {
        return unlockAchievement(ACHIEVEMENT_DEFINITIONS.STREAK_7.id);
    }
    return false;
};

// Get unlocked achievements count
export const getUnlockedCount = (): number => {
    const achievements = getAchievements();
    return Object.values(achievements).filter(a => a.unlocked).length;
};
