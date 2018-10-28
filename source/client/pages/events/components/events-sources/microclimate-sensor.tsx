import * as React from 'react';

const centigrade = (temperature: string | number) => `${temperature}\u00A0C`;

interface IProps {
  temperature: string | number;
  humidity: string | number;
}

const EventSourceMicroclimateSensor: React.SFC<IProps> = ({
  temperature,
  humidity
}) => (
  <div className="event-source-microclimate-sensor">
    <span className="temperature">
      Температура: <b>{centigrade(temperature)}</b>
    </span>
    <span className="humidity">
      Влажность: <b>{humidity}%</b>
    </span>
  </div>
);

export default EventSourceMicroclimateSensor;
