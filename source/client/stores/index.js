import modalsStore from './modals';
import windowSizeStore from './windowSize';

import eventsStores from '../pages/events/stores';
import videoMonitoringStores from '../pages/video-monitoring/stores';

export default {
  modals: modalsStore,
  windowSize: windowSizeStore,

  ...eventsStores,
  ...videoMonitoringStores
};
