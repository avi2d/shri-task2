import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const FilterControlsInputRange = ({
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

FilterControlsInputRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

FilterControlsInputRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  defaultValue: 50
};

export default FilterControlsInputRange;
