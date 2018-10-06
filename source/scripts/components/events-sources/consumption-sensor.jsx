import React from 'react';
import PropTypes from 'prop-types';

const EventSourceConsumptionSensor = ({ image }) => (
  <div className="event-source-consumption-sensor">
    <img srcSet={image} alt="Потребление ресурсов" />
  </div>
);

EventSourceConsumptionSensor.propTypes = {
  image: PropTypes.string.isRequired
};

export default EventSourceConsumptionSensor;
