import Swal from "sweetalert2";

interface ISweetAlert {
  icon: "success" | "error" | "warning" | "info" | "question";
  title: string;
  timer?: number;
}

export default function sweetAlert({
  icon,
  title,
  timer = 3000,
}: ISweetAlert): void {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title,
  });
}
