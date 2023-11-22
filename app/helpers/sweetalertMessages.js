/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import Swal from "sweetalert2";

// Función para mostrar mensaje de éxito
export const showSuccessMessage = (message) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
  });
};

// Función para mostrar mensaje de error
export const showErrorMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};
