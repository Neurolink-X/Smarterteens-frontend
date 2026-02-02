import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen text-center bg-gray-50 px-4 py-12 safe-area-inset">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-blue-600 mb-4">404</h1>
            <p className="text-lg sm:text-xl text-gray-700 font-medium mb-6 sm:mb-8 max-w-md">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
