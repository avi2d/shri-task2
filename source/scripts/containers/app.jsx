import React, { Component } from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';

import Layout from './layout';
import EventsPage from './pages/events';
import SummaryPage from './pages/summary';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/events" />}
            />
            <Route path="/events" component={EventsPage} />
            <Route path="/summary" component={SummaryPage} />
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
