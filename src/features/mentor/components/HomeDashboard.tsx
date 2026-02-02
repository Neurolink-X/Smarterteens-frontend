import {
    BookOpen,
    Clock,
    UserCircle,
    CheckCircle,
    FileText,
    Users,
    Upload,
} from "lucide-react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
} from "recharts";

// Main Dashboard (Home)
const HomeDashboard = ({
    tab,
    setTab,
}: {
    tab: "students" | "submissions";
    setTab: React.Dispatch<React.SetStateAction<"students" | "submissions">>;
}) => (
    <div className="space-y-6 mt-5 flex-1 overflow-y-auto">
        {/* Welcome Message */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                Welcome to Your Mentor Dashboard
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Your comprehensive teaching toolkit is being built. Below is a preview of features
                that will be available soon.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <BookOpen className="w-5 h-5 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">Course Creation</h3>
                    <p className="text-xs text-gray-500">Coming soon</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <Users className="w-5 h-5 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">Student Insights</h3>
                    <p className="text-xs text-gray-500">Coming soon</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <Upload className="w-5 h-5 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">Content Library</h3>
                    <p className="text-xs text-gray-500">Coming soon</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-5">
                {/* Latest Content */}
                <div className="bg-gradient-to-tr from-orange-100 via-pink-50 to-white rounded-2xl p-4 shadow-sm border border-gray-200">
                    <h2 className="flex items-center gap-2 font-semibold text-sm mb-2 text-gray-700">
                        <BookOpen className="w-4 h-4 text-orange-500" /> Latest Content
                    </h2>
                    <div className="flex items-center gap-3">
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                            alt="python"
                            className="w-12 h-12"
                        />
                        <div>
                            <h3 className="font-bold text-sm">Introduction to Python</h3>
                            <p className="text-xs text-gray-500">Beginner • 30 questions</p>
                            <p className="text-xs text-gray-400">
                                Sample course content preview
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic">
                        Full content management coming soon
                    </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                    {/* Heading */}
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        <h2 className="text-lg font-semibold text-gray-800">Assignment Stats</h2>
                    </div>

                    {/* Legend + Chart */}
                    <div className="flex items-center justify-between flex-1">
                        {/* Legend */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-300"></span>
                                <span>Overview <strong>2</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
                                <span>Pending <strong>3</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-300"></span>
                                <span>Graded <strong>10</strong></span>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="w-40 h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Overview", value: 2, fill: "#FCA5A5" },
                                            { name: "Pending", value: 3, fill: "#FCD34D" },
                                            { name: "Graded", value: 10, fill: "#86EFAC" },
                                        ]}
                                        innerRadius="40%"
                                        outerRadius="90%"
                                        paddingAngle={3}
                                        dataKey="value"
                                    />
                                    <Tooltip
                                        contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="bg-gradient-to-tr from-blue-50 via-indigo-50 to-white rounded-2xl p-3 shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
                <div className="flex mb-3 bg-gray-100 rounded-full p-1">
                    <button
                        className={`flex-1 py-1.5 text-sm rounded-full transition-all duration-200 ${
                            tab === "students"
                                ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setTab("students")}
                    >
                        Students
                    </button>
                    <button
                        className={`flex-1 py-1.5 text-sm rounded-full transition-all duration-200 ${
                            tab === "submissions"
                                ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setTab("submissions")}
                    >
                        Submissions
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 text-sm">
                    {tab === "students" ? (
                        <ul className="space-y-2">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2 hover:from-gray-100 hover:to-gray-200 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <UserCircle className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <p className="font-medium text-blue-600 text-sm">
                                                Student {idx + 1}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                student{idx + 1}@example.com
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-0.5 bg-gradient-to-r from-green-200 to-green-400 text-green-800 text-xs rounded-full flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Excellent
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-2">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2 hover:from-gray-100 hover:to-gray-200 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-yellow-500" />
                                        <div>
                                            <p className="font-medium text-sm">Assignment {idx + 1}</p>
                                            <p className="text-xs text-gray-500">Submitted Today</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-0.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 text-xs rounded-full flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Pending
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default HomeDashboard;
