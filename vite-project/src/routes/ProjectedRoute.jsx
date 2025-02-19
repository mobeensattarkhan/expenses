import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  console.log({ currentUser });

  if (!currentUser) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
