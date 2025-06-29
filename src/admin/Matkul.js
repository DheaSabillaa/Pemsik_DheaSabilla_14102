  import React, { useState } from "react";
  import { useQuery } from "@tanstack/react-query";
  import Button from "../components/atoms/Button";
  import Modal from "../components/molecules/Modal";
  import FormMatkul from "../components/molecules/FormMatkul";
  import Sidebar from "../components/organisms/Sidebar";
  import Header from "../components/organisms/Header";
  import Footer from "../components/organisms/Footer";
  import {
    confirmDeleteMatkul,
    confirmUpdateMatkul,
  } from "../Utils/Helpers/SwalHelpers";
  import { toastSuccess, toastError } from "../Utils/Helpers/ToastHelpers";
  import dataMatkul from "../json/matkul.json";

  const Matkul = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [role, setRole] = useState(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) window.location.href = "/login";
      return user?.role || null;
    });

    const { data: matkul = [], refetch } = useQuery({
      queryKey: ["matkul"],
      queryFn: () => {
        const stored = localStorage.getItem("dataMatkul");
        try {
          const parsed = stored ? JSON.parse(stored) : null;
          if (Array.isArray(parsed)) {
            return parsed;
          } else {
            localStorage.setItem(
              "dataMatkul",
              JSON.stringify(dataMatkul.dataMatkul)
            );
            return dataMatkul.dataMatkul;
          }
        } catch (e) {
          localStorage.setItem(
            "dataMatkul",
            JSON.stringify(dataMatkul.dataMatkul)
          );
          return dataMatkul.dataMatkul;
        }
      },
    });

    const saveToStorage = (updatedList) => {
      localStorage.setItem("dataMatkul", JSON.stringify(updatedList));
      refetch();
    };

    const addMatkul = (newData) => {
      try {
        const newId = Date.now();
        const data = { ...newData, id: newId };
        const updatedList = [...matkul, data];
        saveToStorage(updatedList);
        setIsModalOpen(false);
        toastSuccess("Data mata kuliah berhasil disimpan!");
      } catch (error) {
        toastError("Gagal menyimpan data mata kuliah.");
      }
    };

    const updateMatkul = async (updatedData) => {
      const result = await confirmUpdateMatkul();
      if (result.isConfirmed) {
        try {
          const updatedList = matkul.map((mk) =>
            mk.id === editData.id ? updatedData : mk
          );
          saveToStorage(updatedList);
          setIsModalOpen(false);
          setEditData(null);
          toastSuccess("Data mata kuliah berhasil diperbarui!");
        } catch (error) {
          toastError("Gagal memperbarui data mata kuliah.");
        }
      }
    };

    const deleteMatkul = async (id) => {
      const target = matkul.find((m) => m.id === id);
      const result = await confirmDeleteMatkul();
      if (result.isConfirmed) {
        try {
          const updatedList = matkul.filter((mk) => mk.id !== id);
          saveToStorage(updatedList);
          toastSuccess(`Data ${target.nama} berhasil dihapus.`);
        } catch (error) {
          toastError("Gagal menghapus data mata kuliah.");
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
                <h2 className="text-lg font-semibold">Daftar Mata Kuliah</h2>

                {role === "admin" && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setEditData(null);
                      setIsModalOpen(true);
                    }}
                  >
                    + Tambah Matkul
                  </Button>
                )}
              </div>

              <table className="w-full text-sm text-gray-700">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Kode</th>
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-left">SKS</th>
                    {role === "admin" && (
                      <th className="py-2 px-4 text-center">Aksi</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {matkul.length === 0 ? (
                    <tr>
                      <td
                        colSpan={role === "admin" ? 4 : 3}
                        className="text-center py-4 text-gray-500"
                      >
                        Belum ada data mata kuliah
                      </td>
                    </tr>
                  ) : (
                    matkul.map((mk) => (
                      <tr key={mk.id} className="even:bg-gray-100 odd:bg-white">
                        <td className="py-2 px-4">{mk.kode}</td>
                        <td className="py-2 px-4">{mk.nama}</td>
                        <td className="py-2 px-4">{mk.sks}</td>
                        {role === "admin" && (
                          <td className="py-2 px-4 text-center">
                            <Button
                              className="bg-yellow-500 hover:bg-yellow-600 mx-1"
                              onClick={() => {
                                setEditData(mk);
                                setIsModalOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="bg-red-500 hover:bg-red-600 mx-1"
                              onClick={() => deleteMatkul(mk.id)}
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
          <FormMatkul
            onSubmit={editData ? updateMatkul : addMatkul}
            editData={editData}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    );
  };

  export default Matkul;
