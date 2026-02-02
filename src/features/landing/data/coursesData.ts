export type Lesson = {
    id: string;
    title: string;
    duration: string;
    type: "video" | "quiz" | "assignment";
    description: string;
    content?: string; // For video placeholder or quiz content
};

export type Module = {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
};

export type Course = {
    id: number;
    image: string;
    title: string;
    difficulty: string;
    description: string;
    instructor: string;
    duration: string;
    studentsEnrolled: number;
    rating: number;
    modules: Module[];
    primaryAction?: string;
    secondaryAction?: string;
};

// Comprehensive course data with full learning paths
export const courses: Course[] = [
    {
        id: 1,
        image: "/HomeImages/CourseInstructorImg1.webp",
        title: "Artificial Intelligence Basics",
        difficulty: "Beginner",
        description: "Learn the foundations of AI, including search, problem-solving, and machine learning concepts. Perfect for students starting their AI journey.",
        instructor: "Dr. Sarah Chen",
        duration: "8 weeks",
        studentsEnrolled: 1247,
        rating: 4.8,
        modules: [
            {
                id: "m1",
                title: "Introduction to AI",
                description: "Get started with the fundamentals of artificial intelligence",
                lessons: [
                    {
                        id: "l1-1",
                        title: "What is Artificial Intelligence?",
                        duration: "12:30",
                        type: "video",
                        description: "Explore the history and evolution of AI, from early concepts to modern applications.",
                        content: "This lesson introduces you to the world of AI, covering key concepts and real-world applications."
                    },
                    {
                        id: "l1-2",
                        title: "Types of AI Systems",
                        duration: "15:45",
                        type: "video",
                        description: "Learn about narrow AI, general AI, and the differences between machine learning and deep learning.",
                        content: "Understanding the different types of AI systems and their capabilities."
                    },
                    {
                        id: "l1-3",
                        title: "AI Ethics and Impact",
                        duration: "10:00",
                        type: "video",
                        description: "Discuss the ethical considerations and societal impact of AI technology.",
                        content: "Exploring the responsible development and use of AI systems."
                    },
                    {
                        id: "l1-4",
                        title: "Module 1 Quiz",
                        duration: "15m",
                        type: "quiz",
                        description: "Test your understanding of AI fundamentals",
                        content: "Complete this quiz to demonstrate your grasp of AI basics."
                    }
                ]
            },
            {
                id: "m2",
                title: "Problem Solving and Search",
                description: "Master algorithms for intelligent problem-solving",
                lessons: [
                    {
                        id: "l2-1",
                        title: "Search Algorithms Overview",
                        duration: "18:20",
                        type: "video",
                        description: "Introduction to search algorithms: breadth-first, depth-first, and A* search.",
                        content: "Learn how AI systems navigate problem spaces efficiently."
                    },
                    {
                        id: "l2-2",
                        title: "Implementing Search Algorithms",
                        duration: "22:15",
                        type: "video",
                        description: "Hands-on coding session: build your own search algorithm implementations.",
                        content: "Practical implementation of search algorithms in Python."
                    },
                    {
                        id: "l2-3",
                        title: "Heuristic Functions",
                        duration: "14:30",
                        type: "video",
                        description: "Understanding and designing effective heuristic functions for informed search.",
                        content: "Learn to design heuristics that guide search algorithms effectively."
                    },
                    {
                        id: "l2-4",
                        title: "Search Algorithm Assignment",
                        duration: "30m",
                        type: "assignment",
                        description: "Build a pathfinding solution using A* algorithm",
                        content: "Apply your knowledge to solve a real-world pathfinding problem."
                    }
                ]
            },
            {
                id: "m3",
                title: "Machine Learning Fundamentals",
                description: "Introduction to machine learning concepts and techniques",
                lessons: [
                    {
                        id: "l3-1",
                        title: "Introduction to Machine Learning",
                        duration: "16:45",
                        type: "video",
                        description: "What is machine learning? Supervised, unsupervised, and reinforcement learning.",
                        content: "Foundational concepts of machine learning and its applications."
                    },
                    {
                        id: "l3-2",
                        title: "Linear Regression",
                        duration: "20:00",
                        type: "video",
                        description: "Your first ML algorithm: understand and implement linear regression.",
                        content: "Step-by-step guide to building your first machine learning model."
                    },
                    {
                        id: "l3-3",
                        title: "Classification Basics",
                        duration: "19:30",
                        type: "video",
                        description: "Learn classification algorithms: decision trees, k-nearest neighbors.",
                        content: "Master the fundamentals of classification in machine learning."
                    },
                    {
                        id: "l3-4",
                        title: "ML Project: Predict Student Performance",
                        duration: "45m",
                        type: "assignment",
                        description: "Build a complete ML project from data collection to prediction",
                        content: "Apply machine learning to predict student academic performance."
                    }
                ]
            }
        ],
        primaryAction: "Start Course",
        secondaryAction: "Learn More",
    },
    {
        id: 2,
        image: "/HomeImages/CourseInstructorImg2.webp",
        title: "Full-Stack Web Development",
        difficulty: "Intermediate",
        description: "Master React, Node.js, Express, and MongoDB to build powerful full-stack applications. Build real projects and deploy them to production.",
        instructor: "Alex Rodriguez",
        duration: "12 weeks",
        studentsEnrolled: 2156,
        rating: 4.9,
        modules: [
            {
                id: "m1",
                title: "Frontend Foundations",
                description: "Master modern frontend development with React",
                lessons: [
                    {
                        id: "l1-1",
                        title: "React Fundamentals",
                        duration: "25:00",
                        type: "video",
                        description: "Components, JSX, props, and state management in React.",
                        content: "Build your first React application from scratch."
                    },
                    {
                        id: "l1-2",
                        title: "React Hooks Deep Dive",
                        duration: "28:15",
                        type: "video",
                        description: "useState, useEffect, useContext, and custom hooks.",
                        content: "Master React hooks for modern component development."
                    },
                    {
                        id: "l1-3",
                        title: "Routing with React Router",
                        duration: "18:30",
                        type: "video",
                        description: "Implement navigation and routing in single-page applications.",
                        content: "Create multi-page experiences with React Router."
                    },
                    {
                        id: "l1-4",
                        title: "Frontend Project: Todo App",
                        duration: "1h",
                        type: "assignment",
                        description: "Build a full-featured todo application with React",
                        content: "Apply your frontend skills to build a complete application."
                    }
                ]
            },
            {
                id: "m2",
                title: "Backend Development",
                description: "Build robust APIs with Node.js and Express",
                lessons: [
                    {
                        id: "l2-1",
                        title: "Node.js Basics",
                        duration: "20:00",
                        type: "video",
                        description: "Introduction to Node.js, npm, and the Node.js ecosystem.",
                        content: "Set up your backend development environment."
                    },
                    {
                        id: "l2-2",
                        title: "Express.js API Development",
                        duration: "32:00",
                        type: "video",
                        description: "Build RESTful APIs with Express: routes, middleware, error handling.",
                        content: "Create production-ready API endpoints."
                    },
                    {
                        id: "l2-3",
                        title: "Database Integration with MongoDB",
                        duration: "26:45",
                        type: "video",
                        description: "Connect to MongoDB, design schemas, and perform CRUD operations.",
                        content: "Integrate MongoDB into your Node.js applications."
                    },
                    {
                        id: "l2-4",
                        title: "Backend Project: REST API",
                        duration: "1.5h",
                        type: "assignment",
                        description: "Build a complete REST API with authentication",
                        content: "Create a secure, production-ready backend API."
                    }
                ]
            },
            {
                id: "m3",
                title: "Full-Stack Integration",
                description: "Connect frontend and backend into a complete application",
                lessons: [
                    {
                        id: "l3-1",
                        title: "Connecting React to Backend",
                        duration: "22:30",
                        type: "video",
                        description: "Make API calls from React, handle responses, and manage loading states.",
                        content: "Integrate your React frontend with your Node.js backend."
                    },
                    {
                        id: "l3-2",
                        title: "Authentication & Authorization",
                        duration: "35:00",
                        type: "video",
                        description: "Implement JWT-based authentication and protect routes.",
                        content: "Add secure authentication to your full-stack application."
                    },
                    {
                        id: "l3-3",
                        title: "Deployment Strategies",
                        duration: "24:15",
                        type: "video",
                        description: "Deploy your application to production: Vercel, Netlify, Heroku, AWS.",
                        content: "Learn to deploy full-stack applications to production."
                    },
                    {
                        id: "l3-4",
                        title: "Capstone Project: Social Media App",
                        duration: "3h",
                        type: "assignment",
                        description: "Build a complete social media application with all features",
                        content: "Apply everything you've learned to build a production-ready application."
                    }
                ]
            }
        ],
        primaryAction: "Enroll Now",
        secondaryAction: "Learn More",
    },
    {
        id: 3,
        image: "/HomeImages/CourseInstructorImg1.webp",
        title: "Data Structures & Algorithms",
        difficulty: "Advanced",
        description: "Deep dive into algorithms, time complexity, and coding interview preparation with hands-on problems. Master the skills needed for technical interviews.",
        instructor: "Prof. Michael Kim",
        duration: "10 weeks",
        studentsEnrolled: 892,
        rating: 4.7,
        modules: [
            {
                id: "m1",
                title: "Fundamental Data Structures",
                description: "Master arrays, linked lists, stacks, queues, and trees",
                lessons: [
                    {
                        id: "l1-1",
                        title: "Arrays and Dynamic Arrays",
                        duration: "19:45",
                        type: "video",
                        description: "Understanding arrays, dynamic arrays, and their time complexities.",
                        content: "Master the most fundamental data structure in programming."
                    },
                    {
                        id: "l1-2",
                        title: "Linked Lists",
                        duration: "23:30",
                        type: "video",
                        description: "Singly linked lists, doubly linked lists, and circular linked lists.",
                        content: "Learn when and how to use linked lists effectively."
                    },
                    {
                        id: "l1-3",
                        title: "Stacks and Queues",
                        duration: "17:20",
                        type: "video",
                        description: "Implement stacks and queues, understand their use cases.",
                        content: "Master LIFO and FIFO data structures."
                    },
                    {
                        id: "l1-4",
                        title: "Trees and Binary Trees",
                        duration: "28:00",
                        type: "video",
                        description: "Tree terminology, binary trees, tree traversal algorithms.",
                        content: "Understand hierarchical data structures."
                    },
                    {
                        id: "l1-5",
                        title: "Data Structures Practice",
                        duration: "45m",
                        type: "assignment",
                        description: "Solve 10 coding problems on data structures",
                        content: "Apply your knowledge to solve real coding challenges."
                    }
                ]
            },
            {
                id: "m2",
                title: "Algorithm Design Techniques",
                description: "Learn divide-and-conquer, dynamic programming, and greedy algorithms",
                lessons: [
                    {
                        id: "l2-1",
                        title: "Divide and Conquer",
                        duration: "26:15",
                        type: "video",
                        description: "Master divide-and-conquer: merge sort, quick sort, binary search.",
                        content: "Learn to break problems into smaller, solvable subproblems."
                    },
                    {
                        id: "l2-2",
                        title: "Dynamic Programming",
                        duration: "35:30",
                        type: "video",
                        description: "Memoization, tabulation, and solving DP problems step by step.",
                        content: "Master one of the most powerful algorithmic techniques."
                    },
                    {
                        id: "l2-3",
                        title: "Greedy Algorithms",
                        duration: "21:45",
                        type: "video",
                        description: "When to use greedy approaches and common greedy algorithm patterns.",
                        content: "Learn to identify and solve problems with greedy strategies."
                    },
                    {
                        id: "l2-4",
                        title: "Algorithm Design Challenge",
                        duration: "1h",
                        type: "assignment",
                        description: "Solve complex problems using multiple algorithm techniques",
                        content: "Apply different algorithmic approaches to challenging problems."
                    }
                ]
            },
            {
                id: "m3",
                title: "Interview Preparation",
                description: "Master coding interviews with pattern recognition and problem-solving strategies",
                lessons: [
                    {
                        id: "l3-1",
                        title: "Problem-Solving Framework",
                        duration: "24:00",
                        type: "video",
                        description: "Systematic approach to solving coding interview problems.",
                        content: "Learn a framework that works for any coding interview problem."
                    },
                    {
                        id: "l3-2",
                        title: "Common Patterns",
                        duration: "30:15",
                        type: "video",
                        description: "Two pointers, sliding window, fast & slow pointers, and more.",
                        content: "Recognize and apply common coding interview patterns."
                    },
                    {
                        id: "l3-3",
                        title: "Time & Space Complexity",
                        duration: "19:30",
                        type: "video",
                        description: "Big O notation, analyzing algorithms, optimizing solutions.",
                        content: "Master complexity analysis for technical interviews."
                    },
                    {
                        id: "l3-4",
                        title: "Mock Interview Practice",
                        duration: "2h",
                        type: "assignment",
                        description: "Complete 5 full mock interview sessions",
                        content: "Practice solving problems under interview conditions."
                    }
                ]
            }
        ],
        primaryAction: "Join Now",
        secondaryAction: "Learn More",
    },
];

// Helper function to get course by ID
export const getCourseById = (id: number | string): Course | undefined => {
    return courses.find(course => course.id === Number(id));
};

// Helper function to get all lessons for a course
export const getAllLessonsForCourse = (courseId: number | string): Lesson[] => {
    const course = getCourseById(courseId);
    if (!course) return [];
    return course.modules.flatMap(module => module.lessons);
};
