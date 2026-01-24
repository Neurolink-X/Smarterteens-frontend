export type ActivePageType =
    | "home"
    | "students"
    | "upload"
    | "submissions"
    | "profile"
    | "courses"
    | "create-course"
    | { page: "view-course"; course: any };
