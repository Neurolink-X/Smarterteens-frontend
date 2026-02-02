import React from "react";
import { GraduationCap, Eye, Shield, Target, TrendingUp, CheckCircle } from "lucide-react";

const DesignedForParentsStudents: React.FC = () => {
    const studentBenefits = [
        {
            icon: GraduationCap,
            title: "Build Real Skills",
            description: "Learn practical skills that matter for your future career. Not just theory—real, applicable knowledge.",
        },
        {
            icon: TrendingUp,
            title: "Gain Confidence",
            description: "See your progress grow. Complete courses, unlock achievements, and build confidence in your abilities.",
        },
        {
            icon: Target,
            title: "Clear Learning Path",
            description: "Know exactly what you're learning and why. Every course has clear outcomes and a structured path.",
        },
    ];

    const parentBenefits = [
        {
            icon: Eye,
            title: "Progress Visibility",
            description: "See exactly where your child is in each course. Track completion, time spent, and achievements.",
        },
        {
            icon: Shield,
            title: "Safe Learning Environment",
            description: "A secure platform designed for teens. No distractions, no inappropriate content—just focused learning.",
        },
        {
            icon: CheckCircle,
            title: "Proven Outcomes",
            description: "95% of students achieve their learning goals. Real results, not empty promises.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Designed for Parents & Students
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We built SmarterTeens with both students and parents in mind. 
                        Everyone gets what they need.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Student Benefits */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Learn skills that matter. Build confidence. See your progress grow.
                        </p>
                        <div className="space-y-4">
                            {studentBenefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">
                                                {benefit.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Parent Benefits */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">For Parents</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Stay informed. Know your child is safe. See real results.
                        </p>
                        <div className="space-y-4">
                            {parentBenefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">
                                                {benefit.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Reassuring Message */}
                <div className="mt-12 text-center bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <p className="text-gray-700 text-base max-w-2xl mx-auto">
                        <span className="font-semibold text-gray-900">No pressure.</span> Learn at your own pace. 
                        Your progress is saved automatically, so you can resume anytime. 
                        <span className="block mt-2 text-sm text-gray-600">
                            Built with students & parents in mind.
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DesignedForParentsStudents;
