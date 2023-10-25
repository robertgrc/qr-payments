/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/BorderColor';
import Money from '@material-ui/icons/MonetizationOnRounded';
import './UserPayments.css';
const abonosData = [
  {
    id: 1,
    nombreUsuario: 'Usuario 1',
    monto: 100,
    estadoPagos: 'Abono inicial',
    fechaActual: '2023-10-25',
  },
  {
    id: 2,
    nombreUsuario: 'Usuario 2',
    monto: 150,
    estadoPagos: 'Abono mensual',
    fechaActual: '2023-10-26',
  },
  // Agrega más objetos de abono según sea necesario
];

const UserPayments = () => {

  // Función para manejar la edición de un abono
  const handleEditAbono = (abono) => {
    // Implementa la lógica para editar un abono aquí
    console.log(`Editando abono con ID: ${abono.id}`);
  };

  // Función para manejar la eliminación de un abono
  const handlePayAbono = (abono) => {
    // Implementa la lógica para eliminar un abono aquí
    console.log(`Agregando abono con ID: ${abono.id}`);
  };


  return (
    <div className="ContainerTablaAbonos">
      {/* <div className="">
        <h2 className="">Tabla de Abonos</h2>
      </div> */}
      <div className="">
        <table className="">
          <thead className="">
            <tr className="">
              <th>Nombre Usuario</th>
              <th>Monto(Bs)</th>
              <th>Estado de Pagos</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody className="">
            {abonosData.map((abono) => (
              <tr key={abono.id}>
                <td>{abono.nombreUsuario}</td>
                <td>{abono.monto}</td>
                <td>{abono.estadoPagos}</td>
                <td>{abono.fechaActual}</td>
                <td>
                  <IconButton onClick={() => handlePayAbono(abono)} aria-label="Pay" color="secondary">
                    <Money />
                  </IconButton>
                  <IconButton onClick={() => handleEditAbono(abono)} aria-label="Done" color="secondary">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayments;
