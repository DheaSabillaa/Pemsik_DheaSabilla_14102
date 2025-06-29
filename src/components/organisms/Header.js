import React from "react";
import ProfileMenu from "../molecules/ProfileMenu";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Mahasiswa</h1>
        <ProfileMenu />
      </div>
    </header>
  );
};
export default Header;
