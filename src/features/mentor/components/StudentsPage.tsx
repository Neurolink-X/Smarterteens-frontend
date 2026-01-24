
import {
    Star,
    AlertCircle,
    TrendingUp,
    BookOpen,
    Clock,
} from "lucide-react";
import { students } from "../data/mockData";

const StudentsPage = () => (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-gradient-to-br from-purple-50 to-blue-50">

        {/* Header */}
        <div>
            <h1 className="text-xl font-bold text-gray-800">Assigned Students</h1>
            <p className="text-sm text-gray-500">
                Manage and track your students’ progress here
            </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 border-green-400">
                <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-green-500" />
                    <p className="text-sm font-medium">Top Performers</p>
                </div>
                <span className="text-lg font-bold">3</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 border-yellow-400">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                    <p className="text-sm font-medium">Needs Attention</p>
                </div>
                <span className="text-lg font-bold">1</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 border-purple-400">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                    <p className="text-sm font-medium">Average Progress</p>
                </div>
                <span className="text-lg font-bold">83%</span>
            </div>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full overflow-y-auto no-scrollbar max-h-[500px] pr-2">
            {students.map((student) => (
                <div
                    key={student.id}
                    className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 hover:shadow-lg transition"
                >
                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full border border-gray-200"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">Overall Progress</p>
                            <span className="text-xs font-semibold text-gray-600">
                                {student.progress}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all"
                                style={{ width: `${student.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Assignments & Subjects */}
                    <div className="mt-2 flex flex-col gap-1 text-xs text-gray-600">
                        <p className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Assignments:{" "}
                            <span className="font-medium">{student.assignments}</span>
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {student.subjects.map((sub, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 text-[11px] shadow-sm"
                                >
                                    {sub}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Last Active */}
                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-auto">
                        <Clock className="w-3 h-3" /> Last active: {student.lastActive}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default StudentsPage;
