import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import UploadInputImg from './UploadInputImg';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  input: {
    margin: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class LetterComposeForm extends PureComponent {
  state = {
    message: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Review letter');
  };

  render() {
    const { classes } = this.props;
    const { message } = this.state;
    return (
      <Fragment>
        <UploadInputImg />
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Input
            name="message"
            placeholder="Start typing here"
            value={message}
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
            onChange={this.handleChange}
            multiline
            fullWidth
            rows={10}
          />
          <Grid container direction="column">
            <Typography variant="subtitle2" component="p" style={{ marginLeft: 25 }}>
              Characters left:
              {' '}
              {6000 - message.length}
            </Typography>
            <Grid item md={3} style={{ marginTop: 20 }}>
              <Button color="primary" variant="contained" type="submit">
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

LetterComposeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterComposeForm);
