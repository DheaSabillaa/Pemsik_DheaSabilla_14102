import React, { useState, useMemo } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormDosen from "../components/molecules/FormDosen";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import {
  confirmDeleteDosen,
  confirmUpdateDosen,
} from "../Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";
import { useQuery } from "@tanstack/react-query";
import dataDosen from "../json/dosen";

const Dosen = () => {
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

  const maxSks = 12;

  const { data: dosen = [], refetch } = useQuery({
    queryKey: ["dataDosen"],
    queryFn: () => {
      const stored = localStorage.getItem("dataDosen");
      try {
        const parsed = stored ? JSON.parse(stored) : null;
        if (Array.isArray(parsed)) {
          return parsed;
        } else {
          localStorage.setItem("dataDosen", JSON.stringify(dataDosen.dataDosen));
          return dataDosen.dataDosen;
        }
      } catch (e) {
        localStorage.setItem("dataDosen", JSON.stringify(dataDosen.dataDosen));
        return dataDosen.dataDosen;
      }
    },
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const filteredSortedDosen = useMemo(() => {
    let filtered = dosen.filter((d) =>
      d.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.nip.toLowerCase().includes(search.toLowerCase())
    );
    filtered.sort((a, b) => {
      const fieldA = a[sortBy]?.toString().toLowerCase() || "";
      const fieldB = b[sortBy]?.toString().toLowerCase() || "";
      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [dosen, search, sortBy, sortOrder]);

  const paginatedDosen = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredSortedDosen.slice(start, start + limit);
  }, [filteredSortedDosen, page, limit]);

  const totalPages = Math.ceil(filteredSortedDosen.length / limit);

  const saveToStorage = (updatedList) => {
    localStorage.setItem("dataDosen", JSON.stringify(updatedList));
    refetch();
  };

  const addDosen = (newData) => {
    try {
      const newId = Date.now();
      const data = { ...newData, id: newId };
      const updatedList = [...dosen, data];
      saveToStorage(updatedList);
      setIsModalOpen(false);
      toastSuccess("Data dosen berhasil disimpan!");
    } catch (error) {
      toastError("Gagal menyimpan data dosen.");
    }
  };

  const updateDosen = async (updatedData) => {
    const result = await confirmUpdateDosen();
    if (result.isConfirmed) {
      try {
        const updatedList = dosen.map((dsn) =>
          dsn.id === editData.id ? updatedData : dsn
        );
        saveToStorage(updatedList);
        setIsModalOpen(false);
        setEditData(null);
        toastSuccess("Data dosen berhasil diperbarui!");
      } catch (error) {
        toastError("Gagal memperbarui data dosen.");
      }
    }
  };

  const deleteDosen = async (id) => {
    const target = dosen.find((d) => d.id === id);
    const result = await confirmDeleteDosen();
    if (result.isConfirmed) {
      try {
        const updatedList = dosen.filter((d) => d.id !== id);
        saveToStorage(updatedList);
        toastSuccess(`Data ${target.nama} berhasil dihapus.`);
      } catch (error) {
        toastError("Gagal menghapus data dosen.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Daftar Dosen</h2>
              {role === "admin" && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setEditData(null);
                    setIsModalOpen(true);
                  }}
                >
                  + Tambah Dosen
                </Button>
              )}
            </div>

            <div className="flex justify-between mb-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama / NIP"
                className="border rounded px-3 py-1"
              />
              <div className="flex items-center space-x-2">
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[5, 10, 20].map((num) => (
                    <option key={num} value={num}>{num}/halaman</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="nama">Sort by Nama</option>
                  <option value="nip">Sort by NIP</option>
                </select>
                <button
                  onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
                  className="text-sm"
                >
                  {sortOrder === "asc" ? "⬆️" : "⬇️"}
                </button>
              </div>
            </div>

            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">NIP</th>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">SKS</th>
                  {role === "admin" && (
                    <th className="py-2 px-4 text-center">Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedDosen.length === 0 ? (
                  <tr>
                    <td
                      colSpan={role === "admin" ? 5 : 4}
                      className="text-center py-4 text-gray-500"
                    >
                      Belum ada data dosen
                    </td>
                  </tr>
                ) : (
                  paginatedDosen.map((dsn) => (
                    <tr key={dsn.id} className="even:bg-gray-100 odd:bg-white">
                      <td className="py-2 px-4">{dsn.nip}</td>
                      <td className="py-2 px-4">{dsn.nama}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`font-medium ${
                            dsn.status ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {dsn.status ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {dsn.sks || 0}/{maxSks}
                      </td>
                      {role === "admin" && (
                        <td className="py-2 px-4 text-center">
                          <Button
                            className="bg-yellow-500 hover:bg-yellow-600 mx-1"
                            onClick={() => {
                              setEditData(dsn);
                              setIsModalOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-red-500 hover:bg-red-600 mx-1"
                            onClick={() => deleteDosen(dsn.id)}
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

            <div className="flex justify-between items-center mt-4">
              <span>
                Halaman {page} dari {totalPages}
              </span>
              <div className="space-x-2">
                <Button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="bg-gray-300"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="bg-gray-300"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormDosen
          onSubmit={editData ? updateDosen : addDosen}
          editData={editData}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Dosen;