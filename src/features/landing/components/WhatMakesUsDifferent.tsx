import React from "react";
import { CheckCircle, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhatMakesUsDifferent: React.FC = () => {
    const comparisons = [
        {
            feature: "Structured Learning Path",
            smarterteens: true,
            traditional: false,
            random: false,
        },
        {
            feature: "Progress Tracking & Visibility",
            smarterteens: true,
            traditional: false,
            random: false,
        },
        {
            feature: "Expert Mentorship",
            smarterteens: true,
            traditional: true,
            random: false,
        },
        {
            feature: "Self-Paced Learning",
            smarterteens: true,
            traditional: false,
            random: true,
        },
        {
            feature: "Clear Learning Outcomes",
            smarterteens: true,
            traditional: false,
            random: false,
        },
        {
            feature: "Parent Progress Visibility",
            smarterteens: true,
            traditional: false,
            random: false,
        },
        {
            feature: "Accountability System",
            smarterteens: true,
            traditional: true,
            random: false,
        },
        {
            feature: "Resume Anytime",
            smarterteens: true,
            traditional: false,
            random: true,
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Makes Us Different
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See why SmarterTeens stands out from traditional coaching and random online courses.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Feature
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                        <div className="flex flex-col items-center">
                                            <span className="text-blue-600">SmarterTeens</span>
                                            <span className="text-xs text-gray-500 font-normal mt-1">
                                                Structured & Tracked
                                            </span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-700">Traditional Coaching</span>
                                            <span className="text-xs text-gray-500 font-normal mt-1">
                                                Fixed Schedule
                                            </span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-700">Random Online Courses</span>
                                            <span className="text-xs text-gray-500 font-normal mt-1">
                                                No Structure
                                            </span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisons.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {item.feature}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.smarterteens ? (
                                                <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-6 h-6 text-gray-300 mx-auto" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.traditional ? (
                                                <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-6 h-6 text-gray-300 mx-auto" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.random ? (
                                                <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-6 h-6 text-gray-300 mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Key Differentiators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Structured Learning
                        </h3>
                        <p className="text-sm text-gray-600">
                            Every course has a clear path from start to finish. No confusion, no dead ends.
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Progress Tracking
                        </h3>
                        <p className="text-sm text-gray-600">
                            See exactly where you are. Parents can track progress too. Real accountability.
                        </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Mentorship + Flexibility
                        </h3>
                        <p className="text-sm text-gray-600">
                            Get expert guidance when you need it, but learn at your own pace.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/courses"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Explore Our Courses
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WhatMakesUsDifferent;
