import * as React from 'react';
import { cn } from '@bem-react/classname';
import { Mixes } from 'types';
import { defineMixes } from 'utils/bemUtils';

const block = cn('Button');

interface IProps {
  shStyle?: 'default' | 'primary';
  mixes?: Mixes;
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.SFC<IProps> = ({ shStyle, mixes, children, onClick }) => (
  <button
    className={block({ shStyle }, defineMixes(mixes!, block()))}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  shStyle: 'default',
  mixes: ''
};

export default Button;
