import React from "react";

const FormSubmitBtn = ({ children }) => {
  return (
    <div>
      <button className="border-2 p-2 mt-5" type="submit">
        {children}
      </button>
    </div>
  );
};

export default FormSubmitBtn;
