import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

const EventSourceFridge = ({ buttons }) => (
  <div className="event-source-fridge">
    <Button shStyle="primary">{buttons[0]}</Button>
    <Button>{buttons[1]}</Button>
  </div>
);

EventSourceFridge.propTypes = {
  buttons: PropTypes.array.isRequired,
};

export default EventSourceFridge;
