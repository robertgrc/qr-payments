/* eslint-disable padded-blocks */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import axios from 'axios';
import data from '../../SampleApps/Timeline/api/timelineData';
import { fetchAction } from '../../SampleApps/Timeline/reducers/timelineActions';
import AboutUser from '../../../components/Perfil/AboutUser';
import UserPayments from '../../../components/Perfil/UserPayments';
import qrApi from '../../../api/ui/qrApi';
import { Button } from '@material-ui/core';


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

  const { userId } = useParams();
  console.log('userId****', userId);

  const [userData, setUserData] = useState({
    direccion: '',
    email: '',
    nombreCompleto: '',
    profesion: '',
    telefono: '',
  });

  useEffect(() => {

    if (userId) {
      // solicitud HTTP con Axios para obtener los datos del usuario
      axios.get(`http://localhost:4000/api/userInfo/usuario/${userId}`)
        .then((response) => {
          const userDataFromResponse = response.data.registros[0]; // Tomar el primer registro de la respuesta
          console.log(response.data);
          const datosUsuario = {
            direccion: userDataFromResponse.direccion || '',
            email: userDataFromResponse.email || '',
            nombreCompleto: userDataFromResponse.nombreCompleto || '',
            profesion: userDataFromResponse.profesion || '',
            telefono: userDataFromResponse.telefono || '',
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
      });
    }
  }, [userId]);

  useEffect(() => {
    console.log('userData****777', userData);
  }, [userData]);

  const username = localStorage.getItem('NombreUsuario');
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
            <Tab icon={<Payment />} label="PAGOS" />
          </Tabs>
        </Hidden>
      </AppBar>
      {value === 0 && <TabContainer><AboutUser nombreUsuario={username} direccion={userData.direccion} email={userData.email} nombreCompleto={userData.nombreCompleto} profesion={userData.profesion} telefono={userData.telefono} /></TabContainer>}
      {value === 1 && <TabContainer><UserPayments /></TabContainer>}
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
