import React from "react";
import { Users, BookOpen, Clock, Award } from "lucide-react";

const PlatformStats: React.FC = () => {
    const stats = [
        {
            icon: Users,
            number: "50,000+",
            label: "Students Learning",
            description: "Active learners on our platform",
        },
        {
            icon: BookOpen,
            number: "200+",
            label: "Expert Mentors",
            description: "Industry professionals and educators",
        },
        {
            icon: Clock,
            number: "1,200+",
            label: "Hours of Content",
            description: "Comprehensive course materials",
        },
        {
            icon: Award,
            number: "95%",
            label: "Success Rate",
            description: "Students achieving their goals",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Platform Impact
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Numbers that reflect our commitment to quality education.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm font-semibold text-gray-700 mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-gray-500">{stat.description}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;
