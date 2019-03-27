import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import { sendLetter } from '../../../actions/LettersActions';
import { senderMockData } from './dummyData';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'fixed',
    top: '45%',
    left: '50%',
    zIndex: '999',
    marginLeft: -30,
  },
  message: {
    whiteSpace: 'pre-wrap',
  }
});

class LettersReview extends React.Component {
  clickHandler = () => {
    console.log('Send letter');
    const {
      sendLetter: sendLetterAction,
      inmate,
      message,
      imageBase64,
    } = this.props;
    if (inmate.name && message) {
      const recipientAddress = {
        recipient: `${inmate.name}, ${inmate.number}`,
        primary_line: `${inmate.addressLine1}, ${inmate.pBox}`,
        secondary_line: inmate.addressLine2,
        zip_code: inmate.zip,
      };
      sendLetterAction(
        imageBase64,
        recipientAddress,
        senderMockData,
        message,
      );
    }
  };

  render() {
    const title = brand.name + ' - Review';
    const description = brand.desc;
    const {
      inmate,
      message,
      imageBase64,
      loading,
      classes,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        {loading && (
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.3)',
              position: 'fixed',
              zIndex: 99,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <CircularProgress
              className={classes.progress}
              color="secondary"
              size={60}
            />
          </div>
        )}
        <PapperBlock title="REVIEW" desc="" icon="ios-eye-outline" />
        <Grid container spacing={40}>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Recipient" desc="" icon="">
              {inmate && inmate.name && (
                <div>
                  <Typography variant="h6" component="h3">
                    {inmate.name.toUpperCase()}
                    ,
                    {inmate.number}
                  </Typography>
                  <Typography variant="subtitle2" component="h3">{inmate.facility}</Typography>
                  <Typography variant="subtitle2" component="h3">
                    {inmate.addressLine1}
                    ,&nbsp;
                    {inmate.pBox}
                  </Typography>
                  <Typography variant="subtitle2" component="h3">{inmate.addressLine2}</Typography>
                </div>
              )}
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Sender" desc="" icon="">
              <Typography variant="h6" component="h3">{senderMockData.name.toUpperCase()}</Typography>
              <Typography variant="subtitle2" component="h3">{senderMockData.address_line1}</Typography>
              <Typography variant="subtitle2" component="h3">
                {senderMockData.address_city}
                ,&nbsp;
                {senderMockData.address_state}
                &nbsp;
                {senderMockData.address_zip}
              </Typography>
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Message" desc="" icon="">
              {message !== '' && (
                <Typography variant="subtitle1" component="h3" className={classes.message}>{message}</Typography>
              )}
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Photo" desc="" icon="">
              {imageBase64 !== '' && (
                <img src={imageBase64} alt="Letter sender" />
              )}
            </PapperBlock>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" onClick={this.clickHandler} style={{ marginBottom: 40 }}>
          Send Letter
        </Button>
      </div>
    );
  }
}

LettersReview.propTypes = {
  sendLetter: PropTypes.func.isRequired,
  inmate: PropTypes.object,
  message: PropTypes.string,
  imageBase64: PropTypes.string,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};
LettersReview.defaultProps = {
  inmate: {},
  message: '',
  imageBase64: '',
  loading: false,
};

function mapStateToProps(state) {
  const inmate = state.getIn(['letters', 'letterInfo', 'inmate']);
  const message = state.getIn(['letters', 'letterInfo', 'message']);
  const imageBase64 = state.getIn(['letters', 'letterInfo', 'imageBase64']);
  const loading = state.getIn(['letters', 'loading']);
  return {
    inmate,
    message,
    imageBase64,
    loading,
  };
}
export default compose(
  connect(mapStateToProps, { sendLetter }),
  withStyles(styles)
)(LettersReview);
