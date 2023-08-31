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
import axios from 'axios';

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

      axios.post('http://localhost:4000/api/auth', postData)
        .then(response => {
          // Aquí puedes manejar la respuesta de la API si es necesario
          console.log('Response from API:', response.data);
          // window.location.href = '/app';
          history.push('app/pages/user-profile');
        })
        .catch(error => {
          console.error('Error:', error);
          // Aquí puedes manejar el error si ocurre
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
