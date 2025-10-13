import React from "react";
import { courses } from "../../data/courses";
import CourseCard from "../../components/CoursesCard";
import StudentStories from "../../components/StudentStories";

const Courses: React.FC = () => {
  return (
    <div className="p-2 md:p-5 lg:p-5 mt-10 bg-gray-50 min-h-screen flex flex-col lg:flex-row gap-10">
      {/* Left Half for Courses */}
      <div className="w-full lg:w-1/2 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Course Previews
        </h1>

        {/* First Course */}
        <CourseCard course={courses[0]} variant="large" />

        {/* Next Courses */}
        <div className="grid grid-cols-1 gap-6">
          {courses.slice(1).map((course) => (
            <CourseCard key={course.id} course={course} variant="small" />
          ))}
        </div>
      </div>

      {/* Right Half for Student Stories */}
      <div className="w-full lg:w-1/2">
        <StudentStories />
      </div>
    </div>
  );
};

export default Courses;
