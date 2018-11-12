import React from 'react';
import { SvgIcon } from 'components';
import { cn } from '@bem-react/classname';

interface IProps {
  className: string;
  switchTo?: 'prev' | 'next';
}

const StationCompositionSwitchButton: React.SFC<IProps> = ({
  className,
  switchTo
}) => (
  <button className={cn(className)({ switchTo })}>
    <SvgIcon id="composition-switch" className={cn(`${className}SvgIcon`)()} />
  </button>
);

StationCompositionSwitchButton.defaultProps = {
  switchTo: 'next'
};

export default StationCompositionSwitchButton;
