/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable eol-last */
import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


function UserInformationForm() {

  const [userData, setUserData] = useState({
    userId: '',
    fecha: '',
    profesion: '',
    email: '',
    nombre: '',
    direccion: '',
    rni: '',
    telefono: ''
  });

  const handleUserInformation = () => {

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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="direccion"
            name="direccion"
            label="Dirección"
            fullWidth
            autoComplete="direccion"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="rni"
            name="rni"
            label="RNI"
            fullWidth
            autoComplete="rni"
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
          />
        </Grid>
        <div className="container-buttons-abono">
          <Button type="submit" onClick={handleUserInformation} variant="outlined" color="secondary" style={{ margin: '5%' }}>Guardar Cambios</Button>
        </div>
      </Grid>
    </Fragment>
  );
}

export default UserInformationForm;