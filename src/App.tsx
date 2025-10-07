import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import MentorDashboard from "./components/MentorDashboard";
import GamifiedDashboard from "./components/GamifiedDashboard"; 

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/MentorDashboard" element={<MentorDashboard />} />
        <Route path="/GamifiedDashboard" element={<GamifiedDashboard />} /> 
      </Routes>
    </>
  );
};

export default App;