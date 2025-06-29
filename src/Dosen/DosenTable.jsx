import React from "react";

const DosenTable = ({ dosen, openEditModal, onDelete }) => {
  return (
    <table className="w-full table-auto border">
      <thead className="bg-blue-100">
        <tr>
          <th className="border px-4 py-2">NIP</th>
          <th className="border px-4 py-2">Nama</th>
          <th className="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {dosen.map((d) => (
          <tr key={d.id}>
            <td className="border px-4 py-2">{d.nip}</td>
            <td className="border px-4 py-2">{d.nama}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => openEditModal(d)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(d.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DosenTable;
