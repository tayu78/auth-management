import React from "react";

const FormInput = ({ label, value, handleChange, type = "text" }) => {
  return (
    <div className="relative mb-5">
      <input
        id={label}
        type={type}
        className="input-text border  w-ful h-full rounded outline-none p-3  hover:border-blue-500 focus:border-blue-600 "
        value={value}
        onChange={handleChange}
        placeholder=" "
        autocomplete="off"
      />
      <label
        htmlFor={label}
        className="absolute top-2 left-3 text-xl text-gray-500 transition-input-label  duration-100 ease-in "
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;

//
