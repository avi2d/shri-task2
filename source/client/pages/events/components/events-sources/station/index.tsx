import * as React from 'react';

import CompositionSwitchButton from './composition-switch-button';
import TrackLineRange from './track-line-range';
import VolumeRange from './volume-range';

interface IProps {
  albumcover: string;
  artist: string;
  track: { name: string; length: string };
  volume: string | number;
}

const EventsSourceStation: React.SFC<IProps> = ({
  albumcover,
  artist,
  track,
  volume
}) => {
  const compositionName = `${artist} - ${track.name}`;

  return (
    <div className="event-source-station">
      <div className="composition-info">
        <img src={albumcover} alt="Альбом" />
        <div className="composition-info-panel">
          <div className="panel-composition-name" title={compositionName}>
            {compositionName}
          </div>
          <div className="panel-track-line">
            <TrackLineRange />
            <div className="track-line-length">{track.length}</div>
          </div>
        </div>
      </div>
      <div className="composition-controls">
        <div className="controls-switch-buttons">
          <CompositionSwitchButton switchTo="prev" />
          <CompositionSwitchButton switchTo="next" />
        </div>
        <div className="controls-volume">
          <VolumeRange />
          <div className="volume-value">{volume}%</div>
        </div>
      </div>
    </div>
  );
};

export default EventsSourceStation;
