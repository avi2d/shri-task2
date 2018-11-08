import classNames from 'classnames';
import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import { observer } from 'mobx-react';

import SliderItem from './item';
import { IDevice } from '../../stores/devices';
import { ISliderApi } from '../../types';

const DEFAULT_SETTINGS: Settings = {
  arrows: false,
  infinite: false,
  speed: 400,
  touchThreshold: 15
};

interface IProps {
  data: IDevice[];
  settings: Settings;
  throwSliderApi?: (sliderApi: ISliderApi) => void;
}

@observer
class SimpleSlider extends React.Component<IProps> {
  sliderRef = React.createRef<Slider>();

  get slider() {
    return this.sliderRef.current!;
  }

  componentDidMount = () => {
    if (!this.props.throwSliderApi) return;

    const sliderApi: ISliderApi = {
      slickPrev: this.slider.slickPrev,
      slickNext: this.slider.slickNext
    };

    this.props.throwSliderApi(sliderApi);
  };

  renderSliderItems(data: IDevice[]) {
    return data.map((item, index) => (
      <SliderItem
        key={index}
        className={classNames({ 'first-item': index === 0 })}
        {...item}
      />
    ));
  }

  render() {
    const { data, settings } = this.props;
    const resultSettings = { ...DEFAULT_SETTINGS, ...settings };

    return (
      <div className="slider-wrapper">
        <Slider {...resultSettings} ref={this.sliderRef}>
          {this.renderSliderItems(data)}
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;
