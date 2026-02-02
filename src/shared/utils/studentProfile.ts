// Student profile utilities

export type StudentProfile = {
    name: string;
    learningFocus: string;
    createdAt: string; // ISO date
};

const PROFILE_KEY = "studentProfile";
const DEFAULT_NAME = "Student";
const DEFAULT_FOCUS = "Future Learner";

// Get student profile
export const getStudentProfile = (): StudentProfile => {
    try {
        const stored = localStorage.getItem(PROFILE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // Fall through to default
    }

    // Create default profile
    const defaultProfile: StudentProfile = {
        name: DEFAULT_NAME,
        learningFocus: DEFAULT_FOCUS,
        createdAt: new Date().toISOString(),
    };
    
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
    } catch {
        // Ignore if localStorage fails
    }

    return defaultProfile;
};

// Update student profile
export const updateStudentProfile = (updates: Partial<StudentProfile>): void => {
    const current = getStudentProfile();
    const updated = { ...current, ...updates };
    
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error("Failed to save profile:", error);
    }
};

// Get learning stats
export const getLearningStats = () => {
    const enrolledIds = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
    const progress = JSON.parse(localStorage.getItem("courseProgress") || "{}");
    
    let coursesCompleted = 0;
    let totalLessonsCompleted = 0;
    
    enrolledIds.forEach((id: string) => {
        const courseProgress = progress[Number(id)];
        if (courseProgress) {
            totalLessonsCompleted += courseProgress.completedLessons.length;
            if (courseProgress.percentage === 100) {
                coursesCompleted++;
            }
        }
    });

    return {
        coursesEnrolled: enrolledIds.length,
        coursesCompleted,
        totalLessonsCompleted,
    };
};
