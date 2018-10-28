import * as React from 'react';
import { inject, observer } from 'mobx-react';

import utils from '../utils';
import {
  INITIAL_Z_INDEX,
  VIDEO_Z_INDEX_DIFF
} from '../constants/data-constants';
import { IVideosExpanding } from '../stores/videosExpanding';
import { IVideosFilters } from '../stores/videosFilters';

interface IProps {
  videoName: string;
  videoOrigin: string;
  audioContext: AudioContext;
  analyser: AnalyserNode;
  videosFilters?: IVideosFilters;
  videosExpanding?: IVideosExpanding;
  getContainer: () => HTMLDivElement;
}

@inject('videosFilters', 'videosExpanding')
@observer
class VideoFrame extends React.Component<IProps> {
  videoFrameRef = React.createRef<HTMLDivElement>();
  videoRef = React.createRef<HTMLVideoElement>();

  videoSource: MediaElementAudioSourceNode | null = null;

  get video() {
    return this.videoRef.current!;
  }

  get videoFrame() {
    return this.videoFrameRef.current!;
  }

  get isExpanded() {
    return this.props.videosExpanding!.isExpanded(this.props.videoName);
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
    const { audioContext, analyser } = this.props;

    this.videoSource = audioContext.createMediaElementSource(this.video);
    this.videoSource.connect(analyser);
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
    const { getVideoBrightness, getVideoContrast } = this.props.videosFilters!;
    const { videoName } = this.props;

    return {
      filter: `
        brightness(${getVideoBrightness(videoName)}%)
        contrast(${getVideoContrast(videoName)}%)
      `
    };
  }

  onExpand = () => {
    const { setExpandedVideo } = this.props.videosExpanding!;

    this.setState({ isInitialScale: false });

    setExpandedVideo(this.props.videoName!);
  };

  onScaleEnded = () => {
    const { accountVideoScaling } = this.props.videosExpanding!;

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

export default VideoFrame;
