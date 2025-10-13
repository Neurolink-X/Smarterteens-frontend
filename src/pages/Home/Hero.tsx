import { Dot } from "lucide-react";
import React from "react";

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
      <div className="flex flex-wrap">
        <div className="flex w-full md:w-1/2 lg:w-1/4">
          <img src="HomeImages/HeroImg1.webp" alt="Image 1" className="w-full object-cover" />
        </div>
        <div className="flex max-sm:hidden md:w-1/2 lg:w-1/4">
          <img src="HomeImages/HeroImg2.webp" alt="Image 2" className="w-full lg:h-auto object-cover" />
        </div>
        <div className="flex max-lg:hidden lg:w-1/4">
          <img src="HomeImages/HeroImg1.webp" alt="Image 3" className="w-full lg:h-auto object-cover" />
        </div>
        <div className="flex max-lg:hidden lg:w-1/4">
          <img src="HomeImages/HeroImg1.webp" alt="Image 4" className="w-full lg:h-auto object-cover" />
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-[#0A0E2A] to-blue-950 px-6 h-150 lg:h-120 md:h-75 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center pt-10">Impact Stats</h2>

        <div className="relative mx-auto gap-2 max-w-[1400px] aspect-[7/5] hidden sm:block">
          <div className="absolute w-[15%] h-[15%] top-[10%] left-[32%] bg-gradient-to-br from-indigo-900 to-blue-700 opacity-50 blur-2xl clip-hex" />
          <div className="absolute w-[17%] h-[16%] top-[15%] left-[71%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-40 blur-xl clip-hex" />
          <div className="absolute w-[12%] h-[12%] top-[18%] left-[47%] bg-gradient-to-br from-blue-900 to-blue-800 blur-lg opacity-80 clip-hex" />
          <div className="absolute w-[12%] h-[12%] top-[27%] left-[44%] bg-gradient-to-br from-blue-900 to-blue-800 blur-lg opacity-80 clip-hex" />
          <div className="absolute w-[10%] h-[9%] top-[4%] left-[80%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-40 blur-md clip-hex" />
          <div className="absolute w-[10%] h-[10%] top-[11%] left-[65%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[6%] h-[6%] top-[11%] left-[90%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[4%] h-[4%] top-[25%] left-[90%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[5%] h-[5%] top-[30%] left-[85%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[3%] h-[3%] top-[17%] left-[88%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[9%] h-[9%] top-[30%] left-[69%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-70 blur-md clip-hex" />
          <div className="absolute w-[6%] h-[6%] top-[29%] left-[69%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[7%] h-[7%] top-[30%] left-[69%] bg-gradient-to-br from-indigo-950 to-blue-950 blur-md clip-hex" />
          <div className="absolute w-[5%] h-[5%] top-[31%] left-[70%] bg-gradient-to-br from-indigo-800 to-blue-700 opacity-50 blur-md clip-hex" />
          <div className="absolute w-[12%] h-[12%] top-[28%] left-[20%] bg-gradient-to-br from-indigo-900 to-blue-800 opacity-90 blur-2xl clip-hex" />
          <div className="absolute w-[15%] h-[15%] top-[27%] left-[54%] bg-indigo-950 blur-xl clip-hex" />
          <div className="absolute w-[8%] h-[8%] top-[22%] left-[15%] bg-gradient-to-br from-blue-800 to-blue-700 opacity-50 blur-lg clip-hex" />
          <div className="absolute w-[10%] h-[9%] top-[6%] left-[80%] bg-indigo-800 opacity-90 blur-md clip-hex" />
          <div className="absolute w-[14%] h-[13%] top-[13%] left-[32%] bg-gradient-to-br from-indigo-900 to-purple-700 clip-hex flex flex-col items-center justify-center text-white text-center shadow-lg">
            <h3 className="lg:text-2xl text-[8px] md:text-sm font-bold">95%</h3>
            <p className="lg:text-lg text-[5px] md:text-sm">Success Rate</p>
          </div>
          <div className="absolute w-[16%] h-[16%] md:w-[15%] md:h-[15%] top-[20%] left-[43%] bg-gradient-to-br from-indigo-900 to-purple-700 clip-hex flex flex-col items-center justify-center text-white text-center shadow-lg">
            <h3 className="lg:text-2xl text-[8px] md:text-sm font-bold">50,000+</h3>
            <p className="lg:text-lg text-[5px] md:text-xs">Students Empowered</p>
          </div>
          <div className="absolute w-[16%] h-[16%] md:w-[15%] md:h-[15%] top-[27%] left-[31%] bg-gradient-to-br from-indigo-900 to-purple-700 clip-hex flex flex-col items-center justify-center text-white text-center shadow-lg">
            <h3 className="lg:text-2xl text-[8px] md:text-sm font-bold">210+</h3>
            <p className="lg:text-lg text-[5px] md:text-xs">Expert Instructors</p>
          </div>
          <div className="absolute w-[16%] h-[16%] md:w-[14%] md:h-[13%] top-[26%] left-[55%] bg-gradient-to-br from-indigo-950 to-purple-950 clip-hex flex flex-col items-center justify-center text-white text-center shadow-lg">
            <h3 className="lg:text-2xl text-[8px] md:text-sm font-bold">200+</h3>
            <p className="lg:text-lg text-[5px] md:text-xs">Mentors</p>
          </div>
          <div className="absolute w-[9%] h-[10%] top-[10%] left-[65%] bg-gradient-to-br from-indigo-950 to-purple-950 clip-hex flex flex-col items-center justify-center text-white text-center shadow-lg">
            <h3 className="lg:text-lg text-[8px] md:text-xs font-bold">Paata Leve</h3>
          </div>
          <div className="absolute w-[16%] h-[16%] md:w-[14%] md:h-[13%] top-[17%] left-[73%] bg-gradient-to-br from-indigo-900 to-purple-700 clip-hex flex items-center justify-center overflow-hidden shadow-lg">
            <img src="HomeImages/Heroimg3.webp" alt="Instructor" className="w-full h-full object-cover" />
          </div>
        </div>
      {/* Mobile view */}
        <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-4">
          <Hexagon color="#5B4FFF" opacity={0.07} size={105} />
        </div>
        <div className="absolute top-8 right-10">
          <Hexagon color="#7B6FFF" opacity={0.08} size={90} />
        </div>
        <div className="absolute top-60 right-5">
          <Hexagon color="#6C5FFF" opacity={0.06} size={100} />
        </div>
        <div className="absolute bottom-44 left-9">
          <Hexagon color="#8B7FFF" opacity={0.09} size={95} />
        </div>
        <div className="absolute bottom-16 right-12">
          <Hexagon color="#5B4FFF" opacity={0.07} size={110} />
        </div>
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
