/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable eol-last */
import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import qrApi from '../../api/ui/qrApi';


function UserInformationForm() {

  const [userData, setUserData] = useState({
    userId: '',
    profesion: '',
    email: '',
    nombre: '',
    direccion: '',
    rni: '',
    telefono: ''
  });

  // const createRegisterUserInformation = (e) => {
  //   e.preventDefault();
  //   console.log('createRegister');
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const createRegisterUserInformation = async (e) => {
    e.preventDefault();

    const requestData = {
      nombreCompleto: userData.nombre,
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
        // Puedes realizar otras acciones después de que el registro sea exitoso
      } else {
        console.error('Error al crear el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const updateRegisterUserInformation = () => {

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
            id="nombre"
            name="nombre"
            label="Nombre Completo"
            fullWidth
            autoComplete="nombre"
            value={userData.nombre}
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