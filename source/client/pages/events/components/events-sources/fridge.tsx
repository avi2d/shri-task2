import * as React from 'react';
import { Button } from 'components';
import { cn } from '@bem-react/classname';

const block = cn('Fridge');

interface IProps {
  buttons: [string, string];
}

const EventSourceFridge: React.SFC<IProps> = ({ buttons }) => (
  <div className={block()}>
    <Button shStyle="primary" className={block('Button')}>
      {buttons[0]}
    </Button>
    <Button className={block('Button')}>{buttons[1]}</Button>
  </div>
);

export default EventSourceFridge;
