
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { withStyles } from '@material-ui/core/styles';
import 'dan-styles/vendors/react-animated-slider/react-animated-slider.css';
import Title from './Title';
import styles from './landingStyle-jss';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';



function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <Parallax
          offsetYMax={10}
          offsetYMin={-1}
          slowerScrollRate
          tag="figure"
        >
          <svg
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide1
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide1.svg#Line-Side1" />
          </svg>
        </Parallax>
        <Parallax
          offsetYMax={5}
          offsetYMin={-10}
          slowerScrollRate
          tag="figure"
        >
          <svg
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide2
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide2.svg#Line-Side2" />
          </svg>
        </Parallax>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Testimonials extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.testimonials}>
        {!slideMode && (<ParallaxDecoStyled />)}
        <div className={!slideMode ? classes.container : classes.fullSliderContent}>
          <Title title="Forum" align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={40} justify="center" direction="row">
            <Grid item xs={12} md={4}>
              <Typography component="p" variant="p">
                Welcome to a new social network built with real purpose. Connect with other family & friends, advocates, attorneys, among others. Post, chat, collaborate.
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.forumImg}>
            <Grid container className={classes.root} spacing={40}>
              <Grid item xs={12} md={6}>
                <img src="/images/screen/image-one.jpg" alt="" />
              </Grid>
              <Grid item xs={12} md={6}>
                <img src="/images/screen/image-one.jpg" alt="" />
              </Grid>
              <Grid item xs={12} md={12}>
                <div>
                  <Button size="large" align="center" variant="outlined" color="primary">Create account</Button>
                </div>
              </Grid>
            </Grid>  
          </div>
        </div>
      </div>
    );
  }
}

Testimonials.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Testimonials);
