import * as React from 'react';
import { Button } from 'components';

interface IProps {
  buttons: [string, string];
}

const EventSourceFridge: React.SFC<IProps> = ({ buttons }) => (
  <div className="event-source-fridge">
    <Button shStyle="primary">{buttons[0]}</Button>
    <Button>{buttons[1]}</Button>
  </div>
);

export default EventSourceFridge;
