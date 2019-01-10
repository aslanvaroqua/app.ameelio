import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import withWidth from '@material-ui/core/withWidth';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import styles from './landingStyle-jss';
import { Typography, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Ionicon from 'react-ionicons';


function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <div className={classes.bannerParallaxWrap}>
          <Parallax
            offsetYMax={30}
            offsetYMin={-10}
            slowerScrollRate
            tag="figure"
          >
            <svg
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal1
                )
              }
            >
              <use xlinkHref="/images/decoration/petal3.svg#Petal-3" />
            </svg>
          </Parallax>
          <Parallax
            offsetYMax={30}
            offsetYMin={-5}
            slowerScrollRate
            tag="figure"
          >
            <svg
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal2
                )
              }
            >
              <use xlinkHref="/images/decoration/petal4.svg#Petal-4" />
            </svg>
          </Parallax>
        </div>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Showcase extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <section className={classes.showcase}>
        {!slideMode && <ParallaxDecoStyled />}
        <div className={classes.container}>
          <Grid container className={classes.root} spacing={40}>
            <Grid item xs={12} md={7}>
              <div className={classNames(classes.connectImg)}>
                <img className="center" src="/images/screen/image.jpg" alt="" />
                <img src="/images/screen/image.jpg" alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <Title title="Connect" align='left' monocolor={slideMode && true} />
              <Typography component="p" variant="p">
                We are developing a real-time AI-backed e-messaging and video visiation tool. Allowing users to connect with inmates just like texting or facetime, with any device.
              </Typography>
              <Fragment>
                <div className={classes.connectLists}>
                  <List component="nav">
                    <ListItem>
                      <ListItemText primary="Inmates" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Family & Friends" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Attorneys" />
                    </ListItem>
                    <Divider />
                  </List>
                </div>
              </Fragment>
              <Fragment>
                <div className={classes.connectListsIcon}>
                  <List component="nav">
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-infinite-outline' />
                      </span>
                      <ListItemText primary="Search for inmate" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-ionic-outline' />
                      </span>
                      <ListItemText primary="Send connect request" />
                    </ListItem>
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-infinite-outline' />
                      </span>
                      <ListItemText primary="Get approved" />
                    </ListItem>
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-ionic-outline' />
                      </span>
                      <ListItemText primary="Send messages or schedule video visit" />
                    </ListItem>
                    <Divider />
                  </List>
                </div>
              </Fragment>
              <div className={classNames(classes.lettersBtn)}>
                <Button size="large" align="center" variant="outlined" color="primary">Signup for updates</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
}


Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  slideMode: PropTypes.bool
};

Showcase.defaultProps = {
  slideMode: false
};


export default withWidth()(withStyles(styles)(Showcase));

