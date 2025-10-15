import { Circle, Dot, GraduationCap, Menu, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Heurt", path: "/Heurt" },
    { label: "Mentor Dashboard", path: "/MentorDashboard" },
    { label: "Stodice", path: "/Heurt" },
    { label: "Gamified Dashboard", path: "/GamifiedDashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex justify-between items-center px-4 py-3 lg:px-8 lg:py-4 shadow-md bg-white/70 backdrop-blur-md">
        {/*Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex">
          <img
            src="/NavbarImages/SmaterTeensLogo.jpg"
            alt="SmarterTeensLogo"
            className="w-9 h-9"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Smarter<span className="text-yellow-500">Teens</span>
          </h1>
          </Link>
        </div>

        {/*Desktop Navigation*/}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-1 text-gray-700">
              {index < 2 && (
                <div className="relative flex justify-center mr-1">
                  <Circle className="w-4 h-4 text-gray-600 mt-1" />
                  <Dot size={25} className="absolute mt-3 text-gray-600" />
                </div>
              )}
              {index === 2 && (
                <GraduationCap className="w-5 h-5 text-gray-600 mt-1" />
              )}
              <Link
                to={link.path}
                className="text-gray-700 hover:text-blue-900 transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
          <button className="px-4 py-2 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-lg hover:from-blue-800 hover:to-indigo-900 transition-all duration-300">
            <Link to="/Heurt">Admin</Link>
          </button>

         <Link
          to="/auth?mode=signup"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
             Sign Up
            </Link>

        </nav>

        {/*Mobile Menu Button*/}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-blue-900 transition-all duration-300"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-md">
          <nav className="flex flex-col space-y-4 py-5 px-6 text-gray-700">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-blue-900 transition-colors"
              >
                {index < 2 && (
                  <div className="relative flex justify-center mr-1">
                    <Circle className="w-4 h-4 text-gray-600 mt-1" />
                    <Dot size={25} className="absolute mt-3 text-gray-600" />
                  </div>
                )}
                {index === 2 && (
                  <GraduationCap className="w-5 h-5 text-gray-600 mt-1" />
                )}
                {link.label}
              </Link>
            ))}

            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-lg hover:from-blue-800 hover:to-indigo-900 transition-all duration-300">
              <Link to="/Admin" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            </button>

            <Link
              to="/auth?mode=signup"
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
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
