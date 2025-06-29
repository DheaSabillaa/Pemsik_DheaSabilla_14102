import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormMahasiswa = ({ onSubmit, editData, onClose }) => {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [status, setStatus] = useState(true);
  const [sks, setSks] = useState(0);
  const [oldNim, setOldNim] = useState("");

  useEffect(() => {
    if (editData) {
      setNim(editData.nim);
      setOldNim(editData.nim);
      setNama(editData.nama);
      setJurusan(editData.jurusan || "");
      setStatus(editData.status);
      setSks(editData.sks || 0);
    } else {
      setNim("");
      setNama("");
      setJurusan("");
      setStatus(true);
      setSks(0);
      setOldNim("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nim || !nama || !jurusan) {
      alert("NIM, Nama, dan Jurusan harus diisi!");
      return;
    }

    const updatedData = {
      nim,
      nama,
      jurusan,
      status,
      sks: parseInt(sks) || 0,
    };

    if (editData && oldNim !== nim) {
      onSubmit({ ...updatedData, oldNim });
    } else {
      onSubmit(updatedData);
    }

    setNim("");
    setNama("");
    setJurusan("");
    setStatus(true);
    setSks(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
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
        <Label htmlFor="nim">NIM</Label>
        <input
          type="text"
          id="nim"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          disabled={!!editData}
        />
      </div>

      <div>
        <Label htmlFor="nama">Nama</Label>
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
        <Label htmlFor="jurusan">Jurusan</Label>
        <input
          type="text"
          id="jurusan"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="true">Aktif</option>
          <option value="false">Tidak Aktif</option>
        </select>
      </div>

      <div>
        <Label htmlFor="sks">SKS Ditempuh</Label>
        <input
          type="number"
          id="sks"
          value={sks}
          onChange={(e) => setSks(e.target.value)}
          min="0"
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

export default FormMahasiswa;
