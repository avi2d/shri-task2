import * as React from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { SvgIcon } from 'components';
import { IWindowsSize } from 'stores/windowSize';

import HeaderMenu from './header-menu';

const HEADER_MENU_ITEMS = [
  { title: 'События', to: '/events' },
  { title: 'Сводка', to: '/summary' },
  { title: 'Видеонаблюдение', to: '/video-monitoring' }
];

const FOOTER_MENU_ITEMS = [
  'Помощь',
  'Обратная связь',
  'Разработчикам',
  'Условия использования'
];

interface IProps {
  windowSize?: IWindowsSize;
  children: JSX.Element[] | JSX.Element;
}

@inject('windowSize')
@observer
class Layout extends React.Component<IProps> {
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

export default withRouter(Layout);
