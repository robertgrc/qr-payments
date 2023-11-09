/* eslint-disable prefer-destructuring */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { LoginFormV2 } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { showErrorMessage, showSuccessMessage } from '../../../helpers/messageHelpers';
import qrApi from '../../../api/ui/qrApi';

function LoginV2(props) {
  const history = useHistory();
  const [valueForm, setValueForm] = useState(null);
  const submitForm = values => {
    setTimeout(() => {
      setValueForm(values);
      console.log(`tu enviaste:\n\n${valueForm}`);
      console.log(`You submitted:\n\n${valueForm}`);

      const postData = {
        email: values.get('email'),
        password: values.get('password')
      };

      qrApi.post('auth', postData)
        .then(response => {
          // Aquí puedes manejar la respuesta de la API si es necesario
          // console.log('Response from API:', response.data);
          const token = response.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('IdUsuario', response.data.uid);
          localStorage.setItem('NombreUsuario', response.data.name);

          // window.location.href = '/app';
          if (response.data.ok) {
            // Verificar que la respuesta indique éxito y mostrar mensaje de éxito
            showSuccessMessage(response.data.msg);
            history.push('app/pages/perfil-usuario');
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
    }, 500); // Simular latencia del servidor
  };

  const title = brand.name + ' - Login Version 2';
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
            <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
             Bienvenido a QR Payment
              {/* {brand.name} */}
            </Typography>
            <Typography variant="h6" component="p" className={classes.subpening}>Por favor inicie sesión para continuar</Typography>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <LoginFormV2 onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

LoginV2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginV2);
