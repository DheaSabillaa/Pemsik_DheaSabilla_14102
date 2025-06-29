import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !role) {
      toastError("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      toastError("Password tidak cocok.");
      return;
    }

    // Ambil user yang sudah ada dari localStorage
    const existingUsers = JSON.parse(localStorage.getItem("user.json")) || [];

    // Cek apakah email sudah terdaftar
    const isDuplicate = existingUsers.some((user) => user.email === email);
    if (isDuplicate) {
      toastError("Email sudah terdaftar!");
      return;
    }

    // Tambahkan user baru
    const newUser = { email, password, role };
    existingUsers.push(newUser);

    // Simpan kembali ke localStorage
    localStorage.setItem("user.json", JSON.stringify(existingUsers));

    toastSuccess("Registrasi berhasil. Silakan login!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Daftar sebagai
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">-- Pilih Role --</option>
              <option value="admin">Admin</option>
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
