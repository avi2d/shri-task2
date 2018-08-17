import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';

import { Slider, SwitchButtons, FiltersList } from '../../components';
import { FAVORITES_SCENARIOS, FILTERS } from '../../constants/data-constants';

const MAX_DEVICES_COUNT = 6;

const isDevicesEnough = devicesCount => devicesCount > MAX_DEVICES_COUNT;

@inject('windowSize')
@observer
class DevicesWidget extends Component {
  constructor(props) {
    super(props);

    this.sliderApi = {};

    this.onSwitchSlidePrev = () => this.sliderApi.slickPrev();
    this.onSwitchSlideNext = () => this.sliderApi.slickNext();
  }

  render() {
    const { isWidthLowerThen800 } = this.props.windowSize;

    return (
      <div className="devices-widget">
        <div className="widget-header">
          <span className="widget-header-title">Избранные устройства</span>
          <FiltersList
            vertical={isWidthLowerThen800}
            data={FILTERS}
            defaultValue={FILTERS[0]}
          />
          {isDevicesEnough(FAVORITES_SCENARIOS.length) &&
            <SwitchButtons
              onSwitchLeft={this.onSwitchSlidePrev}
              onSwitchRight={this.onSwitchSlideNext}
            />
          }
        </div>
        <div className="widget-content">
          <Slider
            data={FAVORITES_SCENARIOS}
            settings={{
              swipe: false,
              infinite: true,
              slidesToShow: isDevicesEnough(FAVORITES_SCENARIOS.length) ? MAX_DEVICES_COUNT : FAVORITES_SCENARIOS.length,
              responsive: [
                {
                  breakpoint: 800,
                  settings: {
                    swipe: true,
                    swipeToSlide: true,
                    slidesToShow: 4
                  }
                },
              ]
            }}
            sliderApi={actions => { this.sliderApi = actions; }}
          />
        </div>
      </div>
    );
  }
}

DevicesWidget.propTypes = {
  windowSize: PropTypes.object
};

export default DevicesWidget;
