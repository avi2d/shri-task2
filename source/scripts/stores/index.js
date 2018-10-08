import modalsStore from './modals';
import windowSizeStore from './windowSize';

import eventsStores from '../pages/events/stores';

export default {
  modals: modalsStore,
  windowSize: windowSizeStore,

  ...eventsStores
};
