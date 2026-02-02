import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen min-h-[100dvh] font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none"
            >
                Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="flex-grow w-full pt-[var(--navbar-height)]" role="main" tabIndex={-1}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
