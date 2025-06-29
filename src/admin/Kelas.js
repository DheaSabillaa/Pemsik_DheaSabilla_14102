import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormKelas from "../components/molecules/FormKelas";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";
import dataKelas from "../json/kelas";
import dataMahasiswa from "../json/mahasiswa";

const Kelas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [role, setRole] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
      return null;
    }
    return user.role;
  });

  const queryClient = useQueryClient();

  const { data: kelas = [], refetch: refetchKelas } = useQuery({
    queryKey: ["dataKelas"],
    queryFn: () => {
      const stored = localStorage.getItem("dataKelas");
      if (stored) return JSON.parse(stored);
      localStorage.setItem("dataKelas", JSON.stringify(dataKelas.dataKelas));
      return dataKelas.dataKelas;
    },
  });

  const { data: listMahasiswa = [] } = useQuery({
    queryKey: ["dataMahasiswa"],
    queryFn: () => {
      const stored = localStorage.getItem("dataMahasiswa");
      if (stored) return JSON.parse(stored);
      localStorage.setItem(
        "dataMahasiswa",
        JSON.stringify(dataMahasiswa.dataMahasiswa)
      );
      return dataMahasiswa.dataMahasiswa;
    },
  });

  const saveToStorage = (updatedList) => {
    localStorage.setItem("dataKelas", JSON.stringify(updatedList));
    queryClient.setQueryData(["dataKelas"], updatedList);
  };

  const addKelas = (newData) => {
    try {
      const newId = Date.now();
      const data = { ...newData, id: newId };
      const updated = [...kelas, data];
      saveToStorage(updated);
      setIsModalOpen(false);
      toastSuccess("Kelas berhasil ditambahkan!");
    } catch {
      toastError("Gagal menambah kelas.");
    }
  };

  const updateKelas = (updatedData) => {
    try {
      const updated = kelas.map((k) =>
        k.id === editData.id ? { ...updatedData, id: k.id } : k
      );
      saveToStorage(updated);
      setIsModalOpen(false);
      setEditData(null);
      toastSuccess("Kelas berhasil diperbarui!");
    } catch {
      toastError("Gagal memperbarui kelas.");
    }
  };

  const deleteKelas = (id) => {
    try {
      const updated = kelas.filter((k) => k.id !== id);
      saveToStorage(updated);
      toastSuccess("Kelas berhasil dihapus.");
    } catch {
      toastError("Gagal menghapus kelas.");
    }
  };

  const getMahasiswaByNim = (nim) => {
    return listMahasiswa.find((m) => m.nim === nim);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Daftar Kelas</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setEditData(null);
                  setIsModalOpen(true);
                }}
              >
                + Tambah Kelas
              </Button>
            </div>

            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Nama Kelas</th>
                  <th className="py-2 px-4 text-left">Mata Kuliah</th>
                  <th className="py-2 px-4 text-left">Dosen Pengajar</th>
                  <th className="py-2 px-4 text-left">Mahasiswa Peserta</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kelas.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Belum ada data kelas
                    </td>
                  </tr>
                ) : (
                  kelas.map((item) => (
                    <tr key={item.id} className="even:bg-gray-100 odd:bg-white">
                      <td className="py-2 px-4">{item.namaKelas}</td>
                      <td className="py-2 px-4">{item.mataKuliah}</td>
                      <td className="py-2 px-4">{item.dosen}</td>
                      <td className="py-2 px-4">
                        <ul className="list-disc ml-5">
                          {item.mahasiswa.map((nim) => {
                            const mhs = getMahasiswaByNim(nim);
                            return (
                              <li key={nim}>
                                {mhs?.nama || nim}{" "}
                                {mhs ? `(SKS: ${mhs.sks || 0}/24)` : ""}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <Button
                          className="bg-yellow-500 hover:bg-yellow-600 mx-1"
                          onClick={() => {
                            setEditData(item);
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 mx-1"
                          onClick={() => deleteKelas(item.id)}
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
        </main>
        <Footer />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormKelas
          onSubmit={editData ? updateKelas : addKelas}
          editData={editData}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Kelas;
