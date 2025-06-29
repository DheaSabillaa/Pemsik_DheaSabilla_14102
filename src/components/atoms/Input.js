import React from "react";

const Input = ({ type, id, placeholder, required }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
};

export default Input;
