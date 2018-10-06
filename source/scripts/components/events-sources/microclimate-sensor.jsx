import React from 'react';
import PropTypes from 'prop-types';

const centigrade = temperature => `${temperature}\u00A0C`;

const EventSourceMicroclimateSensor = ({ temperature, humidity }) => (
  <div className="event-source-microclimate-sensor">
    <span className="temperature">
      Температура: <b>{centigrade(temperature)}</b>
    </span>
    <span className="humidity">
      Влажность: <b>{humidity}%</b>
    </span>
  </div>
);

EventSourceMicroclimateSensor.propTypes = {
  temperature: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  humidity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default EventSourceMicroclimateSensor;
