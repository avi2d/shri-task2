import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const STYLES = {
  default: "default",
  primary: "primary"
};

const Button = ({ shStyle, className, children, ...props }) => (
  <button {...props} className={classNames("btn", className, shStyle)}>
    {children}
  </button>
);

Button.propTypes = {
  shStyle: PropTypes.oneOf(Object.values(STYLES)),
  className: PropTypes.string,
  children: PropTypes.node
};

Button.defaultProps = {
  shStyle: STYLES.default
};

export default Button;
