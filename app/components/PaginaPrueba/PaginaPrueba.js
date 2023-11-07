/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable indent */

import React from 'react';
import axios from 'axios';
import qrApi from '../../api/ui/qrApi';
const PaginaPrueba = () => {

    const axiosRequest = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/pago');
          console.log('Respuesta de Axios:', response.data);
        } catch (error) {
          console.error('Error en la solicitud Axios:', error);
        }
      };

      const qrApiRequest = async () => {
        try {
          const response = await qrApi.get('/pago'); // Utiliza qrApi para la solicitud
          console.log('Respuesta de qrApi:', response.data);
        } catch (error) {
          console.error('Error en la solicitud qrApi:', error);
        }
      };

  return (
    <div>
      <h1>Pagina de Pruebas</h1>
      <button onClick={axiosRequest}>solicitudAxios</button>
      <button onClick={qrApiRequest}>qrApiRequest</button>
    </div>
  );
};

export default PaginaPrueba;
