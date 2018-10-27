import * as React from 'react';
import { Modal } from 'components';

import { FILTERS, DeviceType } from './constants/data-constants';

import MainWidget from './containers/widgets/main';
import ScenariosWidget from './containers/widgets/scenarios';
import DevicesWidget from './containers/widgets/devices';
import DeviceForm from './containers/device-form';

const SummaryPage = () => (
  <div className="summary-page">
    <MainWidget />
    <ScenariosWidget />
    <DevicesWidget />
    <Modal type={DeviceType.lighting}>
      <DeviceForm
        type={DeviceType.lighting}
        title="Xiaomi Yeelight LED Smart Bulb"
        scheduleInfo="Включится в 17:00"
        filters={FILTERS}
      />
    </Modal>
    <Modal type={DeviceType.temperature}>
      <DeviceForm
        type={DeviceType.temperature}
        title="Elgato Eve Degree Connected"
        scheduleInfo="Включено"
        filters={FILTERS}
        devicePrevState="+23"
      />
    </Modal>
    <Modal type={DeviceType.temperatureCircular}>
      <DeviceForm
        type={DeviceType.temperatureCircular}
        title="Elgato Eve Degree Connected"
        scheduleInfo="Включено"
        filters={FILTERS}
        devicePrevState="+23"
      />
    </Modal>
  </div>
);

export default SummaryPage;
