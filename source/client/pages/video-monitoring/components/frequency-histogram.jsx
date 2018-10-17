import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import {
  HISTOGRAM_Z_INDEX_DIFF,
  INITIAL_Z_INDEX
} from '../constants/data-constants';

const CANVAS_WIDTH = 128;
const CANVAS_HEIGHT = 64;

@inject('videosExpanding')
@observer
class FrequencyHistogram extends Component {
  canvasRef = React.createRef();

  get canvasContext() {
    return this.canvasRef.current.getContext('2d');
  }

  get isHistogramVisible() {
    const { expandedVideoName, isVideoScaling } = this.props.videosExpanding;

    return expandedVideoName !== null && !isVideoScaling;
  }

  componentDidUpdate() {
    this.drawHistogram();
  }

  drawHistogram = () => {
    this.canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (!this.isHistogramVisible) return;

    const { expandedVideoAnalyzer } = this.props.videosExpanding;

    const frequencies = new Uint8Array(expandedVideoAnalyzer.frequencyBinCount);

    expandedVideoAnalyzer.getByteFrequencyData(frequencies);

    frequencies.map((frequency, index) => {
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

  defineStyle = () => {
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

FrequencyHistogram.propTypes = {
  videosExpanding: PropTypes.object
};

export default FrequencyHistogram;
