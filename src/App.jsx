import { Route, Routes } from "react-router-dom";
import "./App.css";
import ParentHomeLayout from "./Homepage/MainHome/ParentHomeLayout";
import Navbar from "./Navigation-Components/NavBar";
import SignUp from "./LoginPage/SignUp";
import Login from "./LoginPage/Login";
import ForeverDashboard from "./ForeverDashboard";

import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import JobSeekerDashboard from "./JobSeeker";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<ParentHomeLayout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Define protected routes */}
          <Route element={<ProtectedRoute requiredRole="employer" />}>
            <Route path="/dashboard" element={<ForeverDashboard />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole="job_seeker" />}>
            <Route path="/jobseeker" element={<JobSeekerDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
