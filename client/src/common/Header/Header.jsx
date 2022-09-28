import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import "./Header.css";

const Header = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const signOut = () => {
    setUser(null);
    navigate("/signin");
  };

  const handleIsActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between  bg-slate-800 h-16  text-white px-3 fixed top-0 left-0 w-full z-50 ">
      <Link className="font-bold" to={"/"}>
        KENGENKANRI
      </Link>
      {user && (
        <>
          <nav
            className={`primary-nav ${
              isActive ? "active" : ""
            } flex items-center justify-around w-1/3"`}
          >
            <Link onClick={handleIsActive} to="/">
              Home
            </Link>
            <Link onClick={handleIsActive} to="userManagement">
              User
            </Link>
            <Link onClick={handleIsActive} to="roleManagement">
              Role
            </Link>
            <Link onClick={handleIsActive} to="permissionManagement">
              Permission
            </Link>
            <button onClick={signOut}>Logout</button>
          </nav>
          <div
            className={`burger-menu ${isActive ? "active" : ""}`}
            onClick={handleIsActive}
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
