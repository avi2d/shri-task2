import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IWindowsSize } from 'stores/windowSize';

import { Slider, SwitchButtons } from '../../components';
import { IDevice } from '../../stores/devices';
import { ISliderApi } from '../../types';

const MAX_SCENARIOS_COUNT = 9;
const MAX_SCENARIOS_COUNT_MEDIA = 6;
const COLUMN_SCENARIOS_COUNT = 3;

const isScenariosEnough = (scenariosCount: number) =>
  scenariosCount > MAX_SCENARIOS_COUNT;

const defineSlidesToShow = (scenariosCount: number) => {
  if (scenariosCount > 6) return 3;
  if (scenariosCount > 3) return 2;
  return 1;
};

const isSwitchRightDisabled = (
  devices: IDevice[],
  currentSlide: number,
  isMedia: boolean
) =>
  isMedia
    ? MAX_SCENARIOS_COUNT_MEDIA + currentSlide * COLUMN_SCENARIOS_COUNT >=
      devices.length
    : MAX_SCENARIOS_COUNT + currentSlide * COLUMN_SCENARIOS_COUNT >=
      devices.length;

interface IProps {
  devices: IDevice[];
  windowSize?: IWindowsSize;
}

@inject('windowSize')
@observer
class ScenariosWidget extends React.Component<IProps> {
  state = {
    currentSlide: 0
  };

  sliderApi: ISliderApi = {
    slickPrev: () => {},
    slickNext: () => {}
  };

  onSwitchSlidePrev = () => {
    this.setState({ currentSlide: this.state.currentSlide - 1 });
    this.sliderApi.slickPrev();
  };

  onSwitchSlideNext = () => {
    this.setState({ currentSlide: this.state.currentSlide + 1 });
    this.sliderApi.slickNext();
  };

  render() {
    const { currentSlide } = this.state;
    const { isWidthLowerThen1070 } = this.props.windowSize!;
    const { devices } = this.props;

    const switchLeftDisabled = currentSlide === 0;
    const switchRightDisabled = isSwitchRightDisabled(
      devices,
      currentSlide,
      isWidthLowerThen1070
    );

    return (
      <div className="scenarios-widget">
        <div className="widget-header">
          <span className="widget-header-title">Избранные сценарии</span>
          {isScenariosEnough(devices.length) && (
            <SwitchButtons
              disabledLeft={switchLeftDisabled}
              disabledRight={switchRightDisabled}
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
              rows: 3,
              slidesToShow: defineSlidesToShow(devices.length),
              responsive: [
                {
                  breakpoint: 1070,
                  settings: {
                    rows: 3,
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    swipe: true,
                    swipeToSlide: true,
                    infinite: true,
                    rows: 1,
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

export default ScenariosWidget;
