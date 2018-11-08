import * as React from 'react';
import { inject, observer } from 'mobx-react';

import InputRange from './input-range';
import {
  DEFAULT_BRIGHTNESS,
  MIN_BRIGHTNESS,
  MAX_BRIGHTNESS,
  DEFAULT_CONTRAST,
  MIN_CONTRAST,
  MAX_CONTRAST,
  INITIAL_Z_INDEX,
  CONTROLS_Z_INDEX_DIFF
} from '../../constants/data-constants';
import { IVideosFilters } from '../../stores/videosFilters';
import { IVideosExpanding } from '../../stores/videosExpanding';

interface IProps {
  videosExpanding?: IVideosExpanding;
  videosFilters?: IVideosFilters;
}

@inject('videosFilters', 'videosExpanding')
@observer
class FiltersControls extends React.Component<IProps> {
  get isControlsVisible() {
    const { expandedVideoName, isVideoScaling } = this.props.videosExpanding!;

    return expandedVideoName !== null && !isVideoScaling;
  }

  onBrightnessChange = (brightness: number) => {
    const { expandedVideoName } = this.props.videosExpanding!;
    const { setVideoBrightness } = this.props.videosFilters!;

    setVideoBrightness(expandedVideoName!, brightness);
  };

  onContrastChange = (contrast: number) => {
    const { expandedVideoName } = this.props.videosExpanding!;
    const { setVideoContrast } = this.props.videosFilters!;

    setVideoContrast(expandedVideoName!, contrast);
  };

  definesStyle = (): React.CSSProperties => {
    return {
      bottom: this.isControlsVisible ? 0 : '-40px',
      visibility: this.isControlsVisible ? 'visible' : 'hidden',
      zIndex: INITIAL_Z_INDEX + CONTROLS_Z_INDEX_DIFF
    };
  };

  render() {
    const { getVideoBrightness, getVideoContrast } = this.props.videosFilters!;
    const { expandedVideoName } = this.props.videosExpanding!;

    return (
      <div className="filters-controls" style={this.definesStyle()}>
        <InputRange
          min={MIN_BRIGHTNESS}
          max={MAX_BRIGHTNESS}
          value={getVideoBrightness(expandedVideoName!)!}
          defaultValue={DEFAULT_BRIGHTNESS}
          onChange={this.onBrightnessChange}
        />
        <InputRange
          min={MIN_CONTRAST}
          max={MAX_CONTRAST}
          value={getVideoContrast(expandedVideoName!)!}
          defaultValue={DEFAULT_CONTRAST}
          onChange={this.onContrastChange}
        />
      </div>
    );
  }
}

export default FiltersControls;
