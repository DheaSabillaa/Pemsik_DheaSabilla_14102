import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white h-screen w-64">
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <span className="text-2xl font-bold">Admin</span>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink
          to="/Admin/Dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <span className="text-lg">🏠</span>
          <span className="menu-text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/Admin/Mhs"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <span className="text-lg">🎓</span>
          <span className="menu-text">Mahasiswa</span>
        </NavLink>

        <NavLink
          to="/Admin/Dosen"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <span className="text-lg">👨‍🏫</span>
          <span className="menu-text">Dosen</span>
        </NavLink>

        <NavLink
          to="/Admin/Matkul"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <span className="text-lg">📘</span>
          <span className="menu-text">Mata Kuliah</span>
        </NavLink>

        {/* ✅ Tambahkan Menu Kelas */}
        <NavLink
          to="/Admin/Kelas"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <span className="text-lg">🏫</span>
          <span className="menu-text">Kelas</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
