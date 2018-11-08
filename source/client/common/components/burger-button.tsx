import * as React from 'react';
import { cn } from '@bem-react/classname';

const block = cn('BurgerButton');

interface IProps {
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BurgerButton: React.SFC<IProps> = ({ active, onClick }) => (
  <button className={block({ active })} onClick={onClick}>
    <div className={block('Bar')} />
    <div className={block('Bar')} />
    <div className={block('Bar')} />
  </button>
);

BurgerButton.defaultProps = {
  active: false
};

export default BurgerButton;
