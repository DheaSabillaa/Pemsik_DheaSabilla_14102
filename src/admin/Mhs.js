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

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nim");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data: mahasiswa = [] } = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: getDataFromStorage,
  });

  const filtered = mahasiswa.filter((m) =>
    m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.nim.includes(searchTerm)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  const totalPage = Math.ceil(sorted.length / perPage);
  const paginatedData = sorted.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

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

            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                placeholder="Cari NIM/Nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-1 rounded"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="nim">Sort by NIM</option>
                <option value="nama">Sort by Nama</option>
              </select>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border px-3 py-1 rounded"
              >
                <option value={5}>5 / halaman</option>
                <option value={10}>10 / halaman</option>
                <option value={20}>20 / halaman</option>
              </select>
            </div>

            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">NIM</th>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-left">Jurusan</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">SKS</th>
                  {(role === "admin" || role === "dosen") && (
                    <th className="py-2 px-4 text-center">Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((mhs, index) => (
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

            {totalPage > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="bg-gray-200 px-3"
                >
                  Prev
                </Button>
                <span>
                  Halaman {currentPage} dari {totalPage}
                </span>
                <Button
                  disabled={currentPage === totalPage}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="bg-gray-200 px-3"
                >
                  Next
                </Button>
              </div>
            )}
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
