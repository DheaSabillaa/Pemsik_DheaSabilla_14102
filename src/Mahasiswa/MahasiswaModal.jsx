import React, { useState, useEffect } from "react";

const MahasiswaModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
}) => {
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    status: "Aktif",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm(selectedMahasiswa);
    } else {
      setForm({ nim: "", nama: "", jurusan: "", status: "Aktif" });
    }
  }, [selectedMahasiswa, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.nim) tempErrors.nim = "NIM wajib diisi";
    if (!form.nama) tempErrors.nama = "Nama wajib diisi";
    if (!form.jurusan) tempErrors.jurusan = "Jurusan wajib diisi";
    if (!form.status) tempErrors.status = "Status wajib dipilih";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      onClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">NIM</label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!!selectedMahasiswa}
            />
            {errors.nim && (
              <p className="text-red-500 text-sm mt-1">{errors.nim}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.nama && (
              <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Jurusan</label>
            <input
              type="text"
              name="jurusan"
              value={form.jurusan}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.jurusan && (
              <p className="text-red-500 text-sm mt-1">{errors.jurusan}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;