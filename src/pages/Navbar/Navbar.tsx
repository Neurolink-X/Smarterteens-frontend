import { Circle, Dot, GraduationCap, Menu, UserPlus } from 'lucide-react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  // const [isMenuOpen] = useState(false) // not yet used, so we keep state but remove setter
  // const [isAuthOpen] = useState(false) // same here

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="w-full flex h-15 justify-between bg-white/60 backdrop-blur-md p-3 rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex mb-6">
          <img
            src="/SmaterTeensLogo.jpg"
            alt="SmaterTeensLogo"
            className="w-9 h-9 mr-2"
          />
          <div>
            <h1 className="text-3xl font-bold text-black">
              Smarter<span className="text-yellow-500">Teens</span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-evenly gap-5 m-3">
          <div className="flex my-6 lg:mx-4 ">
            <Menu className="w-6 h-6 text-gray-600" />
          </div>

          <div className="flex my-6 lg:mx-2">
            <div className="flex justify-center mr-1">
              <Circle className="w-4 h-4 text-gray-600 mt-1" />
              <Dot size={25} className="absolute mt-3 text-gray-600" />
            </div>
            <Link to="/Heurt">Heurt</Link>
          </div>

          <div className="flex my-6 lg:mx-2">
            <div className="flex justify-center mr-1">
              <Circle className="w-4 h-4 text-gray-600 mt-1" />
              <Dot size={25} className="absolute mt-3 text-gray-600" />
            </div>
            <Link to="/MentorDashboard">Mentor Dashboard</Link>
          </div>

          <div className="flex my-6 lg:mx-2">
            <div className="flex justify-center mr-1">
              <GraduationCap className="w-6 h-6 text-gray-600 mt-1" />
            </div>
          </div>

          <div className="flex my-6 lg:mx-2">
            <div className="flex justify-center mr-1">
              <Link to="/Heurt">Stodice</Link>
            </div>
          </div>

          <div className="flex my-6 lg:mx-2">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-lg hover:from-blue-800 hover:to-indigo-900 transition-all duration-300 flex items-center gap-2">
              <Link to="/Heurt">Continue</Link>
            </button>
          </div>

          <div className="flex my-6 lg:mx-2">
            <Link
              to="/auth?mode=signup"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
