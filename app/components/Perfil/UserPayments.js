/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Chip, IconButton, Tooltip, Typography } from '@material-ui/core';
import Money from '@material-ui/icons/MonetizationOnRounded';
import qrcodeImage from './images/qrcode.jpg';
import './UserPayments.css';
const abonosData = [
  {
    id: 1,
    mes: 'Enero',
    gestion: 2023,
    estadoPagos: true,
    fechaActual: '2023-10-25',
  },
  {
    id: 2,
    mes: 'Febrero',
    gestion: 2023,
    estadoPagos: true,
    fechaActual: '2023-10-26',
  },
  {
    id: 3,
    mes: 'Marzo',
    gestion: 2023,
    estadoPagos: false,
    fechaActual: '2023-10-27',
  },
  {
    id: 4,
    mes: 'Abril',
    gestion: 2023,
    estadoPagos: false,
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
              <th>Gestion</th>
              <th>Estado de Pagos</th>
              <th>Fecha</th>
              <th>Pago QR</th>
            </tr>
          </thead>
          <tbody className="">
            {abonosData.map((abono) => (
              <tr key={abono.id}>
                <td>{abono.mes}</td>
                <td>{abono.gestion}</td>
                <td>
                  {/* {abono.estadoPagos ? (<Button variant="contained" color="success">Ok</Button>) : (<Button variant="outlined" color="error">Pendiente</Button>)} */}
                  {abono.estadoPagos ? (<Chip label="Cancelado" color="secondary" />) : (<Chip label="Pendiente" color="primary" />)}
                </td>
                <td>{abono.fechaActual}</td>
                <td>
                  {abono.estadoPagos ? (
                    <Typography variant="body1">Pagos Al día</Typography>
                  ) : (
                    <div>
                      {/* Renderizar el botón de pago y el ícono aquí */}
                      <Tooltip title="paga con QR" placement="right">
                        <IconButton onClick={() => handlePayAbono(abono)} aria-label="Pay" color="secondary">
                          <Money />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {isModalOpen && selectedAbono && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2 id="simple-modal-title">Detalles del Abono</h2>
                  <p id="simple-modal-description">
                     Monto
                  </p>
                  <p id="simple-modal-description">
                     Mes
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
