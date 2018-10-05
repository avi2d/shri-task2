import React from 'react';
import PropTypes from 'prop-types';

const EventSourceMotionSensor = ({
 image,
 image2x,
 image3x,
 imageWebp,
 imageWebp2x,
 imageWebp3x,
}) => (
  <div className="event-source-motion-sensor">
    <picture>
      <source type="image/webp" srcSet={`${imageWebp}, ${imageWebp2x} 2x, ${imageWebp3x} 3x`} />
      <img srcSet={`${image}, ${image2x} 2x, ${image3x} 3x`} alt="Изображение с камеры" />
    </picture>
  </div>
);

EventSourceMotionSensor.propTypes = {
  image: PropTypes.string.isRequired,
  image2x: PropTypes.string,
  image3x: PropTypes.string,
  imageWebp: PropTypes.string,
  imageWebp2x: PropTypes.string,
  imageWebp3x: PropTypes.string,
};

export default EventSourceMotionSensor;
