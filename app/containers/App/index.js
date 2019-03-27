import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import injectSaga from 'utils/injectSaga';
import { compose } from 'recompose';

import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
// import LandingPage from './LandingPage';
import saga from '../../sagas';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends React.Component {
  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {changeMode => (
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/login" />} />
              <Route path="/login" exact component={LoginDedicated} />
              <Route
                path="/app"
                render={props => (
                  <Application {...props} changeMode={changeMode} />
                )}
              />
              <Route component={Auth} />
              <Route component={NotFound} />
            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

const withSaga = injectSaga({ key: 'App', saga });
export default compose(withSaga)(App);
