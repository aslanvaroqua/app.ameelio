import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import crypto from '../../../../public/images/screen/crypto.jpg';

class LettersReview extends React.Component {
  clickHandler = () => {
    console.log('Send letter');
  };

  render() {
    const title = brand.name + ' - Review';
    const description = brand.desc;
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
        <Grid container alignItems="center" spacing={40}>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Recipient" icon="">
              <Typography variant="h6" component="h3">JOHN DOE, 12345</Typography>
              <Typography variant="subtitle2" component="h3">Ulster Correctional Facility</Typography>
              <Typography variant="subtitle2" component="h3">P.O. Box 800</Typography>
              <Typography variant="subtitle2" component="h3">Napanoch, New York 123458-0800</Typography>
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Sender" icon="">
              <Typography variant="h6" component="h3">ERICA DOE</Typography>
              <Typography variant="subtitle2" component="h3">46 Worcester Lane</Typography>
              <Typography variant="subtitle2" component="h3">Brooklyn, New York 34568-9683</Typography>
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Message" icon="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie nulla sollicitudin, faucibus dolor eu, semper urna. Pellentesque vitae sodales turpis, nec porttitor ante. Proin egestas gravida semper. Aliquam tristique odio ut erat laoreet malesuada. Nulla hendrerit at nisl eu pretium. Integer ullamcorper elit eget magna malesuada vulputate. In quis vestibulum ante, non hendrerit lorem. Ut malesuada laoreet est, nec gravida nulla molestie eu.
              Nunc congue eget massa nec aliquam. Donec rutrum lorem sed urna malesuada porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum id libero a sapien sollicitudin cursus. Nam erat risus, blandit non elit quis, ornare dignissim lacus. Fusce tempus ex nec magna molestie scelerisque. Mauris at augue vitae orci elementum euismod quis vitae erat. Nullam gravida iaculis ultricies.
              Integer elementum lectus vel ullamcorper mollis. Suspendisse et vestibulum nisi. Vestibulum quis laoreet ante. Maecenas libero orci, pellentesque et eleifend venenatis, cursus vel est. Ut urna velit, molestie fringilla nisl vel, tristique pharetra sem. Suspendisse eu egestas nunc. Donec erat erat, finibus vel accumsan eget, tincidunt et purus. Nunc sem nisi, faucibus quis leo ut, porttitor condimentum tellus.
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Photo" icon="">
              <img src={crypto} alt="Letter sender" />
            </PapperBlock>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" onClick={this.clickHandler}>
          Send Letter
        </Button>
      </div>
    );
  }
}

export default LettersReview;
