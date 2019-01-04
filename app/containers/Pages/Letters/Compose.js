import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, LetterComposeForm } from 'dan-components';
import Typography from '@material-ui/core/Typography';

class LettersCompose extends React.Component {
  render() {
    const title = brand.name + ' - Compose';
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
        <PapperBlock title="COMPOSE" desc="" icon="ios-create-outline" />
        <PapperBlock title="Recipient" desc="" icon="">
          <Typography variant="h6" component="h3">JOHN DOE, 12345</Typography>
          <Typography variant="subtitle2" component="h3">Ulster Correctional Facility</Typography>
          <Typography variant="subtitle2" component="h3">P.O. Box 800</Typography>
          <Typography variant="subtitle2" component="h3">Napanoch, New York 123458-0800</Typography>
        </PapperBlock>
        <PapperBlock title="Write message" desc="" icon="">
          <LetterComposeForm />
        </PapperBlock>
      </div>
    );
  }
}

export default LettersCompose;
