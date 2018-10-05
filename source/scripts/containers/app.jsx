import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './layout';
import EventsPage from './pages/events';
import SummaryPage from './pages/summary';

class App extends Component {
  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
