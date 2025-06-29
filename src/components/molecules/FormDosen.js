import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormDosen = ({ onSubmit, editData, onClose }) => {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState(true);
  const [sks, setSks] = useState(0);
  const [oldnip, setOldNip] = useState("");

  useEffect(() => {
    if (editData) {
      setNip(editData.nip);
      setOldNip(editData.nip);
      setNama(editData.nama);
      setStatus(editData.status);
      setSks(editData.sks || 0);
    } else {
      setNip("");
      setNama("");
      setStatus(true);
      setSks(0);
      setOldNip("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nip || !nama) {
      alert("NIP dan Nama harus diisi!");
      return;
    }

    const updatedData = {
      nip,
      nama,
      status,
      sks: parseInt(sks) || 0,
    };

    if (editData && oldnip !== nip) {
      onSubmit({ ...updatedData, oldnip });
    } else {
      onSubmit(updatedData);
    }

    setNip("");
    setNama("");
    setStatus(true);
    setSks(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {editData ? "Edit Dosen" : "Tambah Dosen"}
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
        <Label htmlFor="nip">NIP</Label>
        <input
          type="text"
          id="nip"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
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
        <Label htmlFor="sks">SKS Diampu</Label>
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

export default FormDosen;
