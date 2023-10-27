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
import { showErrorMessage, showSuccessMessage } from '../../../helpers/messageHelpers';
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
        password: values.get('password'),
        state: false,
        salario: 70,
        rol: 'USER_ROLE'
      };
      // Realizar la solicitud POST con Axios
      axios.post('http://localhost:4000/api/auth/new', postData)
        .then(response => {
          // Aquí puedes manejar la respuesta de la API si es necesario
          console.log('Response from API:', response.data);

          if (response.data.ok) {
            // Verificar que la respuesta indique éxito y mostrar mensaje de éxito
            showSuccessMessage(response.data.msg);
            history.push('login-v2');
          } else {
            // En caso de que la respuesta no indique éxito, manejarlo según sea necesario
            console.error('Respuesta del servidor no exitosa');
          }
        })
        .catch(error => {
          if (error.response) {
            console.error('Error response from server:', error.response.data.errors);
            // Extraer los mensajes de error de la respuesta del servidor
            const errorMessages = error.response.data.errors;
            let errorMessage = 'Hubo un error en la solicitud:\n\n';
            // Verificar si la respuesta contiene mensajes de error de campo
            if (errorMessages) {
              for (const fieldName in errorMessages) {
                if (errorMessages.hasOwnProperty(fieldName)) {
                  errorMessage += `${errorMessages[fieldName].msg}\n`;
                }
              }
            } else if (error.response.data.msg) {
              // Si no hay mensajes de error de campo, verificar si hay un mensaje de error general
              errorMessage = error.response.data.msg;
            }
            // Mostrar el mensaje de error con la función de ayuda
            showErrorMessage(errorMessage);
          } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
          } else {
            console.error('Request error:', error.message);
          }
        });
      // window.location.href = '/app';
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
