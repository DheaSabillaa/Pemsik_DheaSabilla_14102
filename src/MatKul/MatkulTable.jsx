// File: MatkulTable.jsx
import React from "react";

const MatkulTable = ({ matkul, openEditModal, onDelete }) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Kode</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {matkul.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              Belum ada data mata kuliah
            </td>
          </tr>
        ) : (
          matkul.map((mk, index) => (
            <tr key={index} className="even:bg-gray-100 odd:bg-white">
              <td className="py-2 px-4">{mk.kode}</td>
              <td className="py-2 px-4">{mk.nama}</td>
              <td className="py-2 px-4">{mk.sks}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => openEditModal(mk)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => onDelete(mk.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default MatkulTable;

// File: ../Utils/Apis/MatkulApi.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/matkul"; // Ganti sesuai backend kamu

export const getAllMatkul = () => axios.get(API_URL);
export const storeMatkul = (data) => axios.post(API_URL, data);
export const updateMatkul = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMatkul = (id) => axios.delete(`${API_URL}/${id}`);
