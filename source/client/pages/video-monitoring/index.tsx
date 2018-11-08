import * as React from 'react';

import { VideoFrame, FilterControls, FrequencyHistogram } from './components';
import { VIDEOS } from './constants/data-constants';

interface IWindow {
  AudioContext: typeof AudioContext;
  webkitAudioContext: typeof AudioContext;
  mozAudioContext: typeof AudioContext;
}
declare const window: IWindow;

class VideoMonitoringPage extends React.Component {
  containerRef = React.createRef<HTMLDivElement>();

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser: AnalyserNode = this.audioContext.createAnalyser();

  get container() {
    return this.containerRef.current!;
  }

  componentDidMount() {
    this.analyser.smoothingTimeConstant = 0.9;
    this.analyser.fftSize = 256;

    this.analyser.connect(this.audioContext.destination);
  }

  renderVideoFrames = () => {
    return VIDEOS.map(({ name, origin }) => (
      <VideoFrame
        key={name}
        videoName={name}
        videoOrigin={origin}
        audioContext={this.audioContext}
        analyser={this.analyser}
        getContainer={() => this.container}
      />
    ));
  };

  render() {
    return (
      <div ref={this.containerRef} className="video-monitoring-page">
        {this.renderVideoFrames()}
        <FrequencyHistogram analyser={this.analyser} />
        <FilterControls />
      </div>
    );
  }
}

export default VideoMonitoringPage;
