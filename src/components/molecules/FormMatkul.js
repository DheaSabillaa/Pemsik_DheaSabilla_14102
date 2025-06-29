import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Button from "../atoms/Button";

const FormMataKuliah = ({ onSubmit, editData, onClose }) => {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState("");
  const [oldKode, setOldKode] = useState("");

  useEffect(() => {
    if (editData) {
      setKode(editData.kode);
      setOldKode(editData.kode);
      setNama(editData.nama);
      setSks(editData.sks);
    } else {
      setKode("");
      setNama("");
      setSks("");
      setOldKode("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!kode || !nama || !sks) {
      alert("Kode, Nama Mata Kuliah, dan SKS harus diisi!");
      return;
    }

    const updatedData = { kode, nama, sks };

    if (editData && oldKode !== kode) {
      onSubmit({ ...updatedData, oldKode });
    } else {
      onSubmit(updatedData);
    }

    setKode("");
    setNama("");
    setSks("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {editData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        </h2>
        <button
          className="text-gray-600 hover:text-red-500 text-2xl"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>
      </div>

      <div>
        <Label htmlFor="kode">Kode</Label>
        <input
          type="text"
          id="kode"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          disabled={!!editData}
        />
      </div>

      <div>
        <Label htmlFor="nama">Nama Mata Kuliah</Label>
        <input
          type="text"
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <Label htmlFor="sks">Jumlah SKS</Label>
        <input
          type="number"
          id="sks"
          value={sks}
          onChange={(e) => setSks(e.target.value)}
          required
          min="1"
          max="6"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          text="Batal"
          className="bg-gray-400 text-white"
          onClick={onClose}
          type="button"
        >
          Batal
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {editData ? "Simpan Perubahan" : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default FormMataKuliah;
