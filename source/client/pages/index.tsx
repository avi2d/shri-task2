import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { withRegistry } from '@bem-react/di';
import commonStores from 'stores';
import '@babel/polyfill';
import 'pepjs';

import App from './app';
import '../styles/index.less';

import eventsStores from './events/stores';
import summaryStores from './summary/stores';
import videoMonitoringStores from './video-monitoring/stores';

import platforms from './events/registry';

const stores = {
  ...commonStores,
  ...eventsStores,
  ...summaryStores,
  ...videoMonitoringStores
};

const Platformed = withRegistry(platforms.desktop)(App);

render(
  <Provider {...stores}>
    <Platformed />
  </Provider>,
  document.getElementById('root')
);
