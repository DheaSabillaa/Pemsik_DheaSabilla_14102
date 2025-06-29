import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormKelas = ({ onSubmit, editData, onClose }) => {
  const [namaKelas, setNamaKelas] = useState("");
  const [mataKuliah, setMataKuliah] = useState("");
  const [dosen, setDosen] = useState("");
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState([]);
  const [listMatkul, setListMatkul] = useState([]);
  const [listDosen, setListDosen] = useState([]);

  useEffect(() => {
    const storedMatkul = JSON.parse(localStorage.getItem("dataMatkul")) || [];
    const storedDosen = JSON.parse(localStorage.getItem("dataDosen")) || [];
    const storedMahasiswa =
      JSON.parse(localStorage.getItem("dataMahasiswa")) || [];

    setListMatkul(storedMatkul);
    setListDosen(storedDosen);
    setMahasiswa(storedMahasiswa);

    if (editData) {
      setNamaKelas(editData.namaKelas);
      setMataKuliah(editData.mataKuliah);
      setDosen(editData.dosen);
      setSelectedMahasiswa(editData.mahasiswa || []);
    } else {
      setNamaKelas("");
      setMataKuliah("");
      setDosen("");
      setSelectedMahasiswa([]);
    }
  }, [editData]);

  const handleCheckboxChange = (nim) => {
    setSelectedMahasiswa((prev) =>
      prev.includes(nim) ? prev.filter((id) => id !== nim) : [...prev, nim]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!namaKelas || !mataKuliah || !dosen || selectedMahasiswa.length === 0) {
      alert("Semua data harus diisi!");
      return;
    }

    const payload = {
      namaKelas,
      mataKuliah,
      dosen,
      mahasiswa: selectedMahasiswa,
    };

    onSubmit(payload); // ✅ biarkan parent yang memutuskan kapan modal ditutup
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {editData ? "Edit Kelas" : "Tambah Kelas"}
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
        <Label htmlFor="namaKelas">Nama Kelas</Label>
        <Input
          id="namaKelas"
          value={namaKelas}
          onChange={(e) => setNamaKelas(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="mataKuliah">Mata Kuliah</Label>
        <select
          id="mataKuliah"
          value={mataKuliah}
          onChange={(e) => setMataKuliah(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">-- Pilih Mata Kuliah --</option>
          {listMatkul.map((mk) => (
            <option key={mk.id} value={mk.nama}>
              {mk.nama} ({mk.sks} SKS)
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="dosen">Dosen Pengajar</Label>
        <select
          id="dosen"
          value={dosen}
          onChange={(e) => setDosen(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">-- Pilih Dosen --</option>
          {listDosen.map((d) => (
            <option key={d.id} value={d.nama}>
              {d.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Mahasiswa Peserta</Label>
        <div className="border rounded p-2 max-h-40 overflow-y-auto space-y-1">
          {mahasiswa.map((mhs) => (
            <label key={mhs.nim} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedMahasiswa.includes(mhs.nim)}
                onChange={() => handleCheckboxChange(mhs.nim)}
              />
              <span>
                {mhs.nama} (SKS: {mhs.sks || 0}/24)
              </span>
            </label>
          ))}
        </div>
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
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {editData ? "Simpan Perubahan" : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default FormKelas;
