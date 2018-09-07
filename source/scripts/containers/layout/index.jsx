import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react/index";

import { SvgIcon } from "../../components";
import HeaderMenu from "./header-menu";

const HEADER_MENU_ITEMS = ["Сводка", "Устройства", "Сценарии"];
const FOOTER_MENU_ITEMS = [
  "Помощь",
  "Обратная связь",
  "Разработчикам",
  "Условия использования"
];

@inject("windowSize")
@observer
class Layout extends Component {
  render() {
    const {
      children,
      windowSize: { isWidthLowerThen800 }
    } = this.props;

    return (
      <div className="layout">
        <div className="layout-header">
          <SvgIcon className="layout-header-logo" id="logo" />
          <HeaderMenu vertical={isWidthLowerThen800} data={HEADER_MENU_ITEMS} />
        </div>
        <div className="layout-content">{children}</div>
        <div className="layout-footer">
          <ul className="layout-footer-menu">
            {FOOTER_MENU_ITEMS.map(item => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
          <div className="layout-footer-copyright">
            © 2001–2017 ООО «Яндекс»
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  windowSize: PropTypes.object,
  children: PropTypes.node
};

export default Layout;
