import * as React from 'react';
import { cn } from '@bem-react/classname';
import { withRouter, RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { SvgIcon } from 'components';
import { IWindowsSize } from 'stores/windowSize';
import {
  FOOTER_MENU_ITEMS,
  HEADER_MENU_ITEMS
} from 'constants/layout-constants';

import HeaderMenu from './header-menu';

const block = cn('Layout');

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
      <div className={block()}>
        <div className={block('Header')}>
          <div className={block('HeaderContent')}>
            <SvgIcon id="logo" className={block('HeaderContentSvgIcon')} />
            <HeaderMenu
              block={block}
              vertical={isWidthLowerThen800}
              data={HEADER_MENU_ITEMS}
            />
          </div>
        </div>
        <div className={block('Content')}>{this.props.children}</div>
        <div className={block('Footer')}>
          <ul className={block('FooterMenu')}>
            {FOOTER_MENU_ITEMS.map(({ title, to }) => (
              <li key={title}>
                <a href={to}>{title}</a>
              </li>
            ))}
          </ul>
          <div className={block('FooterCopyright')}>
            © 2001–2017 ООО «Яндекс»
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
