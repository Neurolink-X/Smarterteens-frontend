export type Course = {
    id: number;
    image: string;
    title: string;
    difficulty: string;
    description: string;
    primaryAction?: string;
    secondaryAction?: string;
};

export const courses: Course[] = [
    {
        id: 1,
        image: "/HomeImages/CourseInstructorImg1.webp",
        title: "Artificial Intelligence Basics",
        difficulty: "Beginner",
        description:
            "Learn the foundations of AI, including search, problem-solving, and machine learning concepts.",
        primaryAction: "Start Course",
        secondaryAction: "Learn More",
    },
    {
        id: 2,
        image: "/HomeImages/CourseInstructorImg2.webp",
        title: "Full-Stack Web Development",
        difficulty: "Intermediate",
        description:
            "Master React, Node.js, Express, and MongoDB to build powerful full-stack applications.",
        primaryAction: "Enroll Now",
        secondaryAction: "Learn More",
    },
    {
        id: 3,
        image: "/HomeImages/CourseInstructorImg1.webp",
        title: "Data Structures & Algorithms",
        difficulty: "Advanced",
        description:
            "Deep dive into algorithms, time complexity, and coding interview preparation with hands-on problems.",
        primaryAction: "Join Now",
        secondaryAction: "Learn More",
    },
];
