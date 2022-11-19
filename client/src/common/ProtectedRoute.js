import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header/Header";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="pt-20">
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
