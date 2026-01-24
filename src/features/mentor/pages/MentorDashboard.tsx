import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Upload, FileText, Bell, Search } from "lucide-react";

import HomeDashboard from "../components/HomeDashboard";
import StudentsPage from "../components/StudentsPage";
import UploadPage from "../components/UploadPage";
import SubmissionsPage from "../components/SubmissionsPage";
import ProfilePage from "../components/ProfilePage";
import CoursesPage from "../components/CoursesPage";
import CreateCoursePage from "../components/CreateCoursePage";
import ViewCoursePage from "../components/ViewCoursePage";

import { initialNotifications, type Notification } from "../data/mockData";
import type { ActivePageType } from "../types";

const MentorDashboard: React.FC = () => {
    const [tab, setTab] = useState<"students" | "submissions">("students");
    const [activePage, setActivePage] = useState<ActivePageType>("home");

    // notifications state + dropdown control
    const [notifications, setNotifications] =
        useState<Notification[]>(initialNotifications);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement | null>(null);

    const unreadCount = notifications.filter((n) => n.unread).length;

    function toggleNotif() {
        setNotifOpen((prev) => !prev);
    }

    function markAsRead(id: number) {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
        );
    }

    function markAllRead() {
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    }

    // click outside to close
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        }
        if (notifOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [notifOpen]);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center 
      bg-[radial-gradient(circle_at_top_left,_#fed7aa,_transparent_60%),radial-gradient(circle_at_top_right,_#fbcfe8,_transparent_60%),radial-gradient(circle_at_bottom_left,_#c7d2fe,_transparent_60%),radial-gradient(circle_at_bottom_right,_#d9f99d,_transparent_60%)] 
      py-10 px-6"
        >
            {/* Outer White Container */}
            <div className="flex max-w-5xl w-full h-[80vh] bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 gap-6">
                {/* Sidebar */}
                <aside className="w-16 bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col justify-center items-center py-6 space-y-6 rounded-3xl shadow-md">
                    <button
                        onClick={() => setActivePage("home")}
                        className="p-2 rounded-xl hover:bg-white/30"
                    >
                        <Home className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={() => setActivePage("students")}
                        className="p-2 rounded-xl hover:bg-white/30"
                    >
                        <Users className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={() => setActivePage("upload")}
                        className="p-2 rounded-xl hover:bg-white/30"
                    >
                        <Upload className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={() => setActivePage("submissions")}
                        className="p-2 rounded-xl hover:bg-white/30"
                    >
                        <FileText className="w-6 h-6 text-white" />
                    </button>
                </aside>

                {/* Main Container */}
                <main className="flex-1 bg-gradient-to-tr from-blue-50 via-indigo-50 to-white rounded-3xl p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-yellow-600 drop-shadow-sm">
                            Good Morning, Mentor!
                        </h1>

                        {/* Right side: Notifications + Profile */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative" ref={notifRef}>
                                <button
                                    onClick={toggleNotif}
                                    className="relative p-2 rounded-full hover:bg-gray-100 transition"
                                >
                                    <Bell className="w-5 h-5 text-gray-600" />
                                    {unreadCount > 0 && (
                                        <span
                                            className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-blue-600"
                                            style={{ transform: "translate(30%,-30%)" }}
                                        />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {notifOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full right-0 mt-2 w-80 rounded-2xl border border-white/20 
                       shadow-2xl bg-white/90 backdrop-blur-xl z-[9999] overflow-hidden"
                                        >
                                            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/50">
                                                <span className="text-sm font-semibold text-gray-800">
                                                    Notifications
                                                </span>
                                                <button
                                                    onClick={markAllRead}
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    Mark all read
                                                </button>
                                            </div>

                                            <div className="max-h-64 overflow-y-auto">
                                                {notifications.map((n) => (
                                                    <button
                                                        key={n.id}
                                                        onClick={() => markAsRead(n.id)}
                                                        className={`w-full text-left px-4 py-3 flex gap-3 items-start transition 
                              hover:bg-white/40 ${n.unread ? "bg-blue-50/60" : ""
                                                            }`}
                                                    >
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {n.title}
                                                                </p>
                                                                <span className="text-xs text-gray-400">
                                                                    {n.time}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 mt-1">
                                                                {n.body}
                                                            </p>
                                                        </div>
                                                        {n.unread && (
                                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="px-3 py-2 border-t border-gray-200/50">
                                                <a
                                                    href="#"
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    View all
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile button */}
                            <button
                                onClick={() => setActivePage("profile")}
                                className="flex items-center gap-2 hover:opacity-80 transition"
                            >
                                <img
                                    src="https://media.craiyon.com/2025-04-17/goEEGsqJStOoz8UpaGH4YQ.webp"
                                    alt="profile"
                                    className="w-9 h-9 rounded-full"
                                />
                                <div className="hidden sm:block">
                                    <p className="font-medium text-sm">Lorem Ipsum</p>
                                    <p className="text-xs text-gray-500">AI Specialist</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-5 relative max-w-sm">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-full px-9 py-2.5 bg-white shadow-sm outline-none text-sm"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>

                    {/* Dynamic Pages */}
                    <div className="flex-1 mt-5 overflow-hidden">
                        {typeof activePage === "string" && activePage === "home" && (
                            <HomeDashboard tab={tab} setTab={setTab} />
                        )}
                        {typeof activePage === "string" &&
                            activePage === "students" && <StudentsPage />}
                        {typeof activePage === "string" &&
                            activePage === "upload" && <UploadPage />}
                        {typeof activePage === "string" &&
                            activePage === "submissions" && <SubmissionsPage />}
                        {typeof activePage === "string" && activePage === "profile" && (
                            <ProfilePage setActivePage={setActivePage} />
                        )}
                        {typeof activePage === "string" && activePage === "courses" && (
                            <CoursesPage setActivePage={setActivePage} />
                        )}
                        {typeof activePage === "string" &&
                            activePage === "create-course" && <CreateCoursePage />}

                        {/* NEW: Handle object case for viewing a course */}
                        {typeof activePage !== "string" &&
                            activePage.page === "view-course" && (
                                <ViewCoursePage
                                    course={activePage.course}
                                    setActivePage={setActivePage}
                                />
                            )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MentorDashboard;
