import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { withStyles } from '@material-ui/core/styles';
import styles from './landingStyle-jss';
import Grid from '@material-ui/core/Grid';
import RegisterForm from '../Forms/RegisterForm';
import Ionicon from 'react-ionicons';



function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <ParallaxProvider>
      <div className={classes.bannerParallaxWrap}>
        <Parallax
          offsetYMax={10}
          offsetYMin={-60}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner1)} />
        </Parallax>
        <Parallax
          offsetYMax={15}
          offsetYMin={-50}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner2)} />
        </Parallax>
        <Parallax
          offsetYMax={70}
          offsetYMin={-1}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner1)} />
        </Parallax>
        <Parallax
          offsetYMax={60}
          offsetYMin={-30}
          slowerScrollRate
          tag="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner2)} />
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

let counter = 0;
function bannerFeatureData(icon, title, desc) {
  counter += 1;
  return {
    id: counter,
    icon,
    title,
    desc
  };
}

class Banner extends React.Component {
  state = {
    bannerList: [
      bannerFeatureData('ios-infinite-outline', 'Letters', 'Send letters and photos to any inmate in the U.S. prison system.'),
      bannerFeatureData('ios-ionic-outline', 'Connect', 'Send real-time e-messages and video chat from any device. (Coming soon)'),
      bannerFeatureData('ios-ionic-outline', 'Forum', 'Build a social profile, and start connecting with a network of families, friends, and advocates.'),
      bannerFeatureData('ios-infinite-outline', 'Trends', 'Explore data and machine learning predictions on the justice system.')
    ]
  }

  render() {
    const { classes, gradient, slideMode } = this.props;
    const { bannerList } = this.state;

    return (
      <div
        className={
          classNames(
            classes.banner,
            gradient ? classes.gradient : classes.solid,
            slideMode ? classes.out : classes.fit
          )
        }
      >
        {!slideMode && <ParallaxDecoStyled />}
        <div className={!slideMode ? classes.container : ''}>
          <Grid container spacing={40}>
            <Grid item xs={12} md={7}>
              <Typography align='left' component="h2" variant="h2" gutterBottom>Free and open source prison communication, social network, and data platform.</Typography>
              <Typography className={classes.colorWhite} align='left' component="h6" variant="h6" gutterBottom>Send letters. Chat. Collaborate. Explore Data.</Typography>
              <Typography align='left' component="p" variant="p" gutterBottom>Ameelio is a nonprofit technology company. We build tools to serve inmates and their loved ones. Our services make it easy and fun to stay in touch with inmates, connect with a nework of families and advocates, and explore data on the justice sytem. Unlike costly and inpersonal prison services, our platform strives to be completely free and accesible to all users. We are committed to creating a future where every inmate is connected.</Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <RegisterForm />
              <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                  <span className='store'>
                    <Ionicon icon='ios-appstore' />
                  </span>
                </Grid>
                <Grid item xs={12} md={6}>
                  <span className='store'>
                    <Ionicon icon='md-appstore' />
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.previewApp}>
            <Hidden smDown>
              <div className={classNames(classes.screen)}>
                <img src="/images/screen/ipad.png" alt="crm dashboard" />
              </div>
            </Hidden>
            <div className={classNames(classes.screen)}>
              <img src="/images/screen/mac.png" alt="personal dashboard" />
            </div>
            <Hidden smDown>
              <div className={classNames(classes.screen)}>
                <img src="/images/screen/iphone.png" alt="crypto dashboard" />
              </div>
            </Hidden>   
          </div>
          <div className={classNames(classes.List)}>
            <Grid container className={classes.root} spacing={40}>
              { bannerList.map(item => (
                <Grid key={item.id.toString()} item xs={12} md={3}>
                  <Typography component="h4" variant="h4">
                    <span className={classes.banner.icon}>
                      <Ionicon icon={item.icon} />
                    </span>
                  </Typography>
                  <Typography component="h6" variant="h6">
                    {item.title}
                  </Typography>
                  <Typography className={slideMode ? classes.colorWhite : ''}>
                    {item.desc}
                  </Typography>
                </Grid>
              )) }
            </Grid>
          </div>
        </div>  
      </div>
    );
  }
}


Banner.propTypes = {
  classes: PropTypes.object.isRequired,
  gradient: PropTypes.bool.isRequired,
  slideMode: PropTypes.bool
};

Banner.defaultProps = {
  slideMode: false
};

const reducer = 'ui';
const mapStateToProps = state => ({
  gradient: state.getIn([reducer, 'gradient']), 
});

const BannerMaped = connect(
  mapStateToProps,
)(Banner);

export default (withStyles(styles)(BannerMaped));
