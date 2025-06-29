// File: MatkulModal.jsx
import React from "react";

const MatkulModal = ({ isModalOpen, onClose, onSubmit, form, setForm, selectedMatkul }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "sks" ? parseInt(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {selectedMatkul ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Kode</label>
            <input
              type="text"
              name="kode"
              value={form.kode}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">SKS</label>
            <input
              type="number"
              name="sks"
              value={form.sks}
              onChange={handleChange}
              required
              min="1"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatkulModal;