/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import { RegisterFormV2 } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import axios from 'axios';
import Swal from 'sweetalert2';
function RegisterV2(props) {
  const history = useHistory();
  const [valueForm, setValueForm] = useState(null);

  const submitForm = values => {
    setTimeout(() => {
      setValueForm(values);
      console.log(`\n\n${valueForm}`);
      console.log(`You submitted desdeRegisterV2:\n\n${valueForm}`);

      const postData = {
        name: values.get('name'),
        email: values.get('email'),
        password: values.get('password')
      };
      // Realizar la solicitud POST con Axios
      axios.post('http://localhost:4000/api/auth/new', postData)
        .then(response => {
          // Aquí puedes manejar la respuesta de la API si es necesario
          console.log('Response from API:', response.data);
          // window.location.href = '/app';
          history.push('login-v2');
        })
        .catch(error => {
          if (error.response) {
            // El servidor ha respondido con un estado de error
            console.error('Error response from server:', error.response.data.errors);
            // Extrae los mensajes de error de la respuesta del servidor
            const errorMessages = error.response.data.errors;
            let errorMessage = 'Hubo un error en la solicitud:\n\n';
            // Verifica si la respuesta contiene mensajes de error de campo
            if (errorMessages) {
              for (const fieldName in errorMessages) {
                if (errorMessages.hasOwnProperty(fieldName)) {
                  errorMessage += `${errorMessages[fieldName].msg}\n`;
                }
              }
            } else if (error.response.data.msg) {
              // Si no hay mensajes de error de campo, verifica si hay un mensaje de error general
              errorMessage = error.response.data.msg;
            }
            // Muestra el mensaje de error con SweetAlert2
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
            });
          } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
          } else {
            console.error('Request error:', error.message);
          }
        });
    }, 500); // simulate server latency
  };

  const title = brand.name + ' - Register Version 2';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.containerSide}>
        <Hidden smDown>
          <div className={classes.opening}>
            <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>Hola... encantando en conocerte</Typography>
            <Typography variant="h6" component="p" className={classes.subpening}>Regístrate para unirte a nosotros.</Typography>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <RegisterFormV2 onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

RegisterV2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterV2);
