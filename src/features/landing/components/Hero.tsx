import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Users, Award, Clock } from "lucide-react";

const Hero: React.FC = () => {
    return (
        <>
            <section className="relative overflow-hidden">
                {/* Hero Images Grid */}
                <div className="flex flex-wrap relative">
                    <div className="flex w-full md:w-1/2 lg:w-1/4">
                        <img
                            src="/HomeImages/HeroImg1.webp"
                            alt="Students learning"
                            className="w-full object-cover h-[300px] md:h-[400px] lg:h-[500px]"
                        />
                    </div>

                    <div className="flex max-sm:hidden md:w-1/2 lg:w-1/4">
                        <img
                            src="/HomeImages/HeroImg2.webp"
                            alt="Interactive learning"
                            className="w-full object-cover h-[300px] md:h-[400px] lg:h-[500px]"
                        />
                    </div>

                    <div className="flex max-lg:hidden lg:w-1/4">
                        <img
                            src="/HomeImages/HeroImg1.webp"
                            alt="Educational excellence"
                            className="w-full object-cover h-[500px]"
                        />
                    </div>

                    <div className="flex max-lg:hidden lg:w-1/4">
                        <img
                            src="/HomeImages/HeroImg1.webp"
                            alt="Student success"
                            className="w-full object-cover h-[500px]"
                        />
                    </div>

                    {/* Overlay with Enhanced CTA */}
                    <div className="absolute top-0 lg:left-1/2 left-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-b from-black/60 via-black/50 to-black/60 text-white px-6 md:px-12">
                        {/* Value Ladder */}
                        <div className="max-w-2xl text-center">
                            {/* Primary Headline - Outcome-focused */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                                Build Real Skills.
                                <br />
                                <span className="text-blue-400">Launch Your Career.</span>
                            </h1>
                            
                            {/* Subheadline - Who it's for */}
                            <p className="text-xl md:text-2xl text-gray-100 mb-3 font-medium">
                                For students ready to learn. For parents who want results.
                            </p>
                            
                            {/* Supporting microcopy - Credibility */}
                            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                                Structured courses, expert mentorship, and real progress tracking. 
                                <span className="block mt-1 text-sm text-gray-400">
                                    No pressure. Learn at your pace. Progress is always saved.
                                </span>
                            </p>

                            {/* Dual CTA Strategy */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                {/* Primary CTA */}
                                <Link
                                    to="/courses"
                                    className="group min-h-[48px] inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                                >
                                    Start Learning Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                
                                {/* Secondary CTA */}
                                <Link
                                    to="/parent-view"
                                    className="group min-h-[48px] inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl text-base sm:text-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                                >
                                    <PlayCircle className="w-5 h-5" />
                                    For Parents
                                </Link>
                            </div>

                            {/* Trust Microcopy */}
                            <p className="text-xs text-gray-400">
                                ✓ Built with students & parents in mind
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Strip - Mini Stats */}
            <section className="bg-white border-b border-gray-100 py-4">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div className="flex items-center gap-3 text-center md:text-left">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg md:text-xl font-bold text-gray-900">50,000+</div>
                                <div className="text-xs text-gray-600">Active Students</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-center md:text-left">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg md:text-xl font-bold text-gray-900">95%</div>
                                <div className="text-xs text-gray-600">Success Rate</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-center md:text-left">
                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg md:text-xl font-bold text-gray-900">1,200+</div>
                                <div className="text-xs text-gray-600">Hours Content</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-center md:text-left">
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg md:text-xl font-bold text-gray-900">200+</div>
                                <div className="text-xs text-gray-600">Expert Mentors</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
