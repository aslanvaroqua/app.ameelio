import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Ionicon from 'react-ionicons';
import Title from './Title';
import styles from './landingStyle-jss';
import Accordion from './Accordion';
import Button from '@material-ui/core/Button';


let counter = 0;
function createFeatureData(icon, title, desc) {
  counter += 1;
  return {
    id: counter,
    icon,
    title,
    desc
  };
}

class Feature extends React.Component {
  state = {
    featureList: [
      createFeatureData('ios-infinite-outline', 'Fast Shipping', 'We print and mail letters by the next day.'),
      createFeatureData('ios-ionic-outline', 'Free', 'We provide 1 year free membership. After that, users are charged $3 a month.'),
      createFeatureData('ios-infinite-outline', 'Privacy', 'We use top of line encryption to keep your mesages private.'),
      createFeatureData('ios-ionic-outline', 'Make an impact', 'All of our proceeds are invested back into the nonprofit.')
    ]
  }

  render() {
    const { classes, slideMode } = this.props;
    const { featureList } = this.state;
    return (
      <div className={classNames(classes.feature, slideMode ? classes.mono : classes.color)}>
        <div className={!slideMode ? classes.container : ''}>
          <Grid container spacing={40}>
            <Grid item xs={12} md={5}>
              <Title title="Letters" align="left" monocolor={slideMode && true} />
              <Typography component="p" variant="p">
                Stay in touch with any inmate using our Letters feature. Compose a message and attach a photo, just like an email or text.
              </Typography>
              <img src="/images/screen/sample-letter.jpg" alt="" />
              <Accordion />
            </Grid>
            <Grid item xs={12} md={7}>
              <div className={classNames(classes.lettersImg)}>
                <img className="center" src="/images/screen/image.jpg" alt="" />
                <img src="/images/screen/image.jpg" alt="" />
              </div>
              <div className={classNames(classes.lettersBtn)}>
                <Button size="large" align="center" variant="outlined" color="primary">Send letter</Button>
              </div>
            </Grid>
          </Grid>
          <div>
            <Grid container className={classNames(classes.letterList)} spacing={40}>
              { featureList.map(item => (
                <Grid key={item.id.toString()} item xs={12} md={3}>
                  <Typography component="h4" variant="h4">
                    <span className={classes.icon}>
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

Feature.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

Feature.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Feature);
