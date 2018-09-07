import classNames from "classnames";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { BurgerButton } from "../../components";

class LayoutHeaderMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.onMenuToggle = () => this.setState({ isOpen: !this.state.isOpen });
  }

  renderMenuItems(data) {
    return data.map((item, index) => (
      <li key={item} className={classNames({ selected: index === 0 })}>
        <a href="#">{item}</a>
      </li>
    ));
  }

  render() {
    const { isOpen } = this.state;
    const { vertical, data } = this.props;

    return (
      <Fragment>
        {vertical && (
          <BurgerButton active={isOpen} onClick={this.onMenuToggle} />
        )}

        <ul
          className={classNames("layout-header-menu", {
            vertical,
            opened: isOpen
          })}
        >
          {this.renderMenuItems(data)}
        </ul>
      </Fragment>
    );
  }
}

LayoutHeaderMenu.propTypes = {
  vertical: PropTypes.bool,
  data: PropTypes.array
};

LayoutHeaderMenu.defaultProps = {
  vertical: false
};

export default LayoutHeaderMenu;
