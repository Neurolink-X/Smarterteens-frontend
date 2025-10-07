import React from "react";
import { Search, GraduationCap, MessageSquare, Bookmark } from "lucide-react";

const badges = [
  { emoji: "🦁", title: "Master Linguist" },
  { emoji: "🧠", title: "Math Whiz" },
  { emoji: "🐻", title: "Creative Coder" },
  { emoji: "🎯", title: "Goal Setter" },
  { emoji: "🦉", title: "Knowledge Guru" },
  { emoji: "🤖", title: "Tech Explorer" },
  { emoji: "🔥", title: "Creative Spark" },
  { emoji: "🧩", title: "Problem Solver" },
  { emoji: "📚", title: "Book Worm" },
  { emoji: "👑", title: "Challenge King" },
  { emoji: "🎨", title: "Design Master" },
  { emoji: "🔒", title: "Locked" },
  { emoji: "🔒", title: "Locked" },
  { emoji: "🔒", title: "Locked" },
  { emoji: "🔒", title: "Locked" },
  { emoji: "🔒", title: "Locked" },
];

const leaderboard = [
  { name: "Sophia M.", pts: 3700, img: 12 },
  { name: "Liam T.", pts: 3000, img: 10 },
  { name: "Liam T. (1150 pts)", pts: 500, img: 7 },
  { name: "Ottor", pts: 700, img: 5 },
  { name: "Chloe S.", pts: 500, img: 3 },
 
];

const weeklyChallenges = [
  { title: "Complete 3 LLM exercises", progress: 0.1 },
  { title: "Complete 4 algorithm exercises", progress: 0.7 },
  { title: "Solve 5 react problems", progress: 0.8 },
  { title: "Create personal portfolio", progress: 0.5 },
  { title: "Create a hangman game", progress: 0.4 },
  { title: "Backend exercise 4", progress: 0.0 },
];

const GamifiedDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 mt-8">

      <div className="relative w-[1000px] h-[650px] rounded-3xl p-8 overflow-hidden">
     
        <div className="absolute inset-0 flex z-0">
     
          <div
            className="w-1/2"
            style={{
              background: "linear-gradient(to bottom, #0CB1B5 0%, #CCE5EA 100%)",
            }}
          ></div>

          <div
            className="w-1/2 relative overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, #FA8F3F 0%, #F0BB93 100%)",
            }}
          ></div>
        </div>


<div className="absolute -top-[12px] -left-[2%] flex items-center  z-50">
  
  <img
    src="/Images/smarterteens_logo.png"
    alt="SmarterTeens Logo"
    className="w-[180px] h-[180px]object-contain  "
  />

  <div className="flex flex-col -mt-2">
    <h2 className="text-xl font-bold text-navy-900 leading-tight -ml-12 font-poppins">SmarterTeens</h2>
    <p className="text-xs text-orange-900 -mt-1 tracking-wide -ml-12 italic">Gamified Learning</p>
  </div>
</div>


        <div
          className="relative w-[36%] bg-white rounded-2xl p-6 text-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.08)] z-5"
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            height: "480px",
            marginTop: "90px",
          }}
        >
          
<h4 className="text-lg font-semibold mb-2">Weekly Challenges</h4>

<div className="mb-4 relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FA8F3F]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  </span>
  <input
    type="text"
    placeholder="Search challenges..."
    className="w-52 pl-10 p-2.5 rounded-xl border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b8f86] focus:border-[#0b8f86] transition placeholder-gray-400 bg-[url('/images/pattern.png')] bg-repeat bg-[length:20px_20px] bg-opacity-10"
  />
</div>


          {weeklyChallenges.map((it, idx) => (
            <div key={idx} className="mb-3">
              <p className="text-sm mb-1">{it.title}</p>
              <div className="h-2.5 w-53 bg-gray-200 rounded-full overflow-hidden">
              <div
  className="h-full rounded-full transition-all"
  style={{
    width: `${Math.max(3, it.progress * 100)}%`,
    background:
      it.progress > 0.5
        ? "linear-gradient(90deg, #36a2ff, #00c0ff)" // smooth blue
        : "linear-gradient(90deg,  #ff9f52, #ff7b36)", // smooth transition from blue to orange
  }}
/>

              </div>
            </div>
          ))}

        <button className="mt-4 w-52 h-10 relative text-white font-semibold rounded-xl overflow-hidden shadow-md hover:opacity-90 transition">
  {/* Background color (teal side) */}
  <div className="absolute inset-0 bg-[#0b8f86]" />

  {/* Light pattern shape on the left */}
  <svg
    className="absolute left-0 top-0 h-full"
    viewBox="0 0 60 40"
    preserveAspectRatio="none"
  >
    <path
      d="M0,0 H40 Q55,20 40,40 H0 Z"
      fill="#b3ecec"
    />
  </svg>

  {/* Text */}
  <span className="relative z-10">View All</span>
</button>

        </div>

        <div
          className="absolute top-[30px] right-0 rounded-2xl shadow-[0_20px_50px_rgba(11,22,33,0.1)] z-20"
          style={{
            height: "590px",
            width: "65%",
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.1),rgba(255,255,255,1),rgba(255,255,255,1))",
            backdropFilter: "blur(12px)",
            marginRight: "15px",
          }}
        >
          <div className="absolute top-5 left-5 flex items-center gap-4 z-30">
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-black" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <Search className="w-4 h-4 text-black" />
           <Bookmark className="w-4 h-4 text-black" />
          </div>

          <div className="absolute top-5 right-5 flex items-center gap-3 z-30">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
              <img
                src="https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4="
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="absolute top-24 right-8 w-[40%] h-[430px] bg-white rounded-2xl p-5 shadow-md z-10">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Leaderboard</h3>
            <div className="space-y-2 overflow-y-auto h-[400px] pr-1">
              {leaderboard.map((u, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                      <img
                        src={`https://i.pravatar.cc/150?img=${u.img}`}
                        alt={u.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-400">
                        ({Math.floor(u.pts / 3)} pts)
                      </p>
                    </div>
                  </div>
                  <div className="text-[#00bfa6] font-bold text-sm">{u.pts}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute top-[87px] left-[28%] w-[40%] p-5 rounded-2xl z-40"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 25px 60px rgba(11,22,33,0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.6)",
            height: "480px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Master Linguist</h3>
            <button className="w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {badges.map((b, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full flex items-center justify-center text-[26px] transform transition duration-300 hover:scale-110"
                style={{
                  background:
                    b.emoji === "🔒"
                      ? "radial-gradient(circle at 30% 30%, #e0e0e0, #c0c0c0)"
                      : "linear-gradient(135deg, #ffb36b, #ff7b36)",
                  boxShadow:
                    b.emoji === "🔒"
                      ? "inset 0 2px 4px rgba(0,0,0,0.1)"
                      : "0 6px 15px rgba(255,123,54,0.4), 0 3px 6px rgba(0,0,0,0.1)",
                  color: b.emoji === "🔒" ? "#aaa" : "#fff",
                }}
              >
                {b.emoji}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg mt-5 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 shadow-md hover:shadow-lg transition">
            <div className="w-20 h-20 rounded-md bg-white overflow-hidden border-2 border-yellow-300 shadow-inner">
              <img
                src="https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4="
                alt="cert"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">
                Certificate of Achievement
              </p>
              <p className="text-xs text-gray-500">Avnthio anacte.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedDashboard;
