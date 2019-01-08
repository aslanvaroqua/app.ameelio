import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import crypto from '../../../../public/images/screen/crypto.jpg';
import { senderMockData } from './dummyData';

class LettersReview extends React.Component {
  clickHandler = () => {
    console.log('Send letter');
  };

  render() {
    const title = brand.name + ' - Review';
    const description = brand.desc;
    const { location } = this.props;
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
        <PapperBlock title="REVIEW" desc="" icon="ios-eye-outline" />
        <Grid container spacing={40}>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Recipient" desc="" icon="">
              {location.state && location.state.inmate && (
                <div>
                  <Typography variant="h6" component="h3">
                    {location.state.inmate.name.toUpperCase()}
                    ,
                    {location.state.inmate.number}
                  </Typography>
                  <Typography variant="subtitle2" component="h3">{location.state.inmate.facility}</Typography>
                  <Typography variant="subtitle2" component="h3">
                    {location.state.inmate.addressLine1}
                    ,&nbsp;
                    {location.state.inmate.pBox}
                  </Typography>
                  <Typography variant="subtitle2" component="h3">{location.state.inmate.addressLine2}</Typography>
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
              {location.state && location.state.message && (
                <Typography variant="subtitle1" component="h3">{location.state.message}</Typography>
              )}
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Photo" desc="" icon="">
              {location.state && location.state.images && (
                <img src={location.state.images.length === 0 ? crypto : location.state.images[0]} alt="Letter sender" />
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
  location: PropTypes.object.isRequired,
};
export default LettersReview;
