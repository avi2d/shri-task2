import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { addEvents } from '../../decorators';

@addEvents
@inject('camera')
@observer
class EventSourceMotionSensor extends Component {
  imageRef = React.createRef();

  state = {
    a: 5
  };

  get image() {
    return this.imageRef.current;
  }

  componentDidMount() {
    this.image.onload = () => {
      this.props.camera.performInitialData(
        this.image.offsetWidth,
        this.image.offsetHeight
      );

      // this.image.addEventListener(
      //   'touchstart',
      //   event => event.preventDefault(),
      //   {
      //     capture: true,
      //     passive: false
      //   }
      // );
      this.image.addEventListener('dragstart', event => event.preventDefault());
    };
  }

  onPointerDown = event => {
    this.props.events.addEvent(event);

    const { setScrollStartEvent, setRotateStartEvent } = this.props.events;

    setScrollStartEvent();
    setRotateStartEvent();
  };

  onPointerMove = event => {
    this.props.events.updateEvent(event);

    const {
      eventsCount,
      pinchDiff,
      scrollDiff,
      rotateDiff
    } = this.props.events;
    const { updateScale, updateOffset, updateBrightness } = this.props.camera;

    if (eventsCount === 2) {
      updateBrightness(rotateDiff);
      updateScale(pinchDiff);
    }

    if (eventsCount === 1) {
      if (!scrollDiff) return;

      updateOffset(scrollDiff);
    }
  };

  onPointerUp = event => {
    const { removeEvent, clearEventsAccounts } = this.props.events;

    removeEvent(event);
    clearEventsAccounts();

    this.props.camera.fixCameraState();
  };

  renderHud = () => {
    const {
      imageStartX,
      imageStartY,
      imageStartScale,
      imageStartBrightness,
      imageCurrentX,
      imageCurrentY,
      imageCurrentScale,
      imageCurrentBrightness,

      rangeX,
      rangeMaxX,
      rangeMinX,

      rangeY,
      rangeMaxY,
      rangeMinY
    } = this.props.camera;

    return (
      <pre>
        {`
        Current
          Scale:      ${imageCurrentScale.toFixed(4)}
          X:          ${imageCurrentX.toFixed(4)}
          Y:          ${imageCurrentY.toFixed(4)}
          Brightness: ${imageCurrentBrightness.toFixed(4)}
          Temp:       ${this.image && this.image.offsetWidth}
          Temp:       ${this.image && this.image.offsetHeight}
        Range
          rangeX:     ${rangeX.toFixed(4)}
          rangeMinX:  ${rangeMinX.toFixed(4)}
          rangeMaxX:  ${rangeMaxX.toFixed(4)}
          rangeY:     ${rangeY.toFixed(4)}
          rangeMinY:  ${rangeMinY.toFixed(4)}
          rangeMaxY:  ${rangeMaxY.toFixed(4)}
        Updated
          Scale:      ${imageStartScale.toFixed(4)}
          X:          ${imageStartX.toFixed(4)}
          Y:          ${imageStartY.toFixed(4)}
          Brightness: ${imageStartBrightness.toFixed(4)}
      `}
      </pre>
    );
  };

  defineImageStyle = () => {
    const {
      imageCurrentX,
      imageCurrentY,
      imageCurrentScale,
      imageCurrentBrightness
    } = this.props.camera;

    const transform = `
      translateX(${imageCurrentX}px)
      translateY(${imageCurrentY}px)
      translateZ(0px)
      scale(${imageCurrentScale},${imageCurrentScale})
    `;
    const filter = `brightness(${imageCurrentBrightness})`;

    return { transform, filter };
  };

  render() {
    const { imageCurrentScale, imageBrightnessProgress } = this.props.camera;

    return (
      <div
        className="event-source-motion-sensor"
        style={{ touchAction: 'none' }}
      >
        <div className="motion-sensor-container">
          <img
            ref={this.imageRef}
            src={this.props.image}
            alt="Изображение с камеры"
            style={this.defineImageStyle()}
            onPointerDown={this.onPointerDown}
            onPointerMove={this.onPointerMove}
            onPointerUp={this.onPointerUp}
            onPointerCancel={this.onPointerUp}
            onPointerOut={this.onPointerUp}
            onPointerLeave={this.onPointerUp}
          />
        </div>
        <div className="motion-sensor-indicators">
          <span>Приближение: {imageCurrentScale.toFixed(1)}</span>
          <span>Яркость: {imageBrightnessProgress}%</span>
        </div>
        <button onClick={() => this.setState({ a: 10 })}>{this.state.a}</button>
        <div id="hud">{this.renderHud()}</div>
      </div>
    );
  }
}

EventSourceMotionSensor.propTypes = {
  camera: PropTypes.object,
  events: PropTypes.object,
  image: PropTypes.string.isRequired
};

export default EventSourceMotionSensor;
