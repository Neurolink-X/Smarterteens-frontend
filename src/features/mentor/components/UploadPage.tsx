
import {
    Upload,
    FileText,
    Star,
    PieChart as PieIcon,
} from "lucide-react";

const UploadPage = () => (
    <div className="p-6 flex flex-col gap-6 h-full bg-gradient-to-br from-pink-50 to-orange-50 overflow-y-auto scrollbar-hide">
        {/* Page Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Content</h1>
        <p className="text-gray-500 text-sm -mt-2">
            Share educational content with students here
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            {/* Upload Box */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-purple-400 transition">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-purple-500" />
                    </div>
                    <p className="text-gray-700 font-medium">Upload Content Here</p>
                    <p className="text-xs text-gray-400 text-center">
                        Drop files here or click to browse <br />
                        <span className="font-medium">PDF, DOC, MP4, PPT, Images</span> supported
                    </p>
                    <button className="mt-2 px-4 py-1.5 bg-purple-500 text-white text-sm rounded-lg shadow hover:bg-purple-600">
                        Choose Files
                    </button>
                </div>

                <div className="flex gap-4 mt-5">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 text-sm">
                        Upload and publish
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg shadow hover:bg-gray-200 text-sm">
                        Save as draft
                    </button>
                </div>
            </div>

            {/* Right Column: Stats + Recently Uploaded */}
            <div className="flex flex-col gap-4">
                {/* Upload Stats */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                        <PieIcon className="w-5 h-5 text-purple-500" /> Upload Statistics
                    </h2>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                            <span>Total Uploads</span>
                            <span className="font-bold text-gray-800">45</span>
                        </li>
                        <li className="flex justify-between">
                            <span>This Month</span>
                            <span className="font-bold text-green-500">12</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Total Downloads</span>
                            <span className="font-bold text-blue-500">387</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>Avg. Rating</span>
                            <span className="flex items-center gap-1 font-bold text-yellow-500">
                                <Star className="w-4 h-4 fill-yellow-500" /> 4.8
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Recently Uploaded */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h2 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                        <FileText className="w-5 h-5 text-pink-500" /> Recently Uploaded
                    </h2>
                    <ul className="text-sm space-y-2">
                        <li className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-red-400" /> Python Problems Set #1
                        </li>
                        <li className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-yellow-500" /> Tailwind Set #2 Solutions
                        </li>
                        <li className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-green-500" /> Kotlin Set #3 Solutions
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default UploadPage;
