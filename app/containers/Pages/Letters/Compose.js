import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, LetterComposeForm } from 'dan-components';
import Typography from '@material-ui/core/Typography';

class LettersCompose extends React.Component {
  render() {
    const title = brand.name + ' - Compose';
    const description = brand.desc;
    const { location, history } = this.props;
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
          {location.state && location.state.inmate && (
            <div>
              <Typography variant="h6" component="h3">
                {location.state.inmate.name.toUpperCase()}
                ,
                {location.state.inmate.number}
              </Typography>
              <Typography variant="subtitle2" component="h3">{location.state.inmate.facility}</Typography>
              <Typography variant="subtitle2" component="h3">{location.state.inmate.zip}</Typography>
              <Typography variant="subtitle2" component="h3">{location.state.inmate.address}</Typography>
            </div>
          )}
        </PapperBlock>
        <PapperBlock title="Write message" desc="" icon="">
          <LetterComposeForm history={history} inmate={location.state ? location.state.inmate : {}} />
        </PapperBlock>
      </div>
    );
  }
}

LettersCompose.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default LettersCompose;
