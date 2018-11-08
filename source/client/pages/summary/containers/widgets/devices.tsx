import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IWindowsSize } from 'stores/windowSize';

import { Slider, SwitchButtons, FiltersList } from '../../components';
import { IDevice, IFilter } from '../../stores/devices';
import { ISliderApi } from '../../types';

const MAX_DEVICES_COUNT = 7;

const isDevicesEnough = (devicesCount: number) =>
  devicesCount > MAX_DEVICES_COUNT;

const defineSlidesToShow = (devicesCount: number) =>
  isDevicesEnough(devicesCount) ? MAX_DEVICES_COUNT : devicesCount;

interface IProps {
  devices: IDevice[];
  filters: IFilter[];
  windowSize?: IWindowsSize;
}

@inject('windowSize')
@observer
class DevicesWidget extends React.Component<IProps> {
  sliderApi: ISliderApi = {
    slickPrev: () => {},
    slickNext: () => {}
  };

  onSwitchSlidePrev = () => this.sliderApi.slickPrev();
  onSwitchSlideNext = () => this.sliderApi.slickNext();

  render() {
    const { isWidthLowerThen800 } = this.props.windowSize!;
    const { devices, filters } = this.props;

    return (
      <div className="devices-widget">
        <div className="widget-header">
          <span className="widget-header-title">Избранные устройства</span>
          {filters.length > 0 && (
            <FiltersList
              vertical={isWidthLowerThen800}
              data={filters}
              defaultValue={filters[0]}
            />
          )}
          {isDevicesEnough(devices.length) && (
            <SwitchButtons
              onSwitchLeft={this.onSwitchSlidePrev}
              onSwitchRight={this.onSwitchSlideNext}
            />
          )}
        </div>
        <div className="widget-content">
          <Slider
            data={devices}
            settings={{
              swipe: false,
              infinite: true,
              slidesToShow: defineSlidesToShow(devices.length),
              responsive: [
                {
                  breakpoint: 800,
                  settings: {
                    swipe: true,
                    swipeToSlide: true,
                    slidesToShow: 4
                  }
                }
              ]
            }}
            throwSliderApi={api => {
              this.sliderApi = api;
            }}
          />
        </div>
      </div>
    );
  }
}

export default DevicesWidget;
