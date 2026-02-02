import React from "react";
import { courses, type Course } from "../data/coursesData";
import CourseCard from "./CoursesCard";
import StudentStories from "./StudentStories";
import WhySmarterTeens from "./WhySmarterTeens";
import PlatformStats from "./PlatformStats";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import WhatMakesUsDifferent from "./WhatMakesUsDifferent";
import DesignedForParentsStudents from "./DesignedForParentsStudents";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Courses: React.FC = () => {
    return (
        <>
            <div className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Explore Our Courses
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Choose from expertly designed courses that help you build real skills and
                            achieve your learning goals.
                        </p>
                    </div>

                    <div className="space-y-8 md:space-y-12">
                        {/* First Course - Featured */}
                        <CourseCard course={courses[0]} variant="large" />

                        {/* Other Courses */}
                        <div className="grid grid-cols-1 gap-6 md:gap-8">
                            {courses.slice(1).map((course: Course) => (
                                <CourseCard key={course.id} course={course} variant="small" />
                            ))}
                        </div>
                    </div>

                    {/* CTA Reinforcement */}
                    <div className="mt-12 text-center">
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Browse All Courses
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="mt-4 text-sm text-gray-600">
                            No pressure. Learn at your pace. Progress is always saved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Competitive Differentiation Sections */}
            <HowItWorks />
            <WhatMakesUsDifferent />
            <DesignedForParentsStudents />

            {/* Trust Sections */}
            <WhySmarterTeens />
            <PlatformStats />
            <Testimonials />
            <StudentStories />

            {/* Final CTA Reinforcement */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students building real skills. Your progress is saved automatically, 
                        so you can learn at your own pace.
                    </p>
                    <Link
                        to="/courses"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Explore Courses
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <p className="mt-6 text-sm text-blue-100">
                        Built with students & parents in mind.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Courses;
