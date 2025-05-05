import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { logoutUser } from "../../Projects/DOCUMENT/utils/helper";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("credential");
  useEffect(() => {
    if (!isAuthenticated) {
      logoutUser();
    }
  }, [isAuthenticated, logoutUser]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
