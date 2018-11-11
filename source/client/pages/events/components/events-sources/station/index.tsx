import * as React from 'react';
import { cn } from '@bem-react/classname';

import CompositionSwitchButton from './composition-switch-button';
import TrackLineRange from './track-line-range';
import VolumeRange from './volume-range';

const block = cn('Station');

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
    <div className={block()}>
      <div className={block('CompositionInfo')}>
        <img src={albumcover} alt="Альбом" />
        <div className={block('CompositionInfoPanel')}>
          <div
            className={block('CompositionInfoPanelCompositionName')}
            title={compositionName}
          >
            {compositionName}
          </div>
          <div className={block('CompositionInfoPanelTrackLine')}>
            <TrackLineRange
              className={block('CompositionInfoPanelTrackLineRange')}
            />
            <div className={block('CompositionInfoPanelTrackLineLength')}>
              {track.length}
            </div>
          </div>
        </div>
      </div>
      <div className={block('CompositionControls')}>
        <div className={block('CompositionControlsSwitchButtons')}>
          <CompositionSwitchButton
            className={block('CompositionControlsSwitchButton')}
            switchTo="prev"
          />
          <CompositionSwitchButton
            className={block('CompositionControlsSwitchButton')}
            switchTo="next"
          />
        </div>
        <div className={block('CompositionControlsVolume')}>
          <VolumeRange className={block('CompositionControlsVolumeRange')} />
          <div className={block('CompositionControlsVolumeValue')}>
            {volume}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSourceStation;
