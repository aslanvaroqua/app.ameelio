import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import ContactIcon from '@material-ui/icons/AccountBox';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit,
  },
  contact: {
    color: blue[500]
  },
});

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes, children } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton aria-label="Contact details" className={classes.button} onClick={this.handleClick}>
          <ContactIcon className={classes.contact} />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ margin: 15 }}>
            {children}
          </div>
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(SimplePopover);
