import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
