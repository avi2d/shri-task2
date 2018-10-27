import * as React from 'react';
import classNames from 'classnames';
import Slider from 'rc-slider';

import InputCircularRange from './input-circular-range';
import { DeviceType } from '../constants/data-constants';
import utils from '../utils/index';

const defineMarks = (min, max) => ({
  [min]: min,
  [max]: utils.formatNumberToOutput(max)
});

interface IProps {
  vertical?: boolean;
  type: DeviceType;
  min?: number;
  max?: number;
  defaultValue?: number;
}

class InputRange extends React.Component<IProps> {
  static defaultProps = {
    vertical: false,
    min: -100,
    max: 100,
    defaultValue: 0
  };

  render() {
    const { vertical, type, min, max, defaultValue } = this.props;
    const marks = type === DeviceType.temperature ? defineMarks(min, max) : {};

    if (type === DeviceType.temperatureCircular) {
      return (
        <InputCircularRange min={min} max={max} defaultValue={defaultValue} />
      );
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

export default InputRange;
