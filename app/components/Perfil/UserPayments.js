/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import Money from '@material-ui/icons/MonetizationOnRounded';
import qrcodeImage from './images/qrcode.jpg';
import './UserPayments.css';
const abonosData = [
  {
    id: 1,
    mes: 'Enero',
    monto: 100,
    estadoPagos: 'Abono inicial',
    fechaActual: '2023-10-25',
  },
  {
    id: 2,
    mes: 'Febrero',
    monto: 150,
    estadoPagos: 'Abono mensual',
    fechaActual: '2023-10-26',
  },
  // Agrega más objetos de abono según sea necesario
];

const UserPayments = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAbono, setSelectedAbono] = useState(null);

  const handlePayAbono = (abono) => {
    setSelectedAbono(abono);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ContainerTablaAbonos">
      <div className="">
        <table className="">
          <thead className="">
            <tr className="">
              <th>Mes</th>
              <th>Monto(Bs)</th>
              <th>Estado de Pagos</th>
              <th>Fecha</th>
              <th>Pago QR</th>
            </tr>
          </thead>
          <tbody className="">
            {abonosData.map((abono) => (
              <tr key={abono.id}>
                <td>{abono.mes}</td>
                <td>{abono.monto}</td>
                <td>{abono.estadoPagos}</td>
                <td>{abono.fechaActual}</td>
                <td>
                  <Tooltip title="Genera QR" placement="right">
                    <IconButton onClick={() => handlePayAbono(abono)} aria-label="Pay" color="secondary">
                      <Money />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
            {isModalOpen && selectedAbono && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2 id="simple-modal-title">Detalles del Abono</h2>
                  <p id="simple-modal-description">
                     Pago QR
                  </p>
                  <img src={qrcodeImage} alt="Código QR" />
                  {/* Aquí puedes mostrar la imagen del código QR si la tienes */}
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayments;
