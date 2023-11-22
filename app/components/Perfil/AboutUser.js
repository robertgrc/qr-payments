/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import { PersonPin } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import PapperBlock from '../PapperBlock/PapperBlock';

const AboutUser = ({ username, direccion, email, profesion, telefono, rni, handleUserInformation }) => (

  <div>
    {/* About Me */}
    <PapperBlock title={username} icon="ion-ios-contact-outline" whiteBg noMargin desc="Informacion acerca de mi">
      <Button onClick={handleUserInformation} type="submit" variant="outlined" color="secondary" style={{ width: '20%', marginBottom: '1%' }}>Agregar Informacion</Button>
      <Divider />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DateRange />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nombre de Usuario" secondary={username} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DateRange />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Profesión" secondary={profesion} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonPin />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalPhone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Telefono" secondary={telefono} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dirección" secondary={direccion} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="RNI" secondary={rni} />
        </ListItem>
      </List>
    </PapperBlock>
    <Divider />
  </div>
);

AboutUser.propTypes = {
  username: PropTypes.string.isRequired,
  direccion: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telefono: PropTypes.string.isRequired,
  profesion: PropTypes.string.isRequired,
  rni: PropTypes.string.isRequired,
  handleUserInformation: PropTypes.func.isRequired,
};

export default AboutUser;
