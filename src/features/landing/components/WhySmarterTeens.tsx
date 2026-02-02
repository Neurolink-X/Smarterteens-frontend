import React from "react";
import { Target, Users, Award, BookOpen } from "lucide-react";

const WhySmarterTeens: React.FC = () => {
    const values = [
        {
            icon: Target,
            title: "Clear Learning Paths",
            description:
                "Structured curriculum designed by experts. Every course has clear outcomes and measurable progress.",
        },
        {
            icon: Users,
            title: "Expert Mentorship",
            description:
                "Learn from industry professionals and experienced educators who are committed to your success.",
        },
        {
            icon: Award,
            title: "Proven Outcomes",
            description:
                "95% of students report achieving their learning goals. Real progress, real results.",
        },
        {
            icon: BookOpen,
            title: "Self-Paced Learning",
            description:
                "Learn at your own speed. Your progress is saved automatically, so you can resume anytime.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why SmarterTeens?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We're building the future of education—one that's accessible, engaging, and
                        results-driven.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-start space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhySmarterTeens;
