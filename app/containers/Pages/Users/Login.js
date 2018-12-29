import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  login,
  facebookLogin,
  googleLogin,
  socialLoginRedirect,
} from '../../../actions/AuthActions';

class Login extends React.Component {
  // state = {
  //   valueForm: []
  // }
  componentDidMount() {
    const { stitchClient, socialLoginRedirect: socialLoginRedirectAction } = this.props;
    if (stitchClient.auth.hasRedirectResult()) {
      console.log('handle social redirect');
      socialLoginRedirectAction();
    }
  }

  submitGoogle = () => {
    const { googleLogin: googleLoginAction } = this.props;
    googleLoginAction();
  };

  submitFacebook = () => {
    const { facebookLogin: facebookLoginAction } = this.props;
    facebookLoginAction();
  }

  submitForm(values) {
    console.log(values.toObject());
    const { login: loginAction } = this.props;
    loginAction(values.toObject());
  }

  render() {
    const title = brand.name + ' - Login';
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
          <div className={classes.userFormWrap}>
            <LoginForm
              onSubmit={(values) => this.submitForm(values)}
              onSubmitGoogle={this.submitGoogle}
              onSubmitFacebook={this.submitFacebook}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  stitchClient: PropTypes.object.isRequired,
  facebookLogin: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  socialLoginRedirect: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { stitchClient: state.getIn(['auth', 'stitchClient']) };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    login,
    facebookLogin,
    googleLogin,
    socialLoginRedirect
  })
)(Login);
