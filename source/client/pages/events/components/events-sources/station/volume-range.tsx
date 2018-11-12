import * as React from 'react';
import Slider from 'rc-slider';

interface IProps {
  className?: string;
}

const StationVolumeRange: React.SFC<IProps> = ({ className }) => (
  <Slider className={className} min={0} max={100} defaultValue={50} />
);

export default StationVolumeRange;
