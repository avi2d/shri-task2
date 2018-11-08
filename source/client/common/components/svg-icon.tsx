import * as React from 'react';
import { cn } from '@bem-react/classname';

// @ts-ignore
import sprite from 'assets/svg/sprite.svg';

const block = cn('SvgIcon');

interface IProps {
  id: string;
  className?: string;
}

const SvgIcon: React.SFC<IProps> = ({ className, id, ...props }) => (
  <svg {...props} className={block({ id })}>
    <use xlinkHref={`${sprite}#${id}`} />
  </svg>
);

export default SvgIcon;
