import classNames from 'classnames';
import * as React from 'react';

interface IProps {
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BurgerButton: React.SFC<IProps> = ({ active, onClick }) => (
  <button className={classNames('burger-button', { active })} onClick={onClick}>
    <div className="burger-button-bar" />
    <div className="burger-button-bar" />
    <div className="burger-button-bar" />
  </button>
);

BurgerButton.defaultProps = {
  active: false
};

export default BurgerButton;
