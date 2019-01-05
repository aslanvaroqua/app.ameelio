import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import UploadInputImg from './UploadInputImg';

const getBase64 = (file) => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
);

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
    error: false,
    images: [],
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, inmate } = this.props;
    const { message, images } = this.state;
    if (message.length === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      console.log('Review letter');
      // Get images in base64 string representation
      try {
        const imagesPromises = images.map(image => getBase64(image));
        const imagesBase64 = await Promise.all(imagesPromises);
        console.log(imagesBase64);
        history.push({
          pathname: '/app/letters/review',
          state: {
            inmate,
            message,
            images: imagesBase64,
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  updateImages = (images) => {
    this.setState({ images });
  };

  render() {
    const { classes } = this.props;
    const { message, error } = this.state;
    return (
      <Fragment>
        <UploadInputImg updateImages={this.updateImages} />
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
            {error && (
              <Typography color="error" variant="subtitle2" component="p" style={{ marginLeft: 25 }}>
                Please compose a message.
              </Typography>
            )}
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
  history: PropTypes.object.isRequired,
  inmate: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterComposeForm);
