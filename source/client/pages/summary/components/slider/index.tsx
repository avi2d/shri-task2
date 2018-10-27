import classNames from 'classnames';
import * as React from 'react';
import Slider from 'react-slick';

import SliderItem from './item';

const DEFAULT_SETTINGS = {
  arrows: false,
  infinite: false,
  speed: 400,
  touchThreshold: 15
};

interface IProps {
  data: any[];
  settings: object;
  sliderApi?: (slider: Slider) => void;
}

class SimpleSlider extends React.Component<IProps> {
  static defaultProps = {
    sliderApi: () => {}
  };

  sliderRef = React.createRef<Slider>();

  get slider() {
    return this.sliderRef.current;
  }

  componentDidMount = () => {
    this.props.sliderApi!(this.slider);
  };

  renderSliderItems(data) {
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
