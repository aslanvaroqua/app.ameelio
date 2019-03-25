import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  list: {
    width: '100%',
    // maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  }
});

class LettersArchive extends React.Component {
  render() {
    const title = brand.name + ' - Letters';
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
        <PapperBlock title="LETTERS ARCHIVE" desc="" icon="ios-archive" />
        <PapperBlock title="Sent Letters" desc="" icon="">
          List of sent letters
          {lettersUrl.length > 0 && (
            <List className={classes.list} style={{ marginTop: 40 }}>
              {lettersUrl.map((url, index) => (
                <ListItem>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Letter
                    {' '}
                    {index + 1}
                  </a>
                </ListItem>
              ))}
            </List>
          )}
        </PapperBlock>
      </div>
    );
  }
}

LettersArchive.propTypes = {
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
)(LettersArchive);
