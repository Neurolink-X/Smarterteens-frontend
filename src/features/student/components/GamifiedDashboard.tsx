import React from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, MessageSquare, Bookmark } from "lucide-react";
import { badges, leaderboard, weeklyChallenges } from "../data/mockData";

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
                    className="absolute top-[87px] left-[28%] w-[40%] p-5 rounded-2xl z-40 overflow-y-auto"
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        boxShadow: "0 25px 60px rgba(11,22,33,0.1)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.6)",
                        height: "480px",
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">My Learning</h3>
                        <Link to="/courses" className="text-sm text-blue-600 font-medium hover:underline">
                            Browse All
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {/* Dynamic Course List */}
                        {(() => {
                            const enrolledIds = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");

                            if (enrolledIds.length === 0) {
                                return (
                                    <div className="text-center py-10">
                                        <div className="text-4xl mb-3">🎓</div>
                                        <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                                        <Link to="/courses" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                            Find a Course
                                        </Link>
                                    </div>
                                );
                            }

                            return enrolledIds.map((id: string, idx: number) => (
                                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-800">Course {id}</h4>
                                        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">IN PROGRESS</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">Module 1 • 35% Complete</span>
                                        <Link
                                            to={`/course/${id}/learn`}
                                            className="text-xs font-semibold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Continue
                                        </Link>
                                    </div>
                                </div>
                            ));
                        })()}

                        <div className="mt-8">
                            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Recent Badges</h4>
                            <div className="grid grid-cols-4 gap-3">
                                {badges.slice(0, 4).map((b, i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl transform transition hover:scale-110 cursor-help"
                                        style={{
                                            background: "white",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                            border: "1px solid #eee"
                                        }}
                                        title={b.emoji === "🔒" ? "Locked" : "Unlocked"}
                                    >
                                        {b.emoji}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamifiedDashboard;
