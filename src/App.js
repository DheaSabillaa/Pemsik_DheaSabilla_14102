import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./admin/Admin";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import DetailMahasiswa from "./admin/DetailMahasiswa";
import Mhs from "./admin/Mhs";
import Mahasiswa from "./Mahasiswa/Mahasiswa";
import Dosen from "./admin/Dosen";
import Matkul from "./admin/Matkul";
import Register from "./pages/Register";
// import Kelas from "./admin/Kelas";
import Kelas from "./admin/Kelas";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Admin/Mhs" element={<Mhs />} />
      <Route path="/Admin/Dashboard" element={<Dashboard />} />
      <Route path="/Admin/Kelas" element={<Kelas />} />
      <Route path="/Mahasiswa/Mahasiswa" element={<Mahasiswa />} />
      <Route
        path="Admin/Mahasiswa/DetailMahasiswa"
        element={<DetailMahasiswa />}
      />
      <Route path="/Admin/Dosen" element={<Dosen />} />
      <Route path="/Admin/Matkul" element={<Matkul />} />

      <Route
        path="/Admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
