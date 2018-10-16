import React, { Component } from 'react';

import { VideoFrame, FilterControls, FrequencyHistogram } from './components';
import { VIDEOS } from './constants/data-constants';

class VideoMonitoringPage extends Component {
  containerRef = React.createRef();

  /* global AudioContext */
  audioContext = new AudioContext();

  get container() {
    return this.containerRef.current;
  }

  renderVideoFrames = () => {
    return VIDEOS.map(({ name, origin }) => (
      <VideoFrame
        key={name}
        videoName={name}
        videoOrigin={origin}
        audioContext={this.audioContext}
        getContainer={() => this.container}
      />
    ));
  };

  render() {
    return (
      <div ref={this.containerRef} className="video-monitoring-page">
        {this.renderVideoFrames()}
        <FrequencyHistogram />
        <FilterControls />
      </div>
    );
  }
}

export default VideoMonitoringPage;
