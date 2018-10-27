import * as React from 'react';
import classNames from 'classnames';

// @ts-ignore
import sprite from 'assets/svg/sprite.svg';

interface IProps {
  id: string;
  className?: string;
}

const SvgIcon: React.SFC<IProps> = ({ className, id, ...other }) => {
  const classes = classNames('svg-icon', id, className);

  return (
    <svg {...other} className={classes}>
      <use xlinkHref={`${sprite}#${id}`} />
    </svg>
  );
};

export default SvgIcon;
