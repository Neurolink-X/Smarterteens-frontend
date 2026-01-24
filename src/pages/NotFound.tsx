import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
            <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 font-medium mb-8">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
