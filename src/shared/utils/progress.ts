// Progress tracking utilities for course learning

export type CourseProgress = {
    courseId: number;
    completedLessons: string[]; // Array of lesson IDs
    currentLessonId: string | null; // Last accessed lesson
    lastAccessed: number; // Timestamp
    progressPercentage: number;
    enrolledAt?: string; // ISO date string
    completedAt?: string; // ISO date string
};

const STORAGE_KEY = "courseProgress";

// Get all progress data
export const getAllProgress = (): Record<number, CourseProgress> => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

// Get progress for a specific course
export const getCourseProgress = (courseId: number): CourseProgress | null => {
    if (!courseId || isNaN(courseId)) return null;
    const allProgress = getAllProgress();
    return allProgress[courseId] || null;
};

// Calculate progress percentage for a course
export const calculateProgress = (
    completedLessons: string[],
    totalLessons: number
): number => {
    if (totalLessons === 0) return 0;
    const percentage = Math.round((completedLessons.length / totalLessons) * 100);
    return Math.min(100, Math.max(0, percentage)); // Clamp between 0-100
};

// Mark a lesson as completed
export const completeLesson = (courseId: number, lessonId: string): void => {
    if (!courseId || !lessonId) return;
    const allProgress = getAllProgress();
    const courseProgress = allProgress[courseId] || {
        courseId,
        completedLessons: [],
        currentLessonId: null,
        lastAccessed: Date.now(),
        progressPercentage: 0,
    };

    if (!courseProgress.completedLessons.includes(lessonId)) {
        courseProgress.completedLessons.push(lessonId);
    }

    courseProgress.currentLessonId = lessonId;
    courseProgress.lastAccessed = Date.now();

    allProgress[courseId] = courseProgress;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
        console.error("Failed to save progress:", error);
    }
};

// Update current lesson (without marking as complete)
export const setCurrentLesson = (courseId: number, lessonId: string): void => {
    if (!courseId || !lessonId) return;
    const allProgress = getAllProgress();
    const courseProgress = allProgress[courseId] || {
        courseId,
        completedLessons: [],
        currentLessonId: null,
        lastAccessed: Date.now(),
        progressPercentage: 0,
    };

    courseProgress.currentLessonId = lessonId;
    courseProgress.lastAccessed = Date.now();

    allProgress[courseId] = courseProgress;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
        console.error("Failed to save progress:", error);
    }
};

// Update progress percentage for a course
export const updateProgressPercentage = (
    courseId: number,
    totalLessons: number
): void => {
    if (!courseId || totalLessons <= 0) return;
    const allProgress = getAllProgress();
    const courseProgress = allProgress[courseId];
    if (!courseProgress) return;

    courseProgress.progressPercentage = calculateProgress(
        courseProgress.completedLessons,
        totalLessons
    );

    allProgress[courseId] = courseProgress;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
        console.error("Failed to save progress:", error);
    }
};

// Check if a lesson is completed
export const isLessonCompleted = (courseId: number, lessonId: string): boolean => {
    if (!courseId || !lessonId) return false;
    const progress = getCourseProgress(courseId);
    if (!progress) return false;
    return progress.completedLessons.includes(lessonId);
};

// Check if a lesson is unlocked (previous lesson completed or is first lesson)
export const isLessonUnlocked = (
    courseId: number,
    lessonId: string,
    allLessons: Array<{ id: string }>
): boolean => {
    if (!courseId || !lessonId || !allLessons.length) return false;
    const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true; // First lesson is always unlocked
    if (lessonIndex === -1) return false;

    const previousLesson = allLessons[lessonIndex - 1];
    if (!previousLesson) return false;
    return isLessonCompleted(courseId, previousLesson.id);
};

// Get resume lesson ID for a course - finds first incomplete lesson
export const getResumeLessonId = (
    courseId: number,
    allLessons: Array<{ id: string }> = []
): string | null => {
    if (!courseId || !allLessons.length) return null;
    const progress = getCourseProgress(courseId);
    
    // If no progress, start from first lesson
    if (!progress) return allLessons[0]?.id || null;

    // Find first incomplete lesson
    const firstIncomplete = allLessons.find(
        lesson => !progress.completedLessons.includes(lesson.id)
    );

    // If all completed, return last lesson
    if (!firstIncomplete) {
        return allLessons[allLessons.length - 1]?.id || null;
    }

    // Prefer current lesson if it exists and is valid, otherwise first incomplete
    if (progress.currentLessonId && allLessons.some(l => l.id === progress.currentLessonId)) {
        return progress.currentLessonId;
    }

    return firstIncomplete.id;
};

// Check if course is completed (100%)
export const isCourseCompleted = (courseId: number, totalLessons: number): boolean => {
    if (!courseId || totalLessons <= 0) return false;
    const progress = getCourseProgress(courseId);
    if (!progress) return false;
    return progress.completedLessons.length >= totalLessons;
};

// Get progress summary for dashboard
export const getProgressSummary = (courseId: number, totalLessons: number) => {
    if (!courseId || totalLessons <= 0) {
        return {
            completed: 0,
            total: totalLessons,
            percentage: 0,
            currentLesson: null,
            isCompleted: false,
        };
    }

    const progress = getCourseProgress(courseId);
    if (!progress) {
        return {
            completed: 0,
            total: totalLessons,
            percentage: 0,
            currentLesson: null,
            isCompleted: false,
        };
    }

    const percentage = calculateProgress(progress.completedLessons, totalLessons);
    const isCompleted = progress.completedLessons.length >= totalLessons;

    return {
        completed: progress.completedLessons.length,
        total: totalLessons,
        percentage,
        currentLesson: progress.currentLessonId,
        isCompleted,
    };
};
