import React from "react";

const Button = ({ children, type = "button", onClick, className }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-white transition duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
