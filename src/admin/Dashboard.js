import React, { useState } from "react";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]); // Menyimpan data mahasiswa
  const [editData, setEditData] = useState(null); // Menyimpan data yang akan diedit

  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
    setIsModalOpen(false);
  };

  const updateMahasiswa = (updatedData) => {
    setMahasiswa(
      mahasiswa.map((mhs) => (mhs.nim === editData.nim ? updatedData : mhs))
    );
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Sidebar ditambahkan di sini */}
      <div className="flex-1 flex flex-col">
        <Header /> {/* Header dengan ProfileMenu */}
        <div>
          <h1 className="text-center">Halaman Dashboard</h1>
        </div>
        <Footer />
      </div>
      {/* Modal Tambah/Edit Mahasiswa */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormMahasiswa
          onSubmit={editData ? updateMahasiswa : addMahasiswa}
          editData={editData}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
