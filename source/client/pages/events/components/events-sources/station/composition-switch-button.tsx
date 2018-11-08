import React from 'react';
import { SvgIcon } from 'components';

interface IProps {
  switchTo?: 'prev' | 'next';
}

const StationCompositionSwitchButton: React.SFC<IProps> = ({ switchTo }) => (
  <button className={`station-composition-switch-button switch-to-${switchTo}`}>
    <SvgIcon id="composition-switch" />
  </button>
);

StationCompositionSwitchButton.defaultProps = {
  switchTo: 'next'
};

export default StationCompositionSwitchButton;
