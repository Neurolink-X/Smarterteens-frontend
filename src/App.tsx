import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Home/Footer";
import Hero from "./pages/Home/Hero";
import Courses from "./pages/Home/Courses";
import MentorDashboard from "./components/MentorDashboard";
import GamifiedDashboard from "./components/GamifiedDashboard";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <Navbar />

      
      <main className="flex-grow">
        <Routes>
          
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Courses />
              </>
            }
          />

         
          <Route path="/courses" element={<Courses />} />

          <Route path="/MentorDashboard" element={<MentorDashboard />} />

         
          <Route path="/GamifiedDashboard" element={<GamifiedDashboard />} />

          
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                <p className="text-gray-600">Oops! Page not found.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
