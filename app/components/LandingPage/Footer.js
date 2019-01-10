import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';
import link from 'dan-api/ui/link';
import Typography from '@material-ui/core/Typography';
import styles from './landingStyle-jss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

let counter = 0;
function createData(name, url) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
  };
}

function Decoration(props) {
  const { classes } = props;
  return (
    <div>
      <svg className={classes.footerDecoration}>
        <use xlinkHref="/images/decoration/petal5.svg#Petal-Bottom" />
      </svg>
    </div>
  );
}

Decoration.propTypes = {
  classes: PropTypes.object.isRequired,
};

const DecorationStyled = withStyles(styles)(Decoration);

class Footer extends React.Component {
  state = {
    menuList: [
      createData('Help', ''),
      createData('Feedback', ''),
      createData('About', ''),
      createData('Blog', ''),
      createData('Security', ''),
      createData('Source', ''),
      createData('Press', '')
    ]
  }

  render() {
    const { menuList } = this.state;
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <DecorationStyled />
        <Typography component="h4" variant="h4" align="center">
          *We are hiring interns.Apply here
        </Typography>
        <div className={classes.emptyBox}></div>
        <div className={classes.container}>
          <div className={classes.spaceContainer}>
            <nav>
              <ul>
                { menuList.map(item => (
                  <li key={item.id.toString()}>
                    <Button className="footerBtn" size="small" href={item.url}>{item.name}</Button>
                  </li>
                )) }
              </ul>
            </nav>
          </div>
          <div className='footerIcons'>
            <Fragment>
                <List component="nav">
                  <ListItem>
                    <span className={classes.icon}>
                      <IconButton color="primary" className={classes.button} href={link} target="_blank"><Ionicon icon="ios-appstore" /></IconButton>
                    </span>
                  </ListItem>
                  <ListItem>
                    <span className={classes.icon}>
                      <IconButton color="primary" className={classes.button} href={link} target="_blank"><Ionicon icon="md-appstore" /></IconButton>
                    </span>
                  </ListItem>
                </List>
                <List component="nav">
                  <ListItem>
                    <span className={classes.icon}>
                      <IconButton color="primary" className={classes.button} href={link.twitter} target="_blank"><Ionicon icon="logo-twitter" /></IconButton>
                    </span>
                  </ListItem>
                  <ListItem>
                    <span className={classes.icon}>
                      <IconButton color="primary" className={classes.button} href={link} target="_blank"><Ionicon icon="logo-instagram" /></IconButton>
                    </span>
                  </ListItem>
                </List>
            </Fragment>
            <Typography component="p" variant="p" align="center">
              &copy; 2018 Ameelio
            </Typography>
            <Typography component="p" variant="p" align="center">
              Ameelio, EIN ##-#######, is applying to become a 501(c)(3) non-profit organization based in Connecticut, United States. We're awaiting our tax-exempt status from the IRS, your donations are currently NOT tax-deductible.
            </Typography>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
