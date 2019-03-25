import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { updateLetterInfo } from '../../actions/LettersActions';
import InmateCard from '../CardPaper/InmateCard';
// import { inmatesMockList } from '../../containers/Pages/Letters/dummyData';

const styles = theme => ({
  demo: {
    height: 'auto'
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  input: {
    margin: theme.spacing.unit * 3
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  list: {
    width: '100%',
    // maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  }
});

class SearchInmateForm extends PureComponent {
  state = {
    inmateName: '',
    inmateNumber: '',
    state: '',
    loading: false,
    inmatesList: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log('Search inmate');
    this.setState({ loading: true });
    try {
      const { inmateName, inmateNumber, state } = this.state;
      const query = `${inmateName}${inmateNumber}${state}`;
      const results = await this.searchInmate(query.trim());
      this.setState({ inmatesList: results, loading: false });
    } catch (error) {
      console.log('Search inmate error', error);
      this.setState({ loading: false });
    }
  };

  onClickMail = inmate => {
    const { updateLetterInfo: updateLetterInfoAction } = this.props;
    updateLetterInfoAction('inmate', inmate);
  };

  searchInmate = async query => {
    const sampleObj = {
      // id: 0,
      name: 'John Doe',
      number: 12345,
      facility: 'Ulster Correctional Facility',
      addressLine1: '750 Berme Road',
      addressLine2: 'Napanoch, New York 12458',
      pBox: 'P.O. Box 800',
      zip: '12458'
    };
    const response = await fetch(
      'https://host-k4gwoq.api.swiftype.com/api/as/v1/engines/ameelio/search',
      {
        body: JSON.stringify({ query }),
        headers: {
          Authorization: 'Bearer search-xn4t59cm1jaricukef9t2f5j',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );
    const data = await response.json();
    console.log('response data', data);
    const parsedData = data.results.map(result => {
      const inmate = {
        ...sampleObj,
        id: result.id.raw,
        name: result.first_name.raw + ' ' + result.last_name.raw,
        number: result.inmate_number.raw,
        facility: result.facility.raw
      };
      return inmate;
    });
    console.log('parsedData', parsedData);
    return parsedData;
  };

  render() {
    const { classes } = this.props;
    const {
      inmateName,
      inmateNumber,
      state,
      loading,
      inmatesList
    } = this.state;
    return (
      <Fragment>
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container direction="row" alignItems="center">
            <Grid
              item
              md={6}
              xl={4}
              container
              direction="column"
              alignItems="flex-start"
              justify="space-around"
            >
              <Grid item md={4}>
                <Typography variant="h6" component="h3">
                  Inmate Name
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Input
                  name="inmateName"
                  placeholder="Inmate Name"
                  value={inmateName}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xl={4}
              container
              direction="column"
              alignItems="flex-start"
            >
              <Grid item md={4}>
                <Typography variant="h6" component="h3">
                  Inmate Number
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Input
                  name="inmateNumber"
                  placeholder="Inmate Number"
                  value={inmateNumber}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xl={4}
              container
              direction="column"
              alignItems="flex-start"
            >
              <Grid item md={4}>
                <Typography variant="h6" component="h3">
                  State
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Input
                  name="state"
                  placeholder="State"
                  value={state}
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
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
            <CircularProgress className={classes.progress} color="secondary" />
          </Grid>
        )}
        {inmatesList.length > 0 && (
          <List className={classes.list} style={{ marginTop: 40 }}>
            {inmatesList.map(inmate => (
              <InmateCard
                key={inmate.id}
                inmateInfo={inmate}
                onClickMail={this.onClickMail}
              />
            ))}
          </List>
        )}
      </Fragment>
    );
  }
}

SearchInmateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  updateLetterInfo: PropTypes.func.isRequired
};

export default compose(
  connect(
    null,
    { updateLetterInfo }
  ),
  withStyles(styles)
)(SearchInmateForm);
