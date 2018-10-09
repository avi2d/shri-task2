import React from 'react';
import { Modal } from 'components';

import { FILTERS, DEVICES_TYPES } from './constants/data-constants';

import MainWidget from './containers/widgets/main';
import ScenariosWidget from './containers/widgets/scenarios';
import DevicesWidget from './containers/widgets/devices';
import DeviceForm from './containers/device-form';

const SummaryPage = () => (
  <div className="summary-page">
    <MainWidget />
    <ScenariosWidget />
    <DevicesWidget />
    <Modal type={DEVICES_TYPES.lighting}>
      <DeviceForm
        type={DEVICES_TYPES.lighting}
        title="Xiaomi Yeelight LED Smart Bulb"
        scheduleInfo="Включится в 17:00"
        filters={FILTERS}
      />
    </Modal>
    <Modal type={DEVICES_TYPES.temperature}>
      <DeviceForm
        type={DEVICES_TYPES.temperature}
        title="Elgato Eve Degree Connected"
        scheduleInfo="Включено"
        filters={FILTERS}
        devicePrevState="+23"
      />
    </Modal>
    <Modal type={DEVICES_TYPES.temperatureCircular}>
      <DeviceForm
        type={DEVICES_TYPES.temperatureCircular}
        title="Elgato Eve Degree Connected"
        scheduleInfo="Включено"
        filters={FILTERS}
        devicePrevState="+23"
      />
    </Modal>
  </div>
);

export default SummaryPage;
