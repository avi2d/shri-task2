import React, { Component } from 'react';

import { Slider, SwitchButtons } from '../../components';
import { FAVORITES_SCENARIOS } from '../../constants/data-constants';

const MAX_SCENARIOS_COUNT = 9;

const isScenariosEnough = scenariosCount => scenariosCount > MAX_SCENARIOS_COUNT;

const defineSlidesToShow = scenariosCount => {
  if (scenariosCount > 6) return 3;
  if (scenariosCount > 3) return 2;
  return 1;
};

class ScenariosWidget extends Component {
  constructor(props) {
    super(props);

    this.sliderApi = {};

    this.onSwitchSlidePrev = () => this.sliderApi.slickPrev();
    this.onSwitchSlideNext = () => this.sliderApi.slickNext();
  }

  render() {
    return (
      <div className="scenarios-widget">
        <div className="widget-header">
          <span className="widget-header-title">Избранные сценарии</span>
          {isScenariosEnough(FAVORITES_SCENARIOS.length) &&
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
              rows: 3,
              slidesToShow: defineSlidesToShow(FAVORITES_SCENARIOS.length),
              responsive: [
                {
                  breakpoint: 1070,
                  settings: {
                    rows: 3,
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    swipe: true,
                    swipeToSlide: true,
                    rows: 1,
                    slidesToShow: 4,
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

export default ScenariosWidget;
