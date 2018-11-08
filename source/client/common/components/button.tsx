import * as React from 'react';
import { cn } from '@bem-react/classname';

const block = cn('Button');

type Style = 'default' | 'primary';

interface IProps {
  shStyle?: Style;
  children: JSX.Element[] | JSX.Element | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.SFC<IProps> = ({ shStyle, children, onClick }) => (
  <button className={block({ shStyle })} onClick={onClick}>
    {children}
  </button>
);

Button.defaultProps = {
  shStyle: 'default'
};

export default Button;
