import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IWindowsSize } from 'stores/windowSize';

import { Slider, SwitchButtons } from '../../components';
import { DEVICES_DATA } from '../../constants/data-constants';

const MAX_SCENARIOS_COUNT = 9;
const MAX_SCENARIOS_COUNT_MEDIA = 6;
const COLUMN_SCENARIOS_COUNT = 3;

const isScenariosEnough = scenariosCount =>
  scenariosCount > MAX_SCENARIOS_COUNT;

const defineSlidesToShow = scenariosCount => {
  if (scenariosCount > 6) return 3;
  if (scenariosCount > 3) return 2;
  return 1;
};

const isSwitchRightDisabled = (currentSlide, isMedia) =>
  isMedia
    ? MAX_SCENARIOS_COUNT_MEDIA + currentSlide * COLUMN_SCENARIOS_COUNT >=
      DEVICES_DATA.length
    : MAX_SCENARIOS_COUNT + currentSlide * COLUMN_SCENARIOS_COUNT >=
      DEVICES_DATA.length;

interface IProps {
  windowSize?: IWindowsSize;
}

interface ISliderApi {
  slickPrev: () => void;
  slickNext: () => void;
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

    const switchLeftDisabled = currentSlide === 0;
    const switchRightDisabled = isSwitchRightDisabled(
      currentSlide,
      isWidthLowerThen1070
    );

    return (
      <div className="scenarios-widget">
        <div className="widget-header">
          <span className="widget-header-title">Избранные сценарии</span>
          {isScenariosEnough(DEVICES_DATA.length) && (
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
            data={DEVICES_DATA}
            settings={{
              swipe: false,
              rows: 3,
              slidesToShow: defineSlidesToShow(DEVICES_DATA.length),
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
            sliderApi={actions => {
              this.sliderApi = actions;
            }}
          />
        </div>
      </div>
    );
  }
}

export default ScenariosWidget;
