import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil semua user dari localStorage
    const users = JSON.parse(localStorage.getItem("user.json")) || [];

    // Cari user yang cocok
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      // Simpan user yang login
      localStorage.setItem("user", JSON.stringify(matchedUser));
      toastSuccess("Login berhasil!");

      // Redirect berdasarkan role
      switch (matchedUser.role) {
        case "admin":
          navigate("/Admin/Dashboard");
          break;
        case "mahasiswa":
          navigate("/Admin/Mhs");
          break;
        case "dosen":
          navigate("/Admin/Dosen");
          break;
        default:
          toastError("Role tidak dikenali.");
      }
    } else {
      toastError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Ingat saya
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Lupa password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
