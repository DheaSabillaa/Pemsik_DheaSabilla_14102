import React, { useState, useEffect } from "react";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../Utils/Apis/MahasiswaApi";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", nim: "", nama: "" });

  const fetchMahasiswa = async () => {
    try {
      const res = await getAllMahasiswa();
      setMahasiswa(res.data);
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setForm({ id: "", nim: "", nama: "" });
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama });
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedMahasiswa) {
        const confirmed = window.confirm(
          "Apakah Anda yakin ingin memperbarui data mahasiswa?"
        );
        if (confirmed) {
          await updateMahasiswa(form.id, form);
          setMahasiswa(
            mahasiswa.map((m) => (m.id === form.id ? { ...m, ...form } : m))
          );
        }
      } else {
        await storeMahasiswa(form);
        setMahasiswa([...mahasiswa, form]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data mahasiswa:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus data mahasiswa?"
      );
      if (confirmed) {
        await deleteMahasiswa(id);
        setMahasiswa(mahasiswa.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Gagal menghapus data mahasiswa:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Data Mahasiswa</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Tambah Mahasiswa
        </button>
      </div>
      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />
      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </div>
  );
};

export default Mahasiswa;