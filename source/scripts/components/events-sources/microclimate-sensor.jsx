import React from 'react';
import PropTypes from 'prop-types';

const nbsp = '\u00A0';

const EventSourceMicroclimateSensor = ({ temperature, humidity }) => (
  <div className="event-source-microclimate-sensor">
    <span className="temperature">Температура: <b>{temperature}{nbsp}C</b></span>
    <span className="humidity">Влажность: <b>{humidity}%</b></span>
  </div>
);

EventSourceMicroclimateSensor.propTypes = {
  temperature: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  humidity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default EventSourceMicroclimateSensor;
