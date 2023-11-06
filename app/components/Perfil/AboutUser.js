/* eslint-disable linebreak-style */
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
import PapperBlock from '../PapperBlock/PapperBlock';

const AboutUser = ({ nombreUsuario, direccion, email, profesion, telefono }) => (
  <div>
    {/* About Me */}
    <PapperBlock title={nombreUsuario} icon="ion-ios-contact-outline" whiteBg noMargin desc="Informacion acerca de mi">
      <Divider />
      <List>
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
      </List>
    </PapperBlock>
    <Divider />
  </div>
);

AboutUser.propTypes = {
  nombreUsuario: PropTypes.string.isRequired,
  direccion: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telefono: PropTypes.string.isRequired,
  profesion: PropTypes.string.isRequired,
};

export default AboutUser;
