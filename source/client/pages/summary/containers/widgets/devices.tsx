import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IWindowsSize } from 'stores/windowSize';

import { Slider, SwitchButtons, FiltersList } from '../../components';
import { DEVICES_DATA, FILTERS } from '../../constants/data-constants';

const MAX_DEVICES_COUNT = 7;

const isDevicesEnough = devicesCount => devicesCount > MAX_DEVICES_COUNT;

interface IProps {
  windowSize?: IWindowsSize;
}

interface ISliderApi {
  slickPrev: () => void;
  slickNext: () => void;
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

    return (
      <div className="devices-widget">
        <div className="widget-header">
          <span className="widget-header-title">Избранные устройства</span>
          <FiltersList
            vertical={isWidthLowerThen800}
            data={FILTERS}
            defaultValue={FILTERS[0]}
          />
          {isDevicesEnough(DEVICES_DATA.length) && (
            <SwitchButtons
              onSwitchLeft={this.onSwitchSlidePrev}
              onSwitchRight={this.onSwitchSlideNext}
            />
          )}
        </div>
        <div className="widget-content">
          <Slider
            data={DEVICES_DATA}
            settings={{
              swipe: false,
              infinite: true,
              slidesToShow: isDevicesEnough(DEVICES_DATA.length)
                ? MAX_DEVICES_COUNT
                : DEVICES_DATA.length,
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
            sliderApi={actions => {
              this.sliderApi = actions;
            }}
          />
        </div>
      </div>
    );
  }
}

export default DevicesWidget;
