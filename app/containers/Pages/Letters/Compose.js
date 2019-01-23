import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, LetterComposeForm } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class LettersCompose extends React.Component {
  render() {
    const title = brand.name + ' - Compose';
    const description = brand.desc;
    const { inmate } = this.props;
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
        <PapperBlock title="Write message" desc="" icon="">
          <LetterComposeForm />
        </PapperBlock>
      </div>
    );
  }
}

LettersCompose.propTypes = {
  inmate: PropTypes.object,
};

LettersCompose.defaultProps = {
  inmate: {},
};

function mapStateToProps(state) {
  return { inmate: state.getIn(['letters', 'letterInfo', 'inmate']) };
}
export default connect(mapStateToProps)(LettersCompose);
