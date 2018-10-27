import classNames from 'classnames';
import * as React from 'react';
import { SvgIcon } from 'components';

interface IProps {
  disabledLeft?: boolean;
  disabledRight?: boolean;
  onSwitchLeft: () => void;
  onSwitchRight: () => void;
}

const SwitchButtons: React.SFC<IProps> = ({
  disabledLeft,
  disabledRight,
  onSwitchLeft,
  onSwitchRight
}) => (
  <div className="switch-buttons">
    <button
      className={classNames('switch-left', { disabled: disabledLeft })}
      onClick={disabledLeft ? () => {} : onSwitchLeft}
    >
      <SvgIcon id="arrow-left" />
    </button>
    <button
      className={classNames('switch-right', { disabled: disabledRight })}
      onClick={disabledRight ? () => {} : onSwitchRight}
    >
      <SvgIcon id="arrow-left" />
    </button>
  </div>
);

SwitchButtons.defaultProps = {
  disabledLeft: false,
  disabledRight: false
};

export default SwitchButtons;
