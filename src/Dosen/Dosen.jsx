import React, { useState, useEffect } from "react";
import DosenModal from "./DosenModal";
import DosenTable from "./DosenTable";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../Utils/Apis/DosenApi";

const Dosen = () => {
  const [dosen, setDosen] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", nip: "", nama: "" });

  const fetchDosen = async () => {
    try {
      const res = await getAllDosen();
      setDosen(res.data);
    } catch (error) {
      console.error("Gagal mengambil data dosen:", error);
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const openAddModal = () => {
    setSelectedDosen(null);
    setForm({ id: "", nip: "", nama: "" });
    setModalOpen(true);
  };

  const openEditModal = (dsn) => {
    setForm({ id: dsn.id, nip: dsn.nip, nama: dsn.nama });
    setSelectedDosen(dsn);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedDosen) {
        const confirmed = window.confirm("Yakin ingin memperbarui data?");
        if (confirmed) {
          await updateDosen(form.id, form);
          setDosen(dosen.map((d) => (d.id === form.id ? { ...d, ...form } : d)));
        }
      } else {
        await storeDosen(form);
        setDosen([...dosen, form]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data dosen:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Yakin ingin menghapus data?");
      if (confirmed) {
        await deleteDosen(id);
        setDosen(dosen.filter((d) => d.id !== id));
      }
    } catch (error) {
      console.error("Gagal menghapus data dosen:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Data Dosen</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Tambah Dosen
        </button>
      </div>
      <DosenTable dosen={dosen} openEditModal={openEditModal} onDelete={handleDelete} />
      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        selectedDosen={selectedDosen}
      />
    </div>
  );
};

export default Dosen;
