import React, { Component } from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import Layout from 'containers/layout';

import EventsPage from './events';
import SummaryPage from './summary';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/events" />} />
            <Route path="/events" component={EventsPage} />
            <Route path="/summary" component={SummaryPage} />
          </Switch>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
