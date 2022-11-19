import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-blue-linear w-screen h-screen">
      <div className="font-blue-linear font-bold text-base absolute top-8 left-8  ">
        KENGEN-KANRI
      </div>
      <div className="absolute top-60 left-32 ">
        <h1 className="font-blue-linear text-6xl font-bold">
          This is what you have wanted
        </h1>
        <p className="text-4xl w-3/5 text-gray-400 leading-tight">
          On KengenKanri, you can magage your application user’s permission
          flexibly
        </p>
        <button
          className="bg-blue-500 text-white p-3 rounded-md ml-14 mt-10 "
          onClick={() => navigate("/signin")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
