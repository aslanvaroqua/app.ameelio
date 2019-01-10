import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Title from './Title';
import styles from './landingStyle-jss';
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
        <Parallax
          offsetYMax={20}
          offsetYMin={-5}
          slowerScrollRate
          tag="figure"
        >
          <svg
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide3
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide3.svg#Line-Side3" />
          </svg>
        </Parallax>
        <Parallax
          offsetYMax={10}
          offsetYMin={-10}
          slowerScrollRate
          tag="figure"
        >
          <svg
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide4
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide4.svg#Line-Side4" />
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

class Technology extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    const descript = 'Trends is an analytics tool that that evaluates criminal justice data. We employ machine learning algorithms to analyze prison population records from federal and state correctional databases. Additionally, we offer download links to raw datasets in order to allow others a chance to conduct studies and innovate with us.';
    return (
      <div className={classes.tech}>
        {!slideMode && (<ParallaxDecoStyled />)}
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Title title="Trends" align="left" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={24}>
            <Grid item sm={6} xs={12}>
              <Typography>
                {descript}
              </Typography>
              <Fragment>
                <div className={classes.trendsLists}>
                  <List component="nav">
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-infinite-outline' />
                      </span>
                      <ListItemText primary="Beautiful Visuals" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-ionic-outline' />
                      </span>
                      <ListItemText primary="Real-time updates" />
                    </ListItem>
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-infinite-outline' />
                      </span>
                      <ListItemText primary="Predictive Analysis" />
                    </ListItem>
                    <ListItem>
                      <span className={classes.icon}>
                        <Ionicon icon='ios-ionic-outline' />
                      </span>
                      <ListItemText primary="Download Feature" />
                    </ListItem>
                    <Divider />
                  </List>
                </div>
              </Fragment>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div className={classNames(classes.trendsImg)}>
                <img className="center" src="/images/screen/image-one.jpg" alt="" />
              </div>
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
                <div className={classes.trendsBtn}>
                  <Button size="large" align="left" variant="outlined" color="primary">Explore data</Button>
                </div>
              </Grid>
            </Grid>  
          </div>
        </div>
      </div>
    );
  }
}

Technology.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Technology.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Technology);
