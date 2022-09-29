import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={"/signin"} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
