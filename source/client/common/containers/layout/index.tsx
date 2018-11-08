import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { SvgIcon } from 'components';
import { IWindowsSize } from 'stores/windowSize';
import {
  FOOTER_MENU_ITEMS,
  HEADER_MENU_ITEMS
} from 'constants/layout-constants';

import HeaderMenu from './header-menu';

interface IProps {
  windowSize?: IWindowsSize;
  children: JSX.Element[] | JSX.Element;
}

@inject('windowSize')
@observer
class Layout extends React.Component<IProps & RouteComponentProps> {
  render() {
    const { isWidthLowerThen800 } = this.props.windowSize!;

    return (
      <div className="layout">
        <div className="layout-header">
          <div className="layout-header-content">
            <SvgIcon className="header-content-logo" id="logo" />
            <HeaderMenu
              vertical={isWidthLowerThen800}
              data={HEADER_MENU_ITEMS}
            />
          </div>
        </div>
        <div className="layout-content">{this.props.children}</div>
        <div className="layout-footer">
          <ul className="layout-footer-menu">
            {FOOTER_MENU_ITEMS.map(({ title, to }) => (
              <li key={title}>
                <a href={to}>{title}</a>
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

export default withRouter(Layout);
