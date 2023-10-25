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
import PapperBlock from '../PapperBlock/PapperBlock';


const AboutUser = () => (
  <div>
    <h1>AboutUser</h1>
    {/* About Me */}
    <PapperBlock title="Robert Rogriguez" icon="ion-ios-contact-outline" whiteBg noMargin desc="Informacion acerca de mi">
      <Divider />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DateRange />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nacimiento" secondary="Jan 9, 1994" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonPin />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="RNI" secondary="28921038" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalPhone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Phone" secondary="(+591)70784004" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Address" secondary="Chicendo Street no.105 Block A/5A - Barcelona, Spain" />
        </ListItem>
      </List>
    </PapperBlock>
    <Divider />
  </div>
);

export default AboutUser;
