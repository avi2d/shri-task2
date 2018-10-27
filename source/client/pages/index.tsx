import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import commonStores from 'stores';
import '@babel/polyfill';
import 'pepjs';

import App from './app';
import eventsStores from './events/stores';
import videoMonitoringStores from './video-monitoring/stores';

const stores = {
  ...commonStores,
  // ...eventsStores,
  // ...videoMonitoringStores
};

import '../styles/index.less';

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
