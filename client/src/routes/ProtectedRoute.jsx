import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = () => {
  // Get token from auth slice
  const { token } = useSelector((state) => state.auth);

  // If user is not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
