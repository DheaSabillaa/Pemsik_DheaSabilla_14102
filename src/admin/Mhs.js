import React, { useState } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import {
  confirmDeleteMahasiswa,
  confirmUpdateMahasiswa,
} from "../Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const STORAGE_KEY = "dataMahasiswa";
const MAX_SKS = 24;

const getDataFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setDataToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const Mhs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [role, setRole] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || null;
  });
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

  const queryClient = useQueryClient();

  const { data: mahasiswa = [] } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: () => getDataFromStorage(),
  });

  const saveData = (newData) => {
    setDataToStorage(newData);
    queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
  };

  const addMutation = useMutation({
    mutationFn: (newData) => {
      const existing = getDataFromStorage();
      if (existing.find((m) => m.nim === newData.nim)) {
        throw new Error("NIM sudah terdaftar.");
      }
      const updated = [...existing, newData];
      setDataToStorage(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      setIsModalOpen(false);
      toastSuccess("Data mahasiswa berhasil disimpan!");
    },
    onError: (err) => toastError(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const confirmed = await confirmUpdateMahasiswa();
      if (!confirmed.isConfirmed) throw new Error("Dibatalkan");
      const existing = getDataFromStorage();
      const updated = existing.map((m) =>
        m.nim === updatedData.nim ? updatedData : m
      );
      setDataToStorage(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      setEditData(null);
      setIsModalOpen(false);
      toastSuccess("Data mahasiswa berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui data mahasiswa."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (nim) => {
      const confirmed = await confirmDeleteMahasiswa();
      if (!confirmed.isConfirmed) throw new Error("Dibatalkan");
      const existing = getDataFromStorage();
      const updated = existing.filter((m) => m.nim !== nim);
      setDataToStorage(updated);
      return { updated, deletedNim: nim };
    },
    onSuccess: ({ deletedNim }) => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
      const deleted = mahasiswa.find((m) => m.nim === deletedNim);
      toastSuccess(`Data ${deleted?.nama} berhasil dihapus.`);
    },
    onError: () => toastError("Gagal menghapus data mahasiswa."),
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
              {(role === "admin" || role === "dosen") && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setEditData(null);
                    setIsModalOpen(true);
                  }}
                >
                  + Tambah Mahasiswa
                </Button>
              )}
            </div>

            {role === "mahasiswa" && user && (
              <div className="mb-4 text-sm text-gray-600">
                Total SKS yang Anda ambil:{" "}
                <span className="font-semibold">
                  {mahasiswa.find((m) => m.nim === user.nim)?.sks || 0}
                </span>{" "}
                dari maksimal {MAX_SKS} SKS
              </div>
            )}

            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">NIM</th>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-left">Jurusan</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">SKS Ditempuh</th>
                  {(role === "admin" || role === "dosen") && (
                    <th className="py-2 px-4 text-center">Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {mahasiswa.length === 0 ? (
                  <tr>
                    <td
                      colSpan={role === "admin" || role === "dosen" ? 6 : 5}
                      className="text-center py-4 text-gray-500"
                    >
                      Belum ada data mahasiswa
                    </td>
                  </tr>
                ) : (
                  mahasiswa.map((mhs, index) => (
                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                      <td className="py-2 px-4">{mhs.nim}</td>
                      <td className="py-2 px-4">{mhs.nama}</td>
                      <td className="py-2 px-4">{mhs.jurusan}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            mhs.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {mhs.status ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {mhs.sks}/{MAX_SKS}
                      </td>
                      {(role === "admin" || role === "dosen") && (
                        <td className="py-2 px-4 text-center">
                          <Button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white mx-1"
                            onClick={() => {
                              setEditData(mhs);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-red-500 hover:bg-red-600 text-white mx-1"
                            onClick={() => deleteMutation.mutate(mhs.nim)}
                          >
                            Hapus
                          </Button>
                        </td>
                      )}
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
        <FormMahasiswa
          onSubmit={editData ? updateMutation.mutate : addMutation.mutate}
          editData={editData}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Mhs;
