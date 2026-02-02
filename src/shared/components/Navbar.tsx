import {
    Circle,
    Dot,
    GraduationCap,
    Menu,
    UserPlus,
    X,
    Search,
    ChevronDown,
    BookOpen,
    Sparkles,
    Users,
    Eye,
    Shield,
} from "lucide-react";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { cn } from "../utils/cn";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const navigate = useNavigate();

    const handleSearchSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const q = searchQuery.trim();
            if (q) navigate(`/courses?q=${encodeURIComponent(q)}`);
            else navigate("/courses");
            setSearchQuery("");
            setSearchFocused(false);
        },
        [searchQuery, navigate]
    );

    const mainNavLinks = [
        { label: "Home", path: "/", icon: null },
        { label: "Courses", path: "/courses", icon: "courses" },
    ];

    const learnDropdownItems = [
        { label: "Browse Courses", path: "/courses", icon: BookOpen, desc: "Explore all courses" },
        { label: "My Learning", path: "/GamifiedDashboard", icon: Sparkles, desc: "Dashboard & progress" },
    ];

    const forDropdownItems = [
        { label: "For Students", path: "/courses", icon: GraduationCap, desc: "Start learning" },
        { label: "For Parents", path: "/parent-view", icon: Eye, desc: "Track progress" },
        { label: "Mentors", path: "/MentorDashboard", icon: Users, desc: "Mentor dashboard" },
        { label: "Admin", path: "/AdminDashboard", icon: Shield, desc: "Platform admin" },
    ];

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 shadow-sm"
            style={{ height: "var(--navbar-height)" }}
        >
            <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto gap-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 min-h-[44px] min-w-[44px] -ml-2 rounded-xl hover:bg-gray-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0"
                    aria-label="SmarterTeens Home"
                >
                    <img
                        src="/NavbarImages/SmaterTeensLogo.jpg"
                        alt=""
                        className="w-9 h-9 rounded-lg object-cover"
                    />
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 hidden sm:inline">
                        Smarter<span className="text-yellow-500">Teens</span>
                    </span>
                </Link>

                {/* Desktop: Search bar (premium) */}
                <form
                    onSubmit={handleSearchSubmit}
                    className={cn(
                        "hidden md:flex flex-1 max-w-md mx-4 transition-all duration-200",
                        searchFocused && "max-w-lg"
                    )}
                >
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="search"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            className="w-full min-h-[42px] pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 focus:bg-white transition-colors"
                            aria-label="Search courses"
                        />
                    </div>
                </form>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0" aria-label="Main">
                    {mainNavLinks.map((link, index) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {index === 0 && (
                                <>
                                    <Circle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                    <Dot size={20} className="text-gray-500 -ml-2 flex-shrink-0" />
                                </>
                            )}
                            <span>{link.label}</span>
                        </Link>
                    ))}

                    {/* Learn dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-haspopup="true"
                                aria-expanded={undefined}
                            >
                                <BookOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span>Learn</span>
                                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 rounded-xl shadow-lg border-gray-200">
                            <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Learning
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {learnDropdownItems.map((item) => (
                                <DropdownMenuItem key={item.path} asChild>
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-3 py-2.5 cursor-pointer"
                                    >
                                        <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-900">{item.label}</div>
                                            <div className="text-xs text-gray-500">{item.desc}</div>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* For (Students / Parents / etc.) dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-haspopup="true"
                            >
                                <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span>For</span>
                                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 rounded-xl shadow-lg border-gray-200">
                            <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Who
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {forDropdownItems.map((item) => (
                                <DropdownMenuItem key={item.path} asChild>
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-3 py-2.5 cursor-pointer"
                                    >
                                        <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                                        <div>
                                            <div className="font-medium text-gray-900">{item.label}</div>
                                            <div className="text-xs text-gray-500">{item.desc}</div>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link
                        to="/courses"
                        className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl hover:from-blue-800 hover:to-indigo-900 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm"
                    >
                        Browse Courses
                    </Link>
                    <Link
                        to="/auth?mode=signup"
                        className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm"
                    >
                        <UserPlus className="w-4 h-4" aria-hidden />
                        Sign Up
                    </Link>
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-700 hover:text-blue-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl safe-area-pb">
                    <div className="px-4 pt-3 pb-2">
                        <form onSubmit={handleSearchSubmit} className="mb-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    </div>
                    <nav className="flex flex-col py-2 px-4 gap-0.5" aria-label="Mobile menu">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                        >
                            <Circle className="w-4 h-4 text-gray-500" />
                            <Dot size={20} className="text-gray-500 -ml-2" />
                            Home
                        </Link>
                        <Link
                            to="/courses"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                        >
                            <BookOpen className="w-4 h-4 text-gray-500" />
                            Courses
                        </Link>
                        <Link
                            to="/GamifiedDashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                        >
                            <Sparkles className="w-4 h-4 text-gray-500" />
                            My Learning
                        </Link>
                        <Link
                            to="/parent-view"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                        >
                            <Eye className="w-4 h-4 text-gray-500" />
                            For Parents
                        </Link>
                        <Link
                            to="/MentorDashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                        >
                            <GraduationCap className="w-4 h-4 text-gray-500" />
                            Mentors
                        </Link>
                        <Link
                            to="/AdminDashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                        >
                            <Shield className="w-4 h-4 text-gray-500" />
                            Admin
                        </Link>
                        <div className="border-t border-gray-100 my-2" />
                        <Link
                            to="/courses"
                            onClick={() => setIsMenuOpen(false)}
                            className="min-h-[48px] flex items-center justify-center mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl font-medium"
                        >
                            Browse Courses
                        </Link>
                        <Link
                            to="/auth?mode=signup"
                            onClick={() => setIsMenuOpen(false)}
                            className="min-h-[48px] flex items-center justify-center gap-2 mx-4 mb-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium"
                        >
                            <UserPlus className="w-4 h-4" />
                            Sign Up
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
