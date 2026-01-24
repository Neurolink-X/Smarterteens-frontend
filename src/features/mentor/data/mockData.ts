export type Notification = {
    id: number;
    title: string;
    body: string;
    time: string;
    unread: boolean;
};

export const initialNotifications: Notification[] = [
    { id: 1, title: "New submission", body: "Harry submitted Data Science Project", time: "2h", unread: true },
    { id: 2, title: "Course comment", body: "New comment on 'Let's React!'", time: "4h", unread: true },
    { id: 3, title: "Server", body: "Backup completed successfully", time: "1d", unread: false },
    { id: 4, title: "Reminder", body: "Grade pending assignments", time: "2d", unread: false },
];

export type Submission = {
    id: number;
    name: string;
    subject: string;
    assignment: string;
    status: string;
    due: string;
    submittedAgo: string;
    avatar: string;
};

export const submissions: Submission[] = [
    {
        id: 1,
        name: "Severus Snape",
        subject: "Python",
        assignment: "ML Problems Set #4",
        status: "Pending Review",
        due: "Today, 11:59 PM",
        submittedAgo: "2 hours ago",
        avatar: "https://i.pravatar.cc/48?img=11",
    },
    {
        id: 2,
        name: "Hermione Granger",
        subject: "AI Ethics",
        assignment: "Ethics Essay",
        status: "Graded",
        due: "Yesterday",
        submittedAgo: "1 day ago",
        avatar: "https://i.pravatar.cc/48?img=5",
    },
    {
        id: 3,
        name: "Draco Malfoy",
        subject: "Web Dev",
        assignment: "React Portfolio",
        status: "Late",
        due: "2 days ago",
        submittedAgo: "3 days ago",
        avatar: "https://i.pravatar.cc/48?img=3",
    },
    {
        id: 4,
        name: "Harry Potter",
        subject: "Data Science",
        assignment: "Data Cleaning",
        status: "Pending Review",
        due: "Tomorrow, 5:00 PM",
        submittedAgo: "5 hours ago",
        avatar: "https://i.pravatar.cc/48?img=12",
    },
    {
        id: 5,
        name: "Luna Lovegood",
        subject: "Data Science",
        assignment: "Data Science Project",
        status: "Pending Review",
        due: "Sep 20, 10:00 AM",
        submittedAgo: "30 mins ago",
        avatar: "https://i.pravatar.cc/48?img=36",
    },
];

export const students = [
    {
        id: 1,
        name: "Ron Weasley",
        email: "anotherWeasley@gmail.com",
        progress: 82,
        assignments: "10/15",
        subjects: ["Python", "AI"],
        lastActive: "2 hours ago",
        avatar: "https://i.pravatar.cc/48?img=20",
    },
    {
        id: 2,
        name: "Ginny Weasley",
        email: "ginny@hogwarts.edu",
        progress: 95,
        assignments: "14/15",
        subjects: ["Web Dev", "Design"],
        lastActive: "10 mins ago",
        avatar: "https://i.pravatar.cc/48?img=1",
    },
    {
        id: 3,
        name: "Fred Weasley",
        email: "fred@weasleyswizardwheezes.com",
        progress: 45,
        assignments: "5/12",
        subjects: ["Business", "Marketing"],
        lastActive: "1 day ago",
        avatar: "https://i.pravatar.cc/48?img=13",
    },
    {
        id: 4,
        name: "George Weasley",
        email: "george@weasleyswizardwheezes.com",
        progress: 48,
        assignments: "6/12",
        subjects: ["Business", "Marketing"],
        lastActive: "1 day ago",
        avatar: "https://i.pravatar.cc/48?img=14",
    },
    {
        id: 5,
        name: "Neville Longbottom",
        email: "neville@hogwarts.edu",
        progress: 69,
        assignments: "7/12",
        subjects: ["Herbology", "Potions"],
        lastActive: "5 hours ago",
        avatar: "https://i.pravatar.cc/48?img=24",
    },
];
