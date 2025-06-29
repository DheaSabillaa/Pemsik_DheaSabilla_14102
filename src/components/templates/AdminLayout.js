import React, { useState } from "react";
import AdminLayout from "../components/templates/AdminLayout";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]); // State untuk daftar mahasiswa
  const [editData, setEditData] = useState(null); // State untuk data yang akan diedit

  // Fungsi untuk menambah mahasiswa baru
  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]); // Tambahkan ke daftar mahasiswa
    setIsModalOpen(false); // Tutup modal setelah submit
  };

  // Fungsi untuk menyimpan hasil edit
  const updateMahasiswa = (updatedData) => {
    setMahasiswa(
      mahasiswa.map(
        (mhs) => (mhs.nim === editData.nim ? updatedData : mhs) // Perbarui data lama
      )
    );
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setEditData(null); // Reset form untuk tambah mahasiswa
              setIsModalOpen(true);
            }}
          >
            + Tambah Mahasiswa
          </Button>
        </div>

        {/* Tabel Mahasiswa */}
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Belum ada data mahasiswa
                </td>
              </tr>
            ) : (
              mahasiswa.map((mhs, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4">{mhs.nim}</td>
                  <td className="py-2 px-4">{mhs.nama}</td>
                  <td className="py-2 px-4 text-center">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 mx-1"
                      onClick={() => {
                        setEditData(mhs); // Simpan data yang akan diedit
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600 mx-1"
                      onClick={() => {
                        setMahasiswa(
                          mahasiswa.filter((item) => item.nim !== mhs.nim)
                        );
                        alert("Data berhasil dihapus!"); // Tampilkan alert setelah menghapus data
                      }}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit Mahasiswa */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormMahasiswa
          onSubmit={editData ? updateMahasiswa : addMahasiswa}
          editData={editData}
        />
      </Modal>
    </AdminLayout>
  );
};

export default Admin;
