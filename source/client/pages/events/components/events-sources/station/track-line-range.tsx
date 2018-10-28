import * as React from 'react';
import Slider from 'rc-slider';

const StationTrackLineRange = () => (
  <Slider
    className="station-track-line-range"
    min={0}
    max={100}
    defaultValue={50}
  />
);

export default StationTrackLineRange;
