import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SvgIcon } from 'components';
import { IWindowsSize } from 'stores/windowSize';

import { InputRange, FiltersList } from '../components';
import { IFilter } from '../stores/devices';
import { DeviceType } from '../types';
import utils from '../utils';

interface IProps {
  windowSize?: IWindowsSize;
  filters: IFilter[];
  type: DeviceType;
  title: string;
  scheduleInfo: string;
  devicePrevState?: string | number;
}

@inject('windowSize')
@observer
class DeviceForm extends React.Component<IProps> {
  render() {
    const { type, title, scheduleInfo, filters, devicePrevState } = this.props;
    const { isWidthLowerThen500 } = this.props.windowSize!;

    return (
      <div className="device-form">
        <div className="device-form-header">
          <div className="header-title">{title}</div>
          {!isWidthLowerThen500 && (
            <div className="header-prev-state">
              <span className="header-prev-state-value">{devicePrevState}</span>
              <SvgIcon id={utils.defineIcon(type)} />
            </div>
          )}
        </div>
        <div className="device-schedule-info">{scheduleInfo}</div>
        {type !== DeviceType.temperatureCircular &&
          filters.length > 0 && (
            <FiltersList swipable data={filters} defaultValue={filters[0]} />
          )}
        <div className="device-form-content">
          <InputRange vertical={isWidthLowerThen500} type={type} />
        </div>
      </div>
    );
  }
}

export default DeviceForm;
