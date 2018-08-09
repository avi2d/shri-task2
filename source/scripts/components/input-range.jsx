import React from 'react';
import PropTypes from 'prop-types';

const INPUT_RANGE_TYPES = {
  lighting: 'lighting',
  temperature: 'temperature'
};

const InputRange = ({ type }) => (
  <input
    className={type}
    type="range"
  />
);

InputRange.propTypes = {
  type: PropTypes.oneOf(
    Object.values(INPUT_RANGE_TYPES)
  )
};

export default InputRange;
