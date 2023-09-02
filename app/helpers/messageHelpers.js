/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import Swal from "sweetalert2";

// Función para mostrar un mensaje de éxito
export function showSuccessMessage(message) {
  Swal.fire({
    title: "Éxito",
    text: message,
    icon: "success",
  });
}

// Función para mostrar un mensaje de error
export function showErrorMessage(message) {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
  // eslint-disable-next-line linebreak-style
}
