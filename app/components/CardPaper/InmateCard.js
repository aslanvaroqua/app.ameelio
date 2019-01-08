import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Typography from '@material-ui/core/Typography';

import styles from './cardStyle-jss';
import Popover from '../PopoverTooltip/InmatePopover';

class InmateCard extends React.Component {
  render() {
    const {
      classes,
      children,
      inmateInfo,
      onClickMail,
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          {children}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
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
          <IconButton aria-label="Contact mail" className={classes.button} onClick={() => onClickMail(inmateInfo)}>
            <ContactMailIcon className={classes.contactMail} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

InmateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  inmateInfo: PropTypes.object.isRequired,
  onClickMail: PropTypes.func.isRequired,
};

export default withStyles(styles)(InmateCard);
