/* eslint-disable padded-blocks */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import dummy from 'dan-api/dummy/dummyContents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Cover,
  // Albums
} from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';
import { Payment } from '@material-ui/icons';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import data from '../../SampleApps/Timeline/api/timelineData';
import { fetchAction } from '../../SampleApps/Timeline/reducers/timelineActions';
import AboutUser from '../../../components/Perfil/AboutUser';
import qrApi from '../../../api/ui/qrApi';
import { useUser } from '../../context/UserContext';
import UserPaymentsV2 from '../../../components/Perfil/UserPaymentsV2';


function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function UserProfile(props) {

  const userId = localStorage.getItem('IdUsuario');
  const { userData, setUserData } = useUser();
  const [registroId, setRegistroId] = useState(null);

  // console.log('userId****', userId);
  const history = useHistory();
  useEffect(() => {

    if (userId) {
      // solicitud HTTP con Axios para obtener los datos del usuario
      qrApi.get(`userInfo/usuario/${userId}`)
        .then((response) => {
          const userDataFromResponse = response.data.registros[0]; // Tomar el primer registro de la respuesta
          // console.log(response.data);
          const datosUsuario = {
            direccion: userDataFromResponse.direccion || '',
            email: userDataFromResponse.email || '',
            nombreCompleto: userDataFromResponse.nombreCompleto || '',
            profesion: userDataFromResponse.profesion || '',
            telefono: userDataFromResponse.telefono || '',
            rni: userDataFromResponse.rni || '',
          };
          setUserData(datosUsuario);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    } else {
      // No hay usuario en el almacenamiento local, mostrar datos vacíos
      setUserData({
        direccion: '',
        email: '',
        nombreCompleto: '',
        profesion: '',
        telefono: '',
        rni: '',
      });
    }
  }, [userId]);

  useEffect(() => {
    // console.log('userData****777', userData);
  }, [userData]);

  const username = localStorage.getItem('NombreUsuario');
  const email = localStorage.getItem('Email');
  const title = brand.name + ' - Profile';
  const description = brand.desc;
  const { classes, fetchData } = props;
  // console.log(dataProps);
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchData(data);
  }, [fetchData, data]);

  const handleChange = (event, val) => {
    setValue(val);
  };

  // Efecto que se ejecuta cuando cambia el userId
  useEffect(() => {
  // Verifica si userId está definido
    if (userId) {
      qrApi.get(`http://localhost:4000/api/userInfo/usuario/${userId}`)
        .then(response => {
          if (response.data.registros.length > 0) {
            const registroUserInfoId = response.data.registros[0].id;
            setRegistroId(registroUserInfoId);
          } else {
            // No se encontró un registroId, establece registroId como null
            setRegistroId(null);
          }
        })
        .catch(error => {
          // Maneja errores en la petición, por ejemplo, mostrando un mensaje de error
          console.error('Error al obtener el registroId:', error);
        });
    }
  }, [userId]);

  const handleUserInformation = () => {
    console.log('click en userInformation');
    if (registroId) {
      // Si hay un registroId, pasa el registroId como parámetro
      history.push(`/app/pages/userInformationForm/${registroId}`);
    } else {
      // Si no hay registroId, simplemente redirige al formulario sin parámetros
      history.push('/app/pages/userInformationForm');
    }
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Cover
        coverImg={bgCover}
        avatar={dummy.user.avatar}
        name={username}
        desc="Pagina Principal"
      />
      <AppBar position="static" className={classes.profileTab}>
        <Hidden mdUp>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} />
            <Tab icon={<SupervisorAccount />} />
          </Tabs>
        </Hidden>
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} label="USUARIO" />
            <Tab icon={<Payment />} label="PAGOSV2" />
          </Tabs>
        </Hidden>
      </AppBar>
      {value === 0 && <TabContainer><AboutUser handleUserInformation={handleUserInformation} username={username} direccion={userData.direccion} email={email} nombreCompleto={userData.nombreCompleto} profesion={userData.profesion} telefono={userData.telefono} rni={userData.rni} /></TabContainer>}
      {value === 1 && <TabContainer><UserPaymentsV2 /></TabContainer>}
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  // dataProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const reducer = 'socmed';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataProps: state.getIn([reducer, 'dataTimeline'])
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch)
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileMapped);
