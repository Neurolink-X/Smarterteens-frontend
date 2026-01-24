
const ProfilePage = ({ setActivePage }: { setActivePage: any }) => (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-4">
            <img
                src="https://media.craiyon.com/2025-04-17/goEEGsqJStOoz8UpaGH4YQ.webp"
                alt="profile"
                className="w-20 h-20 rounded-full border shadow"
            />
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Lorem Ipsum</h1>
                <p className="text-gray-600 text-sm">AI Specialist</p>
                <p className="text-gray-500 text-xs">PhD in Artificial Intelligence</p>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-lg font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-500">Courses</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-lg font-bold text-blue-600">325</p>
                <p className="text-sm text-gray-500">Students</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-lg font-bold text-green-600">4.9</p>
                <p className="text-sm text-gray-500">Rating</p>
            </div>
        </div>

        {/* My Courses Button */}
        <button
            onClick={() => setActivePage("courses")}
            className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow hover:scale-105 transition"
        >
            My Courses
        </button>
    </div>
);

export default ProfilePage;
