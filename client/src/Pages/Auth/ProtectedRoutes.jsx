import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { logoutUser } from "../../projects/document/utils/helper";
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("credential");
  const token = Cookies.get('token');
  useEffect(() => {
    if (!isAuthenticated && !token) {
      logoutUser();
    }
  }, [isAuthenticated, logoutUser]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;