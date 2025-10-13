import React from "react";
import type { Course } from "../data/courses";

type Props = {
  course: Course;
  variant?: "large" | "small";
};

const CourseCard: React.FC<Props> = ({ course, variant = "small" }) => {
  //LARGE VARIANT
  if (variant === "large") {
    return (
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row">
        <div className="w-full md:w-1/2 lg:w-1/2 lg:mr-5 md:mr-5 mr-3 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-52 sm:h-60 md:h-full object-cover object-center"
          />
        </div>


        <div className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-4 md:mt-0">
          <div className="p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {course.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Difficulty: {course.difficulty}
              </p>
              <p className="text-gray-700 mt-3 text-sm sm:text-base">
                {course.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {course.primaryAction && (
                <button className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base">
                  {course.primaryAction}
                </button>
              )}
              {course.secondaryAction && (
                <button className="px-3 sm:px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base">
                  {course.secondaryAction}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  //SMALL VARIANT
  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/4 lg:w-1/4 md:mr-5 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-52 sm:h-60 md:h-full object-cover object-center"
        />
      </div>


      <div className="w-full md:w-1/3 lg:w-1/3 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-4 md:mt-0 md:mr-5">
        <div className="p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Difficulty: {course.difficulty}
            </p>
            <p className="text-gray-700 mt-3 text-sm sm:text-base">
              {course.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {course.primaryAction && (
              <button className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base">
                {course.primaryAction}
              </button>
            )}
            {course.secondaryAction && (
              <button className="px-3 sm:px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base">
                {course.secondaryAction}
              </button>
            )}
          </div>
        </div>
      </div>


      <div className="w-full md:w-1/3 lg:w-1/3 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-4 md:mt-0">
        <div className="p-3 sm:p-4 md:p-6 lg:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Difficulty: {course.difficulty}
            </p>
            <p className="text-gray-700 mt-3 text-sm sm:text-base">
              {course.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {course.primaryAction && (
              <button className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base">
                {course.primaryAction}
              </button>
            )}
            {course.secondaryAction && (
              <button className="px-3 sm:px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base">
                {course.secondaryAction}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
