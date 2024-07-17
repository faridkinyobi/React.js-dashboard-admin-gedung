import Swal from 'sweetalert2';

export default function Alert({ icon, title }) {
      Swal.fire({
        position: 'center',
        icon,
        title,
        showConfirmButton: false,
        timer: 1500,
      });
    }
