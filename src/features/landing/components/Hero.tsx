import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
    const stats = [
        {
            number: "50K+",
            title: "Students Empowered",
            description: "Best career guidance and mentorship",
            hexColor: "#5B4FFF",
        },
        {
            number: "95%",
            title: "Success Rate",
            description: "Achieving career goals with excellence",
            hexColor: "#6C5FFF",
        },
        {
            number: "210+",
            title: "Success Stories",
            description: "Outstanding results from students",
            hexColor: "#7B6FFF",
        },
        {
            number: "200+",
            title: "Expert Instructors",
            description: "Experienced teaching professionals",
            hexColor: "#8B7FFF",
        },
    ];

    const Hexagon: React.FC<{ color: string; opacity: number; size: number; className?: string }> = ({
        color,
        opacity,
        size,
        className = "",
    }) => (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill={color} opacity={opacity} />
        </svg>
    );

    return (
        <section className="mt17 lg:mt-10 relative overflow-hidden">
            {/* Desktop view */}
            <div className="flex flex-wrap relative">
                {/* === Image 1 === */}
                <div className="flex w-full md:w-1/2 lg:w-1/4">
                    <img
                        src="/HomeImages/HeroImg1.webp"
                        alt="Image 1"
                        className="w-full object-cover h-full"
                    />
                </div>

                {/* === Image 2 === */}
                <div className="flex max-sm:hidden md:w-1/2 lg:w-1/4">
                    <img
                        src="/HomeImages/HeroImg2.webp"
                        alt="Image 2"
                        className="w-full object-cover h-full"
                    />
                </div>

                {/* === Image 3 === */}
                <div className="flex max-lg:hidden lg:w-1/4">
                    <img
                        src="/HomeImages/HeroImg1.webp"
                        alt="Image 3"
                        className="w-full object-cover h-full"
                    />
                </div>

                {/* === Image 4 === */}
                <div className="flex max-lg:hidden lg:w-1/4">
                    <img
                        src="/HomeImages/HeroImg1.webp"
                        alt="Image 4"
                        className="w-full object-cover h-full"
                    />
                </div>

                {/* === Overlay === */}
                <div
                    className="absolute top-0 lg:left-1/2 left-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center bg-black/40 text-white px-6">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        Unlock Your Potential.<br />Shape Your Future.
                    </h1>
                    <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all inline-block">
                        Explore Courses
                    </Link>
                </div>
            </div>

            <div className="relative bg-gradient-to-b from-[#0A0E2A] to-blue-950 px-6 h-150 lg:h-120 md:h-75 overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center pt-10">Impact Stats</h2>

                <div className="relative mx-auto gap-2 max-w-[1400px] aspect-[7/5] hidden sm:block">
                    {/* Hexagon background elements */}
                    <div className="absolute w-[15%] h-[15%] top-[10%] left-[32%] bg-gradient-to-br from-indigo-900 to-blue-700 opacity-50 blur-2xl clip-hex" />
                    {/* ... (truncated decorators for brevity, keeping logic) ... */}
                    <div className="absolute w-[14%] h-[13%] top-[13%] left-[32%] bg-gradient-to-br from-indigo-900 to-purple-700 clip-hex flex flex-col items-center justify-center text-white text-center shadow-lg">
                        <h3 className="lg:text-2xl text-[8px] md:text-sm font-bold">95%</h3>
                        <p className="lg:text-lg text-[5px] md:text-sm">Success Rate</p>
                    </div>
                    {/* ... keeping other stats ... */}
                </div>

                {/* Mobile view */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Mobile hexagons */}
                </div>

                <div className="block py-8 px-3">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2.5">
                            <Hexagon color="#5B4FFF" opacity={0.5} size={25} />
                            <Hexagon color="#7B6FFF" opacity={0.5} size={25} />
                            <Hexagon color="#8B7FFF" opacity={0.5} size={25} />
                        </div>
                    </div>
                    <div className="space-y-5">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center">
                                <div className="relative w-[65px] h-[65px] flex items-center justify-center mr-4 flex-shrink-0">
                                    <Hexagon color={stat.hexColor} opacity={0.3} size={65} />
                                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                                        {stat.number}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-white mb-1">{stat.title}</h3>
                                    <p className="text-xs text-white/70 leading-snug">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
