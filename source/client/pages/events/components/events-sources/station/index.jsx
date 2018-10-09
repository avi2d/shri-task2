import React from 'react';
import PropTypes from 'prop-types';

import CompositionSwitchButton from './composition-switch-button';
import TrackLineRange from './track-line-range';
import VolumeRange from './volume-range';

const EventsSourceStation = ({ albumcover, artist, track, volume }) => {
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

EventsSourceStation.propTypes = {
  albumcover: PropTypes.string,
  artist: PropTypes.string,
  track: PropTypes.object,
  volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default EventsSourceStation;
