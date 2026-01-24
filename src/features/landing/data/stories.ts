export interface Story {
    id: number;
    name: string;
    role: string;
    image: string;
}

export const stories: Story[] = [
    {
        id: 1,
        name: "Emelie Krong",
        role: "Global business student",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
        id: 2,
        name: "Whan Madin",
        role: "Data Science Student",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
        id: 3,
        name: "Wajon Malana",
        role: "Business Student",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
        id: 4,
        name: "Weyanda Hoser",
        role: "IT Student",
        image: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
        id: 5,
        name: "Student 5",
        role: "Marketing Student",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
        id: 6,
        name: "Student 6",
        role: "Engineering Student",
        image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
];
