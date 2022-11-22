import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-blue-linear w-screen h-screen">
      <Logo />
      <div className="absolute top-60 left-32 md:left-1/10 ">
        <h1 className="font-blue-linear text-6xl font-bold md:text-5hxl sm:text-4hxl">
          This is what you have wanted
        </h1>
        <p className="text-4xl w-3/5 sm:w-full text-gray-400 leading-tight md:text-2xl sm:text-xl">
          On KengenKanri, you can magage your application user’s permission
          flexibly
        </p>
        <button
          className="bg-blue-500 text-white p-3 rounded-md  mt-10 "
          onClick={() => navigate("/signin")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
