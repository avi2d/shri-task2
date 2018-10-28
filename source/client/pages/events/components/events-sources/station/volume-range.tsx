import * as React from 'react';
import Slider from 'rc-slider';

const StationVolumeRange = () => (
  <Slider
    className="station-volume-range"
    min={0}
    max={100}
    defaultValue={50}
  />
);

export default StationVolumeRange;
