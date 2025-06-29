import Swal from "sweetalert2";

// Konfirmasi sebelum logout
export const confirmLogout = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Logout berhasil", "", "success");
    }
  });
};

// SwalHelpers.js

export const confirmDeleteMahasiswa = () => {
  return Swal.fire({
    title: "Yakin hapus data ini?",
    text: "Data akan dihapus secara permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });
};

export const confirmUpdateMahasiswa = () => {
  return Swal.fire({
    title: "Yakin update data ini?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, update!",
    cancelButtonText: "Batal",
  });
};

export const confirmDeleteDosen = () => {
  return Swal.fire({
    title: "Hapus Data Dosen?",
    text: "Data ini akan dihapus secara permanen.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
  });
};

export const confirmUpdateDosen = () => {
  return Swal.fire({
    title: "Perbarui Data Dosen?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, perbarui!",
    cancelButtonText: "Batal",
  });
};

export const confirmUpdateMatkul = () => {
  return Swal.fire({
    title: "Yakin ingin memperbarui data mata kuliah?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, Perbarui",
    cancelButtonText: "Batal",
  });
};

export const confirmDeleteMatkul = () => {
  return Swal.fire({
    title: "Yakin ingin menghapus data mata kuliah?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  });
};

