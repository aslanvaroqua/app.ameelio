import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { confirmEmail } from '../../../actions/AuthActions';

const styles = theme => ({
  container: {
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  title: {
    color: '#FFF'
  },
  subtitle: {
    color: '#FFF'
  },
  paper: {
    margin: 'auto',
    padding: 40,
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: 600,
      height: 300,
    },
    textAlign: 'center'
  },
  artwork: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30
  },
  icon: {
    margin: '10px 20px',
    background: 'rgba(255,255,255,0.6)',
    color: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    width: 100,
    height: 100,
    boxShadow: theme.shadows[4],
    '& svg': {
      fontSize: 64,
    },
  },
});

class ConfirmEmail extends React.Component {
  componentDidMount() {
    // Parse the URL query parameters
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get('token');
    const tokenId = params.get('tokenId');
    console.log(token, tokenId);
    const { confirmEmail: confirmEmailAction } = this.props;
    confirmEmailAction(token, tokenId);
  }

  render() {
    const title = brand.name + ' - Confirm Email';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.title} gutterBottom>Email confirmation</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Your account has been confirmed!
          </Typography>
        </div>
      </div>
    );
  }
}

ConfirmEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  confirmEmail: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  connect(null, { confirmEmail })
)(ConfirmEmail);
