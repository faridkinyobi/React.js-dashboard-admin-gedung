import Swal from 'sweetalert2';

export default function Swalfire({ icon, title }) {
      Swal.fire({
        title: {title},
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: `${icon}`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Hapus",
        cancelButtonText: "Batal",
      })
    }
