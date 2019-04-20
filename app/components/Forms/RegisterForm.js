import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import { Checkbox, TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import styles from './user-jss';
import fbtn from 'dan-images/oauth/fbtn.png';
import gbtn from 'dan-images/oauth/gbtn.png';


// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  console.log(value, allValues.get('password'));
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

class RegisterForm extends React.Component {
  state = {
    tab: 0,
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      onSubmitGoogle,
      onSubmitFacebook
    } = this.props;
    const { tab } = this.state;
    return (
      <Fragment>

          <NavLink to="/" className={classNames(classes.regLogo, classes.outer)}>
            <img className={classes.regLogo} src="https://ameelio.com/build/images/logo.png" alt={brand.name} />

          </NavLink>
        <Paper className={classNames(classes.paperWrap, classes.topMargin, deco && classes.petal)}>
          {/* <Hidden smDown> */}
            <div className={classes.topBar}>
              <NavLink to="/" className={classes.brand}>
                <img  src={logo} alt={brand.name} />
              </NavLink>
              <Button size="small" className={classes.buttonLink} component={NavLink} to="/login">
                <Icon className={classes.icon}>arrow_forward</Icon>
                Already have account ?
              </Button>
            </div>
          {/* </Hidden> */}
          <Typography variant="h6" className={classes.title} gutterBottom>
            Register
          </Typography>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">

          </Typography>

          <section className={classes.socmedFull}>

            
<Button fullWidth variant="outlined" onClick={onSubmitGoogle} className={classes.noPadding} size="large" type="button">
  <img className={classes.noPadding} src={gbtn} alt="Google" />

</Button>
<Button fullWidth variant="outlined" onClick={onSubmitFacebook} className={classes.noPadding} size="large"  type="button">
  <img className={classes.noPadding} src={fbtn} alt="Facebook" />
</Button>

</section>
            <section className={classes.formWrap}>
              <form onSubmit={handleSubmit}>
               <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="fname"
                      component={TextField}
                      placeholder="First Name"
                      label="First Name"
                      required
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="lname"
                      component={TextField}
                      placeholder="Last Name"
                      label="Last Name"
                      required
                      className={classes.field}
                    />
                  </FormControl>
                </div> 
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="name"
                      component={TextField}
                      placeholder="Username"
                      label="Username"
                      required
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="email"
                      component={TextField}
                      placeholder="Your Email"
                      label="Your Email"
                      required
                      validate={[required, email]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="password"
                      component={TextField}
                      type="password"
                      label="Your Password"
                      required
                      validate={[required, passwordsMatch]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="passwordConfirm"
                      component={TextField}
                      type="password"
                      label="Re-type Password"
                      required
                      validate={[required, passwordsMatch]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControlLabel control={<Field name="checkbox" component={Checkbox} className={classes.agree} />} label="Agree with" />
                  <a href="#" className={classes.link}>Terms &amp; Condition</a>
                </div>
                <div className={classes.btnArea}>
                  <Button variant="contained" color="primary" type="submit">
                    Continue
                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                  </Button>
                </div>
              </form>
            </section>
 


        </Paper>
      </Fragment>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  onSubmitFacebook: PropTypes.func,
  onSubmitGoogle: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmitFacebook: () => {},
  onSubmitGoogle: () => {},
};


const RegisterFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(RegisterForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
