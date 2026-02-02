import React from "react";
import { BookOpen, Users, FileText, Upload, Clock } from "lucide-react";

const MentorWelcome: React.FC = () => {
    const features = [
        {
            icon: BookOpen,
            title: "Course Creation",
            status: "coming-soon",
            description:
                "Create and publish your own courses with structured modules, lessons, and assessments.",
        },
        {
            icon: Users,
            title: "Student Management",
            status: "coming-soon",
            description:
                "View student progress, provide feedback, and track engagement across your courses.",
        },
        {
            icon: FileText,
            title: "Submission Review",
            status: "coming-soon",
            description:
                "Review and grade student assignments with detailed feedback and rubrics.",
        },
        {
            icon: Upload,
            title: "Content Library",
            status: "coming-soon",
            description:
                "Upload videos, documents, and resources to build comprehensive course materials.",
        },
    ];

    return (
        <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Mentor Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your comprehensive teaching toolkit is being built. We're creating powerful
                        features to help you create, manage, and deliver exceptional learning
                        experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {feature.title}
                                            </h3>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                                Coming Soon
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        We're Building Something Great
                    </h3>
                    <p className="text-gray-600 text-sm max-w-xl mx-auto">
                        Our mentor tools are in active development. You'll be notified as soon as
                        these features are available. In the meantime, explore the platform and see
                        what students are learning.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MentorWelcome;
