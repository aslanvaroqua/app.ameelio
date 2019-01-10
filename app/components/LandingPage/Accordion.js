import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '36px 0'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  }
});

function Accordion(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>1. Search</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Find any prisoner in the U.S. using our nationwide inmate database.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>2. Compose</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Simply type and attach photos.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>3. Send</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            We convert each letter into physical mail, and ship it using a trusted partner.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>4. Recieve</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Letters are printed and mailed by the next buisness day. We include a pre-adrressed return envelope in each letter.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

Accordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Accordion);