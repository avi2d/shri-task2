import _ from 'lodash';
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import { InputCircularRange } from '../components';
import { DEVICES_TYPES } from '../constants/data-constants';
import utils from '../utils';

const defineMarks = (min, max) => (_.isNumber(min) && _.isNumber(max)
  ? { [min]: min, [max]: utils.formatNumberToOutput(max) }
  : null
);

class InputRange extends Component {
  render() {
    const { vertical, type, min, max, defaultValue } = this.props;
    const marks = type === DEVICES_TYPES.temperature ? defineMarks(min, max) : {};

    if (type === DEVICES_TYPES.temperatureCircular) {
      return <InputCircularRange min={min} max={max} defaultValue={defaultValue} />;
    }

    return (
      <Slider
        vertical={vertical}
        className={classNames('input-range', type)}
        marks={marks}
        min={min}
        max={max}
        defaultValue={defaultValue}
      />
    );
  }
}

InputRange.propTypes = {
  vertical: PropTypes.bool,
  type: PropTypes.oneOf(
    Object.values(DEVICES_TYPES)
  ),
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.number
};

InputRange.defaultProps = {
  vertical: false,
  min: -100,
  max: 100,
  defaultValue: 0
};

export default InputRange;
