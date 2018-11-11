import * as React from 'react';
import { cn } from '@bem-react/classname';

const block = cn('Button');

interface IProps {
  shStyle?: 'default' | 'primary';
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  onClick?: React.MouseEventHandler;
}

const Button: React.SFC<IProps> = ({
  shStyle,
  className,
  children,
  onClick
}) => (
  <button className={block({ shStyle }, [className])} onClick={onClick}>
    {children}
  </button>
);

Button.defaultProps = {
  shStyle: 'default'
};

export default Button;
