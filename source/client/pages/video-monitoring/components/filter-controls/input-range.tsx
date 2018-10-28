import * as React from 'react';
import Slider from 'rc-slider';

interface IProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange: (value: number) => void;
}

const FilterControlsInputRange: React.SFC<IProps> = ({
  min,
  max,
  step,
  value,
  defaultValue,
  onChange
}) => (
  <Slider
    className="filter-controls-input-range"
    min={min}
    max={max}
    step={step}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
  />
);

FilterControlsInputRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  defaultValue: 50
};

export default FilterControlsInputRange;
