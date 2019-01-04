import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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

class SearchInmateForm extends PureComponent {
  state = {
    inmateName: '',
    inmateNumber: '',
    state: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Search inmate');
  };

  render() {
    const { classes } = this.props;
    const { inmateName, inmateNumber, state } = this.state;
    return (
      <Fragment>
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container direction="row" alignItems="center">
            <Grid item md={6} xl={4} container direction="column" alignItems="flex-start" justify="space-around">
              <Grid item md={4}>
                <Typography variant="h6" component="h3">Inmate Name</Typography>
              </Grid>
              <Grid item md={8}>
                <Input
                  name="inmateName"
                  placeholder="Inmate Name"
                  value={inmateName}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid item md={6} xl={4} container direction="column" alignItems="flex-start">
              <Grid item md={4}>
                <Typography variant="h6" component="h3">Inmate Number</Typography>
              </Grid>
              <Grid item md={8}>
                <Input
                  name="inmateNumber"
                  placeholder="Inmate Number"
                  value={inmateNumber}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid item md={6} xl={4} container direction="column" alignItems="flex-start">
              <Grid item md={4}>
                <Typography variant="h6" component="h3">State</Typography>
              </Grid>
              <Grid item md={8}>
                <Input
                  name="state"
                  placeholder="State"
                  value={state}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            Search
          </Button>
        </form>
      </Fragment>
    );
  }
}

SearchInmateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchInmateForm);
