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
    mode: false
  };

  get image() {
    return this.imageRef.current;
  }

  componentDidMount() {
    this.props.camera.performInitialData(
      this.image.offsetWidth,
      this.image.offsetHeight
    );

    this.image.onpointerdown = this.onPointerDown;
    this.image.onpointermove = this.onPointerMove;

    this.image.onpointerup = this.onPointerUp;
    this.image.onpointercancel = this.onPointerUp;
    this.image.onpointerout = this.onPointerUp;
    this.image.onpointerleave = this.onPointerUp;

    this.image.addEventListener('touchstart', event => event.preventDefault(), {
      capture: true,
      passive: false
    });
    this.image.addEventListener('dragstart', event => event.preventDefault());
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
      if (this.state.mode) {
        updateBrightness(rotateDiff);
      } else {
        updateScale(pinchDiff);
      }
    }

    if (eventsCount === 1) {
      if (!scrollDiff) return;

      if (!this.state.mode) {
        updateOffset(scrollDiff);
      }
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

  toggleMode = () => {
    this.setState({ mode: !this.state.mode });
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
    return (
      <div
        className="event-source-motion-sensor"
        style={{ touchAction: 'none' }}
      >
        <img
          ref={this.imageRef}
          srcSet={this.props.image}
          alt="Изображение с камеры"
          style={this.defineImageStyle()}
        />
        <div id="hud">{this.renderHud()}</div>
        <button onClick={this.toggleMode}>Toggle Mode</button>
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
