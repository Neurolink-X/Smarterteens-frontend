import React from "react";
import { BookOpen, PlayCircle, BarChart3, Trophy, ArrowRight } from "lucide-react";

const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: BookOpen,
            title: "Choose Your Course",
            description: "Browse structured courses designed by experts. Every course has clear outcomes and a proven learning path.",
            color: "blue",
        },
        {
            icon: PlayCircle,
            title: "Learn at Your Pace",
            description: "Access video lessons, quizzes, and assignments. Your progress is saved automatically—resume anytime.",
            color: "purple",
        },
        {
            icon: BarChart3,
            title: "Track Your Progress",
            description: "See exactly where you are in each course. Visual progress bars and completion badges keep you motivated.",
            color: "green",
        },
        {
            icon: Trophy,
            title: "Achieve Your Goals",
            description: "Complete courses, build real skills, and unlock achievements. Get mentorship support when you need it.",
            color: "yellow",
        },
    ];

    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        green: "bg-green-50 text-green-600",
        yellow: "bg-yellow-50 text-yellow-600",
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How SmarterTeens Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A simple, structured approach to learning that works for students and gives parents peace of mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 rounded-xl ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Arrow (hidden on last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Reassuring Microcopy */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                        <span className="font-semibold text-gray-900">No pressure.</span> Learn at your own speed. 
                        Your progress is saved automatically, so you can resume anytime. 
                        <span className="block mt-2 text-gray-500">
                            Built with students & parents in mind.
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
