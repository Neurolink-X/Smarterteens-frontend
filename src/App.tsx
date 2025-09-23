import { Routes, Route } from "react-router-dom";
import Navbar from './pages/Navbar/Navbar';
import MentorDashboard from "./components/MentorDashboard";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/MentorDashboard" element={<MentorDashboard />} />
       
      </Routes>
    </div>
  );
};

export default App;
