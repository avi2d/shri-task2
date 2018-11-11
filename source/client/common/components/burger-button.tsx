import * as React from 'react';
import { cn } from '@bem-react/classname';

const block = cn('BurgerButton');

interface IProps {
  active?: boolean;
  className?: string;
  onClick: React.MouseEventHandler;
}

const BurgerButton: React.SFC<IProps> = ({ active, className, onClick }) => (
  <button className={block({ active }, [className])} onClick={onClick}>
    <div className={block('Bar')} />
    <div className={block('Bar')} />
    <div className={block('Bar')} />
  </button>
);

BurgerButton.defaultProps = {
  active: false
};

export default BurgerButton;
