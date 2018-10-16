import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import utils from '../utils';
import {
  INITIAL_Z_INDEX,
  VIDEO_Z_INDEX_DIFF
} from '../constants/data-constants';

@inject('videosFilters', 'videosExpanding')
@observer
class VideoFrame extends Component {
  videoFrameRef = React.createRef();
  videoRef = React.createRef();

  videoSource = null;
  analyser = null;

  get video() {
    return this.videoRef.current;
  }

  get videoFrame() {
    return this.videoFrameRef.current;
  }

  get isExpanded() {
    return this.props.videosExpanding.isExpanded(this.props.videoName);
  }

  get currentZIndex() {
    return this.state.isInitialScale
      ? INITIAL_Z_INDEX
      : INITIAL_Z_INDEX + VIDEO_Z_INDEX_DIFF;
  }

  get currentScale() {
    const { getContainer } = this.props;

    const videoFrameWidth = this.videoFrame.offsetWidth;
    const scaleX = getContainer().offsetWidth / videoFrameWidth;

    const videoFrameHeight = this.videoFrame.offsetHeight;
    const scaleY = getContainer().offsetHeight / videoFrameHeight;

    return { scaleX, scaleY };
  }

  state = {
    isInitialScale: true
  };

  componentDidMount() {
    utils.initVideo(this.video, this.props.videoName);

    this.videoFrame.addEventListener('transitionend', this.onScaleEnded);

    this.initAudioConfigs();
  }

  initAudioConfigs = () => {
    const { audioContext } = this.props;

    this.analyser = audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.9;
    this.analyser.fftSize = 256;

    this.videoSource = audioContext.createMediaElementSource(this.video);
    this.videoSource.connect(this.analyser);
    this.analyser.connect(audioContext.destination);
  };

  defineDefaultStyle = () => {
    return {
      transformOrigin: this.props.videoOrigin,
      zIndex: INITIAL_Z_INDEX
    };
  };

  defineExpandStyle() {
    if (!this.video) return null;

    const { scaleX, scaleY } = this.currentScale;

    return {
      transform: this.isExpanded ? `scale(${scaleX}, ${scaleY})` : '',
      zIndex: this.currentZIndex
    };
  }

  defineFiltersStyle() {
    const { getVideoBrightness, getVideoContrast } = this.props.videosFilters;
    const { videoName } = this.props;

    return {
      filter: `
        brightness(${getVideoBrightness(videoName)}%)
        contrast(${getVideoContrast(videoName)}%)
      `
    };
  }

  onExpand = () => {
    const { setExpandedVideo } = this.props.videosExpanding;

    this.setState({ isInitialScale: false });

    setExpandedVideo(this.props.videoName, this.analyser);
  };

  onScaleEnded = () => {
    const { accountVideoScaling } = this.props.videosExpanding;

    if (!this.isExpanded) {
      this.setState({ isInitialScale: true });
    }

    accountVideoScaling(false);
  };

  render() {
    return (
      <div
        className="video-frame"
        ref={this.videoFrameRef}
        style={{
          ...this.defineDefaultStyle(),
          ...this.defineExpandStyle()
        }}
        onClick={this.onExpand}
      >
        <video
          autoPlay
          muted={!this.isExpanded}
          ref={this.videoRef}
          style={this.defineFiltersStyle()}
        />
      </div>
    );
  }
}

VideoFrame.propTypes = {
  videoName: PropTypes.string.isRequired,
  videoOrigin: PropTypes.string.isRequired,
  audioContext: PropTypes.object,
  videosFilters: PropTypes.object,
  videosExpanding: PropTypes.object,
  getContainer: PropTypes.func.isRequired
};

export default VideoFrame;
