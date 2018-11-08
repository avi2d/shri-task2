import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { IVideosExpanding } from '../stores/videosExpanding';

import {
  HISTOGRAM_Z_INDEX_DIFF,
  INITIAL_Z_INDEX
} from '../constants/data-constants';

const CANVAS_WIDTH = 128;
const CANVAS_HEIGHT = 64;

interface IProps {
  analyser: AnalyserNode;
  videosExpanding?: IVideosExpanding;
}

@inject('videosExpanding')
@observer
class FrequencyHistogram extends React.Component<IProps> {
  canvasRef = React.createRef<HTMLCanvasElement>();

  get canvasContext() {
    return this.canvasRef.current!.getContext('2d')!;
  }

  get isHistogramVisible() {
    const { expandedVideoName, isVideoScaling } = this.props.videosExpanding!;

    return expandedVideoName !== null && !isVideoScaling;
  }

  componentDidUpdate() {
    this.drawHistogram();
  }

  drawHistogram = () => {
    this.canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (!this.isHistogramVisible) return;

    const frequencies = new Uint8Array(this.props.analyser.frequencyBinCount);

    this.props.analyser.getByteFrequencyData(frequencies);

    frequencies.forEach((frequency, index) => {
      const barHeight = frequency / 2;

      this.canvasContext.fillStyle = '#ff0';
      this.canvasContext.fillRect(
        index * 0.5 + 0.5,
        CANVAS_HEIGHT - barHeight / 2,
        0.5,
        barHeight
      );
    });

    window.requestAnimationFrame(this.drawHistogram);
  };

  defineStyle = (): React.CSSProperties => {
    return {
      visibility: this.isHistogramVisible ? 'visible' : 'hidden',
      zIndex: INITIAL_Z_INDEX + HISTOGRAM_Z_INDEX_DIFF
    };
  };

  render() {
    return (
      <div className="frequency-histogram" style={this.defineStyle()}>
        <canvas
          ref={this.canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    );
  }
}

export default FrequencyHistogram;
