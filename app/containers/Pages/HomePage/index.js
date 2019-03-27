import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { senderMockData } from '../Letters/dummyData';

const styles = theme => ({
  list: {
    width: '100%',
    // maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  }
});

class HomePage extends React.Component {
  render() {
    const title = brand.name + ' - Home Page';
    const description = brand.desc;

    const { lettersUrl, classes } = this.props;

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
        <PapperBlock title="Home Page" desc="" />
        <PapperBlock title="User" desc="" icon="ios-contact">
          <Typography variant="h6" component="h3">
            {senderMockData.name.toUpperCase()}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {senderMockData.address_line1}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {senderMockData.address_city}
            ,&nbsp;
            {senderMockData.address_state}
            &nbsp;
            {senderMockData.address_zip}
          </Typography>
        </PapperBlock>
        <PapperBlock title="Sent Letters" desc="" icon="">
          {lettersUrl.length > 0 ? (
            <List className={classes.list} style={{ marginTop: 40 }}>
              {lettersUrl.map((url, index) => (
                <ListItem key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Letter
                    {' '}
                    {index + 1}
                  </a>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="subtitle2" component="h4">
              No letter has been sent.
            </Typography>
          )}
        </PapperBlock>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  lettersUrl: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const lettersUrl = state.getIn(['letters', 'lettersUrl']);
  return { lettersUrl: lettersUrl.toArray() };
}
export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(HomePage);
