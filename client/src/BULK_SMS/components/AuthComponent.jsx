import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthComponent = ({ Component }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("credential");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return <Component />;
};

export default AuthComponent;
