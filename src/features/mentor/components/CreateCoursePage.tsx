

const CreateCoursePage = () => {
    return (
        <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>
                <p className="text-sm text-gray-500">
                    Fill in the details to publish your new course.
                </p>
            </div>

            {/* Form */}
            <form className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
                <label className="flex flex-col text-sm font-medium text-gray-700">
                    Course Title
                    <input
                        type="text"
                        placeholder="Enter course title"
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-green-200"
                    />
                </label>

                <label className="flex flex-col text-sm font-medium text-gray-700">
                    Description
                    <textarea
                        placeholder="Write a brief description..."
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-green-200"
                        rows={4}
                    />
                </label>

                <label className="flex flex-col text-sm font-medium text-gray-700">
                    Category
                    <select className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:ring focus:ring-green-200">
                        <option>Select category</option>
                        <option>Programming</option>
                        <option>AI</option>
                        <option>Mathematics</option>
                        <option>Design</option>
                    </select>
                </label>

                <label className="flex flex-col text-sm font-medium text-gray-700">
                    Upload Thumbnail
                    <input
                        type="file"
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm"
                    />
                </label>

                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("Course publishing coming soon!");
                    }}
                    className="mt-3 px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow hover:scale-105 transition"
                >
                    Publish Course
                </button>
            </form>
        </div>
    );
};

export default CreateCoursePage;
