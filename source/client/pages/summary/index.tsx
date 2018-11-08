import * as React from 'react';
import { Modal } from 'components';
import { inject, observer } from 'mobx-react';

import MainWidget from './containers/widgets/main';
import ScenariosWidget from './containers/widgets/scenarios';
import DevicesWidget from './containers/widgets/devices';
import DeviceForm from './containers/device-form';
import { IDevices } from './stores/devices';
import { DeviceType } from './types';

interface IProps {
  devices: IDevices;
}

@inject('devices')
@observer
class SummaryPage extends React.Component<IProps> {
  async componentDidMount() {
    await this.props.devices.fetchDevices();
    await this.props.devices.fetchFilters();
  }

  render() {
    const { data, filters } = this.props.devices;

    return (
      <div className="summary-page">
        <MainWidget devices={data} />
        <ScenariosWidget devices={data} />
        <DevicesWidget devices={data} filters={filters} />
        <Modal type={DeviceType.lighting}>
          <DeviceForm
            type={DeviceType.lighting}
            title="Xiaomi Yeelight LED Smart Bulb"
            scheduleInfo="Включится в 17:00"
            filters={filters}
          />
        </Modal>
        <Modal type={DeviceType.temperature}>
          <DeviceForm
            type={DeviceType.temperature}
            title="Elgato Eve Degree Connected"
            scheduleInfo="Включено"
            filters={filters}
            devicePrevState="+23"
          />
        </Modal>
        <Modal type={DeviceType.temperatureCircular}>
          <DeviceForm
            type={DeviceType.temperatureCircular}
            title="Elgato Eve Degree Connected"
            scheduleInfo="Включено"
            filters={filters}
            devicePrevState="+23"
          />
        </Modal>
      </div>
    );
  }
}

export default SummaryPage;
