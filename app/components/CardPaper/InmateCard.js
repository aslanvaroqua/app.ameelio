import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import styles from './cardStyle-jss';
import Popover from '../PopoverTooltip/InmatePopover';

class InmateCard extends React.Component {
  render() {
    const {
      classes,
      inmateInfo,
      onClickMail,
    } = this.props;
    const [firstName, lastName] = inmateInfo.name.split(' ');
    return (
      <ListItem divider>
        <Avatar className={classes.inmateAvatar}>
          {firstName.slice(0, 1)}
          {lastName.slice(0, 1)}
        </Avatar>
        <ListItemText primary={inmateInfo.name} />
        <ListItemIcon>
          <Popover>
            <Typography variant="h6" component="h3">
              {inmateInfo.name.toUpperCase()}
              ,
              {inmateInfo.number}
            </Typography>
            <Typography variant="subtitle2" component="h3">{inmateInfo.facility}</Typography>
            <Typography variant="subtitle2" component="h3">
              {inmateInfo.addressLine1}
              ,&nbsp;
              {inmateInfo.pBox}
            </Typography>
            <Typography variant="subtitle2" component="h3">{inmateInfo.addressLine2}</Typography>
          </Popover>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton aria-label="Contact details" className={classes.button} onClick={() => onClickMail(inmateInfo)}>
            <ContactMailIcon className={classes.contact} />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    );
  }
}

InmateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  inmateInfo: PropTypes.object.isRequired,
  onClickMail: PropTypes.func.isRequired,
};

export default withStyles(styles)(InmateCard);
