// File: Matkul.jsx
import React, { useState, useEffect } from "react";
import MatkulModal from "./MatkulModal";
import MatkulTable from "./MatkulTable";
import {
  getAllMatkul,
  storeMatkul,
  updateMatkul,
  deleteMatkul,
} from "../Utils/Apis/MatkulApi";

const Matkul = () => {
  const [matkul, setMatkul] = useState([]);
  const [selectedMatkul, setSelectedMatkul] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", kode: "", nama: "", sks: 0 });

  const fetchMatkul = async () => {
    try {
      const res = await getAllMatkul();
      setMatkul(res.data);
    } catch (error) {
      console.error("Gagal mengambil data mata kuliah:", error);
    }
  };

  useEffect(() => {
    fetchMatkul();
  }, []);

  const openAddModal = () => {
    setSelectedMatkul(null);
    setForm({ id: "", kode: "", nama: "", sks: 0 });
    setModalOpen(true);
  };

  const openEditModal = (mk) => {
    setForm({ id: mk.id, kode: mk.kode, nama: mk.nama, sks: mk.sks });
    setSelectedMatkul(mk);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedMatkul) {
        await updateMatkul(form.id, form);
        setMatkul(matkul.map((m) => (m.id === form.id ? { ...m, ...form } : m)));
      } else {
        const response = await storeMatkul(form);
        setMatkul([...matkul, response.data]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data mata kuliah:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Yakin ingin menghapus data?");
      if (confirmed) {
        await deleteMatkul(id);
        setMatkul(matkul.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Gagal menghapus data mata kuliah:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Data Mata Kuliah</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Mata Kuliah
        </button>
      </div>
      <MatkulTable
        matkul={matkul}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />
      <MatkulModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        selectedMatkul={selectedMatkul}
      />
    </div>
  );
};

export default Matkul;
