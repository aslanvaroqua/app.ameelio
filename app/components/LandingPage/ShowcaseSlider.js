import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ShowcaseCard from '../CardPaper/ShowcaseCard';
import Title from './Title';
import styles from './landingStyle-jss';

class ShowcaseSlider extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.showcase}>
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Grid container className={classes.root} spacing={40}>
            <Grid item md={6} xs={12}>
              <Title
                title="Showcase"
                align="left"
                monocolor={slideMode && true}
              />
              <ShowcaseCard
                landscape
                title="Nam sollicitudin"
                desc="Aenean facilisis vitae purus facilisis semper."
                action="Try it"
                image="https://s3.amazonaws.com/ameelio-assets/public/screen/thumb1.jpg"
              />
              <ShowcaseCard
                landscape
                title="Vestibulum nec"
                desc="Cras convallis lacus orci, tristique tincidunt magna"
                action="See Demo"
                image="https://s3.amazonaws.com/ameelio-assets/public/screen/thumb3.jpg"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <ShowcaseCard
                landscape
                title="Curabitur"
                desc="Nulla vehicula leo ut augue tincidunt"
                action="See Demo"
                image="https://s3.amazonaws.com/ameelio-assets/public/screen/thumb5.jpg"
              />
              <ShowcaseCard
                landscape
                title="Nam sollicitudin"
                desc="Aenean facilisis vitae purus facilisis semper."
                action="Try It"
                image="https://s3.amazonaws.com/ameelio-assets/public/screen/thumb2.jpg"
              />
              <ShowcaseCard
                landscape
                title="Nam posuere accumsan"
                desc="Duis sed augue phasellus ante massa."
                action="See Demo"
                image="https://s3.amazonaws.com/ameelio-assets/public/screen/thumb4.jpg"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

ShowcaseSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

ShowcaseSlider.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(ShowcaseSlider);
