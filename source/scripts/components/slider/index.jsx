import classNames from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

import SliderItem from "./item";

const DEFAULT_SETTINGS = {
  arrows: false,
  infinite: false,
  speed: 400,
  touchThreshold: 15
};

class SimpleSlider extends Component {
  constructor(props) {
    super(props);

    this.slider = {};

    this.componentDidMount = () => {
      this.props.sliderApi(this.slider);
    };

    this.setSliderNode = node => {
      this.slider = node;
    };
  }

  renderSliderItems(data) {
    return data.map((item, index) => (
      <SliderItem
        key={index}
        className={classNames({ "first-item": index === 0 })}
        {...item}
      />
    ));
  }

  render() {
    const { data, settings } = this.props;
    const resultSettings = { ...DEFAULT_SETTINGS, ...settings };

    return (
      <div className="slider-wrapper">
        <Slider {...resultSettings} ref={this.setSliderNode}>
          {this.renderSliderItems(data)}
        </Slider>
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.object,
  sliderApi: PropTypes.func
};

SimpleSlider.defaultProps = {
  sliderApi: () => {}
};

export default SimpleSlider;
