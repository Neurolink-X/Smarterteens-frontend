import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./shared/layouts/MainLayout";
import { AuthLayout } from "./shared/layouts/AuthLayout";

// Feature Components
import Hero from "./features/landing/components/Hero";
import Courses from "./features/landing/components/Courses";
import AuthPage from "./features/auth/components/AuthPage";
import MentorDashboard from "./features/mentor/pages/MentorDashboard";
import GamifiedDashboard from "./features/student/components/GamifiedDashboard";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import CourseDetail from "./features/landing/pages/CourseDetail";
import CoursePlayer from "./features/landing/pages/CoursePlayer";
import ParentView from "./features/landing/components/ParentView";

// Legacy Components (To be refactored)

const App = () => {
  return (
    <Routes>
      {/* Public Layout Routes */}
      <Route element={<MainLayout />}>
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
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/course/:id/learn" element={<CoursePlayer />} />
        <Route path="/parent-view" element={<ParentView />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />
      </Route>

      {/* Isolated Dashboard Routes */}
      <Route path="/MentorDashboard" element={<MentorDashboard />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/GamifiedDashboard" element={<GamifiedDashboard />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
