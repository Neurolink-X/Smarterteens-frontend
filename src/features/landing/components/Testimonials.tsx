import React from "react";
import { Star } from "lucide-react";

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Parent",
            location: "San Francisco, CA",
            content:
                "My daughter has completed two courses and her confidence has grown tremendously. The structured learning path and progress tracking give us both peace of mind.",
            rating: 5,
        },
        {
            name: "Michael Rodriguez",
            role: "Student, Age 16",
            location: "Austin, TX",
            content:
                "I love being able to learn at my own pace. The courses are engaging and I can see my progress clearly. It's helped me prepare for my future career.",
            rating: 5,
        },
        {
            name: "Dr. Emily Watson",
            role: "Educator & Parent",
            location: "Boston, MA",
            content:
                "As both a teacher and a parent, I appreciate the quality of content and the thoughtful curriculum design. This platform sets a new standard for online learning.",
            rating: 5,
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Students and Parents Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Real feedback from our learning community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="border-t border-gray-100 pt-4">
                                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                <p className="text-sm text-gray-500">
                                    {testimonial.role} • {testimonial.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
