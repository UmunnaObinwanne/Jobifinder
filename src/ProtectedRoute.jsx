import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Contexts/LoginContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { currentUser, currentUserRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or some placeholder
  }

  if (!currentUser) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  } else if (requiredRole && currentUserRole !== requiredRole) {
    // If user does not have the required role, redirect to home
    return <Navigate to="/" />;
  } else {
    // If user is authenticated and has the required role, render the children components
    return <Outlet />;
  }
};

export default ProtectedRoute;
