import { useState } from "react";
import {
    Star,
    Clock,
    TrendingUp,
    FileText,
    Download,
} from "lucide-react";
import { submissions, type Submission } from "../data/mockData";

const SubmissionsPage = () => {
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    return (
        <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Review Submissions</h1>
                    <p className="text-sm text-gray-500">
                        Manage and track your students’ progress here
                    </p>
                </div>
                <select className="px-3 py-1.5 rounded-lg border text-sm shadow-sm">
                    <option>All Submissions</option>
                    <option>Graded</option>
                    <option>Pending</option>
                </select>
            </div>



            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-t-4 border-green-400">
                    <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-green-500" />
                        <p className="text-sm font-medium">Graded</p>
                    </div>
                    <span className="text-lg font-bold">3</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-t-4 border-yellow-400">
                    <div className="flex items-center gap-2">
                        <Clock className="w-6 h-6 text-yellow-500" />
                        <p className="text-sm font-medium">Pending for Review</p>
                    </div>
                    <span className="text-lg font-bold">3</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-t-4 border-purple-400">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-purple-500" />
                        <p className="text-sm font-medium">Average Progress</p>
                    </div>
                    <span className="text-lg font-bold">83%</span>
                </div>
            </div>

            {/* Submissions Queue */}
            <h2 className="text-lg font-semibold text-gray-800">Submissions Queue</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Side: Submissions List */}
                <div className="flex flex-col gap-4">
                    {submissions.map((s) => (
                        <div key={s.id} className="bg-white rounded-xl shadow-md p-4 flex gap-3">
                            <img
                                src={s.avatar}
                                alt={s.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">{s.name}</p>
                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                        {s.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{s.assignment}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <FileText className="w-4 h-4" /> PDF • Due: {s.due} • {s.submittedAgo}
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">
                                        View
                                    </button>
                                    <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 flex items-center gap-1">
                                        <Download className="w-3 h-3" /> Download
                                    </button>
                                    <button
                                        onClick={() => setSelectedSubmission(s)}
                                        className="px-3 py-1 text-xs rounded bg-purple-500 text-white hover:bg-purple-600"
                                    >
                                        Grade
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Grading Form or Placeholder */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    {selectedSubmission ? (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Grade Assignment
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {selectedSubmission.name} — {selectedSubmission.assignment}
                            </p>

                            <form className="flex flex-col gap-3">
                                <label className="text-sm font-medium text-gray-700">
                                    Score
                                    <input
                                        type="number"
                                        placeholder="Enter score"
                                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-purple-200"
                                    />
                                </label>

                                <label className="text-sm font-medium text-gray-700">
                                    Feedback
                                    <textarea
                                        placeholder="Write feedback..."
                                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-purple-200"
                                        rows={4}
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                                >
                                    Submit Grade
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center">
                            <FileText className="w-10 h-10 text-gray-400 mb-2" />
                            <h3 className="font-semibold text-gray-700">Select a Submission</h3>
                            <p className="text-xs text-gray-500">
                                Choose a submission and start grading.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmissionsPage;
