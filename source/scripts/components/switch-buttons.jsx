import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from './svg-icon';

const SwitchButtons = ({ disabledLeft, disabledRight, onSwitchLeft, onSwitchRight }) => (
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

SwitchButtons.propTypes = {
  disabledLeft: PropTypes.bool,
  disabledRight: PropTypes.bool,
  onSwitchLeft: PropTypes.func.isRequired,
  onSwitchRight: PropTypes.func.isRequired
};

SwitchButtons.defaultProps = {
  disabledLeft: false,
  disabledRight: false,
};

export default SwitchButtons;
