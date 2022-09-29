import React from "react";

const Modal = ({ setIsOpen, children }) => {
  const handleClick = (e) => {
    if (e.currentTarget !== e.target) return;
    setIsOpen(false);
  };
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClick}
    >
      <div className="p-5 bg-white rounded ">
        <div className="flex justify-end  mr-5">
          <button className="text-2xl" onClick={handleClick}>
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
