import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components';

const DIRECTIONS = {
  prev: 'prev',
  next: 'next'
};

const StationCompositionSwitchButton = ({ switchTo }) => (
  <button className={`station-composition-switch-button switch-to-${switchTo}`}>
    <SvgIcon id="composition-switch" />
  </button>
);

StationCompositionSwitchButton.propTypes = {
  switchTo: PropTypes.oneOf(Object.values(DIRECTIONS))
};

StationCompositionSwitchButton.defaultProps = {
  switchTo: DIRECTIONS.next
};

export default StationCompositionSwitchButton;
