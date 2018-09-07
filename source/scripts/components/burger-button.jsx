import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const BurgerButton = ({ active, onClick }) => (
  <button className={classNames("burger-button", { active })} onClick={onClick}>
    <div className="burger-button-bar" />
    <div className="burger-button-bar" />
    <div className="burger-button-bar" />
  </button>
);

BurgerButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

BurgerButton.defaultProps = {
  active: false
};

export default BurgerButton;
