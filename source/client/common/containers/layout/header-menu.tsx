import * as React from 'react';
import { ClassNameFormatter } from '@bem-react/classname';
import { NavLink } from 'react-router-dom';
import { BurgerButton } from 'components';
import { IMenuItem } from 'constants/layout-constants';

interface IProps {
  vertical?: boolean;
  block: ClassNameFormatter;
  data: IMenuItem[];
}

class LayoutHeaderMenu extends React.Component<IProps> {
  static defaultProps = {
    vertical: false
  };

  state = {
    isOpen: false
  };

  onMenuToggle = () => this.setState({ isOpen: !this.state.isOpen });

  renderMenuItems(data: IMenuItem[]) {
    return data.map(({ title, to }) => (
      <li key={to}>
        <NavLink to={to}>{title}</NavLink>
      </li>
    ));
  }

  render() {
    const { isOpen } = this.state;
    const { vertical, block, data } = this.props;

    return (
      <React.Fragment>
        {vertical && (
          <BurgerButton
            active={isOpen}
            className={block('HeaderContentBurgerButton')}
            onClick={this.onMenuToggle}
          />
        )}

        <ul
          className={block('HeaderContentMenu', {
            vertical,
            opened: isOpen
          })}
        >
          {this.renderMenuItems(data)}
        </ul>
      </React.Fragment>
    );
  }
}

export default LayoutHeaderMenu;
