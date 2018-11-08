import * as React from 'react';

interface IProps {
  image: string;
  image2x: string;
  image3x: string;
  imageWebp: string;
  imageWebp2x: string;
  imageWebp3x: string;
}

const EventSourceConsumptionSensor: React.SFC<IProps> = ({
  image,
  image2x,
  image3x,
  imageWebp,
  imageWebp2x,
  imageWebp3x
}) => (
  <div className="event-source-consumption-sensor">
    <picture>
      <source
        type="image/webp"
        srcSet={`${imageWebp}, ${imageWebp2x} 2x, ${imageWebp3x} 3x`}
      />
      <img
        srcSet={`${image}, ${image2x} 2x, ${image3x} 3x`}
        alt="Потребление ресурсов"
      />
    </picture>
  </div>
);

export default EventSourceConsumptionSensor;
