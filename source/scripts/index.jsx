import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import App from './pages/app';
import stores from 'stores';

import '../styles/index.less';

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
