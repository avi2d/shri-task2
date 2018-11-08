import classNames from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { BurgerButton } from 'components';
import { IMenuItem } from 'constants/layout-constants';

interface IProps {
  vertical?: boolean;
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
    const { vertical, data } = this.props;

    return (
      <React.Fragment>
        {vertical && (
          <BurgerButton active={isOpen} onClick={this.onMenuToggle} />
        )}

        <ul
          className={classNames('layout-header-menu', {
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
