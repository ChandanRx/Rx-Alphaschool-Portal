import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthWrapper = ({ children }) => {
  const { user } = useAuth();

  if (user?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthWrapper;
