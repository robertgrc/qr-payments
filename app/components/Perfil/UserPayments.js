/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
/* eslint-disable padded-blocks */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Chip, IconButton, Tooltip, Typography } from '@material-ui/core';
import Money from '@material-ui/icons/MonetizationOnRounded';
import qrcodeImage from './images/qrcode.jpg';
import './UserPayments.css';
import qrApi from '../../api/ui/qrApi';

const UserPayments = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAbono, setSelectedAbono] = useState(null);
  const [abonosData, setAbonosData] = useState([]);

  useEffect(() => {
    // Obtener la fecha actual
    const today = new Date();
    const currentYear = today.getFullYear(); // Año actual
    const currentMonth = today.getMonth(); // Mes actual (0-11)

    // Generar dinámicamente los abonos hasta el mes actual
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    for (let i = 0; i <= currentMonth; i++) {
      abonosData.push({
        id: i + 1,
        mes: months[i],
        gestion: currentYear,
        estadoPagos: { idPago: null, estado: false }, // Inicialmente null, se actualizará con datos del backend
        fechaActual: today.toISOString(), // Puedes ajustar el formato de fecha necesario
      });
    }
    //* ----
    const idUsuario = localStorage.getItem('IdUsuario');
    const apiUrl = `pago/${idUsuario}`;
    // console.log('idUsuario**', idUsuario);
    // //* ----
    const fetchUserPayments = async () => {
      try {
        const response = await qrApi.get(apiUrl);
        console.log(response);
        if (response.data.ok) {
          const userPayments = response.data.pagos;
          console.log(userPayments);
          // Actualizar el estado de los pagos en base a los datos del backend
          const updatedAbonosData = abonosData.map(abono => {
            const pagoEncontrado = userPayments.find(pago => {
              const pagoFecha = new Date(pago.fechaPago);
              console.log(pagoFecha);
              const abonoFecha = new Date(`${abono.gestion}-${months.indexOf(abono.mes) + 1}-01`);
              console.log(abonoFecha);
              return pagoFecha.getFullYear() === abonoFecha.getFullYear() &&
                     pagoFecha.getMonth() === abonoFecha.getMonth();
            });

            if (pagoEncontrado) {
              return { ...abono, estadoPagos: { idPago: pagoEncontrado._id, estado: true } };
            }

            return abono;
          });

          setAbonosData(updatedAbonosData);
        } else {
          // Manejar errores en la respuesta
          console.error("Error al obtener los pagos del usuario:", response.status);
        }
      } catch (error) {
        // Manejar errores en la solicitud
        console.error("Error al obtener los pagos del usuario:", error);
      }
    };
    fetchUserPayments();
  }, []);

  const handlePayAbono = (abono) => {
    console.log(abono);
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
