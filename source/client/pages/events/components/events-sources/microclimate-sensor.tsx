import * as React from 'react';
import { cn } from '@bem-react/classname';

const centigrade = (temperature: string | number) => `${temperature}\u00A0C`;

const block = cn('MicroclimateSensor');

interface IProps {
  temperature: string | number;
  humidity: string | number;
}

const EventSourceMicroclimateSensor: React.SFC<IProps> = ({
  temperature,
  humidity
}) => (
  <div className={block()}>
    <span className={block('Temperature')}>
      Температура: <b>{centigrade(temperature)}</b>
    </span>
    <span className={block('Humidity')}>
      Влажность: <b>{humidity}%</b>
    </span>
  </div>
);

export default EventSourceMicroclimateSensor;
