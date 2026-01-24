import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";

const CourseDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = React.useState(false);

    React.useEffect(() => {
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        if (id && enrolledCourses.includes(id)) {
            setIsEnrolled(true);
        }
    }, [id]);

    const handleEnroll = () => {
        if (!id) return;
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        if (!enrolledCourses.includes(id)) {
            enrolledCourses.push(id);
            localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
            setIsEnrolled(true);
            alert("Enrolled successfully! Redirecting to course...");
            navigate(`/course/${id}/learn`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-64 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('/HomeImages/HeroImg1.webp')` }}></div>
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course {id} Details</h1>
                        <p className="text-gray-600 mb-8">
                            This is a placeholder for the course details. In a real application, this would fetch data based on the ID {id}.
                        </p>
                        <div className="flex gap-4">
                            {isEnrolled ? (
                                <Link to={`/course/${id}/learn`} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                    Continue Learning
                                </Link>
                            ) : (
                                <button onClick={handleEnroll} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Enroll Now
                                </button>
                            )}
                            <Link to="/courses" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                                Back to Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetail;
