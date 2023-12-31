/* eslint-disable linebreak-style */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable padded-blocks */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable eol-last */
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import qrApi from '../../api/ui/qrApi';
import './UserInformationForm.css';

function UserInformationForm() {
  const username = localStorage.getItem('NombreUsuario');
  const email = localStorage.getItem('Email');
  console.log(email, username);
  const [userData, setUserData] = useState({
    userId: '',
    profesion: '',
    email,
    nombreCompleto: username,
    direccion: '',
    rni: '',
    telefono: ''
  });

  function resetForm() {
    setUserData({
      userId: '',
      profesion: '',
      email: '',
      nombreCompleto: '',
      direccion: '',
      rni: '',
      telefono: ''
    });
  }

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const createRegisterUserInformation = async (e) => {
    e.preventDefault();

    const requestData = {
      nombreCompleto: userData.nombreCompleto,
      email: userData.email,
      telefono: userData.telefono,
      profesion: userData.profesion,
      direccion: userData.direccion,
      rni: userData.rni
    };

    try {
      const response = await qrApi.post('/userInfo', requestData);

      if (response.status === 200) {
        alert('Registro creado exitosamente');
        console.log('Registro creado exitosamente');
        resetForm();
        history.push({
          pathname: '/app/pages/perfil-usuario',
        });
      } else {
        alert('Error al crear el registro');
        console.error('Error al crear el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  //*-----
  const { registroId } = useParams();

  const getRegistroUserInformationById = async () => {
    try {
      const response = await qrApi.get(`/userInfo/${registroId}`);
      const { registro } = response.data;
      setUserData({
        direccion: registro.direccion || '',
        email: registro.email || '',
        nombreCompleto: registro.nombreCompleto || '',
        profesion: registro.profesion || '',
        telefono: registro.telefono || '',
        rni: registro.rni || '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (registroId) {
      getRegistroUserInformationById(registroId);
    }
  }, [registroId]);
  //*-----


  const updateRegisterUserInformation = async () => {
    try {
      const response = await qrApi.put(`./userInfo/${registroId}`, {
        direccion: userData.direccion || '',
        email: userData.email || '',
        nombreCompleto: userData.nombreCompleto || '',
        profesion: userData.profesion || '',
        telefono: userData.telefono || '',
        rni: userData.rni || '',
      });
      console.log(response.data);
      alert('Registro userInfo actualizado con éxito');
      console.log('Registro userInfo actualizado con éxito');
      resetForm();
      history.push({
        pathname: '/app/pages/perfil-usuario',
      });
    } catch (error) {
      console.log(error);
      alert('No se pudo actualizar el userInfo');
      console.log('No se pudo actualizar el userInfo');
    }
  };

  return (
    <div className="container-userinformation">
      <div className="container-form-user">
        <Typography variant="h6" gutterBottom>
          Informacion del Usuario
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="profesion"
              name="profesion"
              label="Profesión"
              fullWidth
              autoComplete="profesion"
              value={userData.profesion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={userData.email}
              // onChange={handleInputChange}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="nombreCompleto"
              name="nombreCompleto"
              label="Nombre Completo"
              fullWidth
              autoComplete="nombreCompleto"
              value={userData.nombreCompleto}
              // onChange={handleInputChange}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="direccion"
              name="direccion"
              label="Dirección"
              fullWidth
              autoComplete="direccion"
              value={userData.direccion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="rni"
              name="rni"
              label="RNI"
              fullWidth
              autoComplete="rni"
              value={userData.rni}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telefono"
              name="telefono"
              label="Telefono/Celular"
              fullWidth
              autoComplete="telefono"
              value={userData.telefono}
              onChange={handleInputChange}
            />
          </Grid>
          <div className="container-buttons-abono">
            {registroId ? (
              <Button
                type="submit"
                onClick={updateRegisterUserInformation}
                variant="outlined"
                color="secondary"
                style={{ margin: '5%' }}
              >
                Guardar Cambios
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={createRegisterUserInformation}
                variant="outlined"
                color="secondary"
                style={{ margin: '5%' }}
              >
                Crear registro
              </Button>
            )}
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default UserInformationForm;