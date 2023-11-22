/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
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
import { showSuccessMessage, showErrorMessage } from './../../helpers/sweetalertMessages';

const UserPaymentsV2 = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAbono, setSelectedAbono] = useState(null);
  const [abonosData, setAbonosData] = useState([]);
  //*------
  const fechaCreacionUsuarioString = localStorage.getItem('FechaCreacionUsuario');
  const fechaCreacionUsuario = new Date(fechaCreacionUsuarioString);
  fechaCreacionUsuario.setMonth(fechaCreacionUsuario.getMonth() - 7); // Mostrar 7 meses hacia atras
  const [fechaInicio, setFechaInicio] = useState(fechaCreacionUsuario); // Estado para la fecha inicial
  const [monto, setMonto] = useState('');

  // Mensajes de éxito y error
  const [redibujarTabla, setRedibujarTabla] = useState(true);

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
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
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

  const idUsuario = localStorage.getItem('IdUsuario');
  const apiUrl = `pago/${idUsuario}`;

  useEffect(() => {
    const fetchAbonosData = async () => {
      try {
        const response = await qrApi.get(apiUrl);
        const { ok, pagos } = response.data; // Desestructura el objeto para obtener pagos

        if (ok && Array.isArray(pagos)) {
          // Actualizar abonosData con los datos de la consulta
          setAbonosData((prevAbonosData) => {
            const updatedAbonosData = prevAbonosData.map((abono) => {
              const pago = pagos.find((p) => {
                const [mesPago, gestionPago] = p.mesPago.split('-');
                return mesPago === abono.mes && String(gestionPago) === String(abono.gestion);
              });

              if (pago) {
                console.log('Actualizando abono:', abono);
                console.log('Con datos de pago:', pago);

                return {
                  ...abono,
                  estadoPagos: { idPago: pago._id, estado: pago.estado },
                  fechaPago: pago.fechaPago,
                };
              }

              return abono;
            });

            console.log('Abonos actualizados:', updatedAbonosData);
            return updatedAbonosData;
          });
        } else {
          console.error('La respuesta del servidor no es válida:', response.data);
          showErrorMessage('La respuesta del servidor no es válida.');
        }
      } catch (error) {
        console.error('Error al obtener los abonos:', error);
        // showErrorMessage('Error al obtener los abonos.');
      }
    };

    if (idUsuario) {
      fetchAbonosData();
    }
  }, [apiUrl, idUsuario, redibujarTabla]);

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
        showSuccessMessage('Pago guardado exitosamente');
        setRedibujarTabla(!redibujarTabla);
      } else {
        console.error('Error al intentar guardar el pago:', response.status);
        showErrorMessage('Error al intentar guardar el pago.');
      }
    } catch (error) {
      console.error('Error al intentar guardar el pago:', error);
      showErrorMessage('Error al intentar guardar el pago.');
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
              <th>Fecha de Pago</th>
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
                <td>
                  {/* Formatear la fecha antes de mostrarla */}
                  {abono.fechaPago ? new Date(abono.fechaPago).toLocaleDateString() : ''}
                </td>
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
                  <img src={qrcodeImage} alt="Código QR" />
                  {/* Aquí puedes mostrar la imagen del código QR si la tienes */}
                  <TextField
                    label="Monto"
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleCreatePayment} style={{ marginTop: '10px', paddingTop: '5px' }}>
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

// UserPaymentsV2.propTypes = {
//   username: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
// };

export default UserPaymentsV2;
