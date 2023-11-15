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
import { Chip, IconButton, Tooltip, Typography, TextField, Button } from '@material-ui/core';
import Money from '@material-ui/icons/MonetizationOnRounded';
import qrcodeImage from './images/qrcode.jpg';
import './UserPayments.css';
import qrApi from '../../api/ui/qrApi';

const UserPaymentsV2 = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAbono, setSelectedAbono] = useState(null);
  const [abonosData, setAbonosData] = useState([]);
  const fechaInicioInicial = new Date(); // Fecha actual
  fechaInicioInicial.setMonth(fechaInicioInicial.getMonth() - 4); // Restar 4 meses
  const [fechaInicio, setFechaInicio] = useState(fechaInicioInicial); // Estado para la fecha inicial
  const [monto, setMonto] = useState('');

  useEffect(() => {
    // Obtener la fecha actual
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Usar la fecha de inicio configurada en lugar de la fecha actual
    const startDate = new Date(fechaInicio);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();

    // Generar dinámicamente los abonos desde la fecha de inicio hasta el mes actual
    const months = [
      '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ];

    const abonos = [];
    for (let year = startYear; year <= currentYear; year++) {
      const startMonthOfYear = (year === startYear) ? startMonth : 0;
      const endMonthOfYear = (year === currentYear) ? currentMonth : 11;

      for (let month = startMonthOfYear; month <= endMonthOfYear; month++) {
        abonos.push({
          id: abonos.length + 1,
          mes: months[month],
          gestion: year,
          estadoPagos: { idPago: null, estado: false },
          fechaPago: '', // Inicializamos con una cadena vacía
        });
      }
    }

    setAbonosData(abonos);
  }, [fechaInicio]);
  console.log(abonosData);

  const handlePayAbono = async (abono) => {
    console.log(abono);
    setSelectedAbono(abono);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePayment = async () => {
    // Validar que el monto no esté vacío
    if (!monto) {
      alert('Ingresa un monto válido.');
      return;
    }

    // Crear el objeto de pago
    const pagoData = {
      nombreUsuario: localStorage.getItem('NombreUsuario'),
      fechaPago: new Date(),
      mesPago: `${selectedAbono.mes}-${selectedAbono.gestion}`,
      monto: parseFloat(monto), // Convertir el monto a número
      qr: '456422534',
      estado: true,
    };

    try {
      const response = await qrApi.post('pago', pagoData);

      if (response.data.ok) {
        console.log('Pago guardado exitosamente');
      } else {
        console.error('Error al intentar guardar el pago:', response.status);
      }
    } catch (error) {
      console.error('Error al intentar guardar el pago:', error);
    }
    // Cerrar el modal después de guardar
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
                  {/* Evaluar la propiedad estado de abono.estadoPagos */}
                  {abono.estadoPagos.estado ? (<Chip label="Cancelado" color="secondary" />) : (<Chip label="Pendiente" color="primary" />)}
                </td>
                <td>{abono.fechaActual}</td>
                <td>
                  {abono.estadoPagos.estado ? (
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
                  <TextField
                    label="Monto"
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleCreatePayment}>
                    Crear Pago
                  </Button>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaymentsV2;
