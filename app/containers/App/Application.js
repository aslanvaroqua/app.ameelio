import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import requireAuth from './requireAuth';
import Dashboard from '../Templates/Dashboard';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound,
  Letters,
  LettersCompose,
  LettersReview,
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={BlankPage} />
          <Route path="/app/dashboard" component={DashboardPage} />
          <Route exact path="/app/letters" render={(props) => <Letters {...props} history={history} />} />
          <Route path="/app/letters/compose" render={(props) => <LettersCompose {...props} history={history} />} />
          <Route path="/app/letters/review" render={(props) => <LettersReview {...props} history={history} />} />
          <Route path="/app/form" component={Form} />
          <Route path="/app/table" component={Table} />
          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default requireAuth(Application);
