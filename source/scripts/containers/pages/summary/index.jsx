import React from 'react';
import MainWidget from './widgets/main';
import ScenariosWidget from './widgets/scenarios';
import DevicesWidget from './widgets/devices';

import { Modal } from '../../../components';
import DeviceForm from './device-form';
import { FILTERS, DEVICES_TYPES } from '../../../constants/data-constants';

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
