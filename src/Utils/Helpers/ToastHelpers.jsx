import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const toastSuccess = (msg) => {
  Toast.fire({ icon: "success", title: msg });
};

export const toastError = (msg) => {
  Toast.fire({ icon: "error", title: msg });
};
