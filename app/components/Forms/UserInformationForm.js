/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable eol-last */
import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import qrApi from '../../api/ui/qrApi';
import { showSuccessMessage } from '../../helpers/messageHelpers';
// import { showErrorMessage, showSuccessMessage } from '../../helpers/AlertMessages';


function UserInformationForm() {

  const [userData, setUserData] = useState({
    userId: '',
    profesion: '',
    email: '',
    nombreCompleto: '',
    direccion: '',
    rni: '',
    telefono: ''
  });

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
        console.log('Registro creado exitosamente');
        // showSuccessMessage('RegistroUserInfo creado con éxito');
        // Puedes realizar otras acciones después de que el registro sea exitoso
      } else {
        console.error('Error al crear el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // showErrorMessage('Error al crear RegistroUserInfo');
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
      // showSuccessMessage('Formulario actualizado con éxito');
      console.log('Registro userInfo actualizado con éxito');
      // resetForm();
      // history.push('../TablaCalendarioReservas');
    } catch (error) {
      console.log(error);
      // showErrorMessage('No se pudo actualizar el Formulario');
      console.log('No se pudo actualizar el userInfo');
    }
  };

  return (
    <Fragment>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
          <Button type="submit" onClick={updateRegisterUserInformation} variant="outlined" color="secondary" style={{ margin: '5%' }}>Guardar Cambios</Button>
          <Button type="submit" onClick={createRegisterUserInformation} variant="outlined" color="secondary" style={{ margin: '5%' }}>Crear Registro</Button>
        </div>
      </Grid>
    </Fragment>
  );
}

export default UserInformationForm;