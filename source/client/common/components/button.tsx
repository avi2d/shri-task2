import classNames from 'classnames';
import * as React from 'react';

type Style = 'default' | 'primary';

interface IProps {
  shStyle?: Style;
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.SFC<IProps> = ({
  shStyle,
  className,
  children,
  ...props
}) => (
  <button {...props} className={classNames('btn', className, shStyle)}>
    {children}
  </button>
);

Button.defaultProps = {
  shStyle: 'default'
};

export default Button;
