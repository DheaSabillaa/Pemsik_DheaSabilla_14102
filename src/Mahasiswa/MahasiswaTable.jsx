import React from "react";

const MahasiswaTable = ({ mahasiswa, openEditModal, onDelete }) => {
  const handleDelete = (nim) => {
    onDelete(nim);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">NIM</th>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Jurusan</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Tidak ada data mahasiswa.
              </td>
            </tr>
          ) : (
            mahasiswa.map((mhs) => (
              <tr key={mhs.nim} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{mhs.nim}</td>
                <td className="py-2 px-4 border-b">{mhs.nama}</td>
                <td className="py-2 px-4 border-b">{mhs.jurusan}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      mhs.status === "Aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {mhs.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(mhs)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(mhs.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;