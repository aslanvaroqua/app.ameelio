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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
});

function SimpleAccordion(props) {
  const { classes, content } = props;
  return (
    <div className={classes.root}>
      {content.map((item) => (
        <ExpansionPanel key={item.heading}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{item.heading}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {item.content}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

SimpleAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    content: PropTypes.string,
  })).isRequired,
};

export default withStyles(styles)(SimpleAccordion);
