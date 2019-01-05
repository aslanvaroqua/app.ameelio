import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import InmateCard from '../CardPaper/InmateCard';
import { inmatesMockList } from '../../containers/Pages/Letters/dummyData';

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
    loading: false,
    inmatesList: [],
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Search inmate');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ inmatesList: inmatesMockList, loading: false });
    }, 1000);
  };

  onClickMail = (inmate) => {
    const { history } = this.props;
    history.push({
      pathname: '/app/letters/compose',
      state: { inmate },
    });
  };

  render() {
    const { classes } = this.props;
    const {
      inmateName,
      inmateNumber,
      state,
      loading,
      inmatesList,
    } = this.state;
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
        {loading && (
          <Grid container alignItems="center" justify="center">
            <CircularProgress
              className={classes.progress}
              color="secondary"
            />
          </Grid>
        )}
        {inmatesList.length > 0 && (
          <Grid container alignItems="center" spacing={40} style={{ marginTop: 40, marginBottom: 20 }}>
            {inmatesList.map((inmate) => (
              <Grid item xs={12} sm={6} md={4} key={inmate.id}>
                <InmateCard inmateInfo={inmate} onClickMail={this.onClickMail}>
                  <Typography variant="h6" component="h3">
                    {inmate.name.toUpperCase()}
                    ,
                    {inmate.number}
                  </Typography>
                </InmateCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Fragment>
    );
  }
}

SearchInmateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchInmateForm);
