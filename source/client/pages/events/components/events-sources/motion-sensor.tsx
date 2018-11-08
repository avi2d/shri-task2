import * as React from 'react';
import { inject, observer } from 'mobx-react';

import EventsService from '../../services/eventsService';
import { ICamera } from '../../stores/camera';

interface IProps {
  camera: ICamera;
  image: string;
}

@inject('camera')
@observer
class EventSourceMotionSensor extends React.Component<IProps> {
  imageRef = React.createRef<HTMLImageElement>();

  get image() {
    return this.imageRef.current!;
  }

  events = new EventsService();

  componentDidMount() {
    this.image.onload = () => {
      this.props.camera.performInitialData(
        this.image.offsetWidth,
        this.image.offsetHeight
      );

      this.image.addEventListener('pointerdown', this.onPointerDown);
      this.image.addEventListener('pointermove', this.onPointerMove);
      this.image.addEventListener('pointerup', this.onPointerUp);
      this.image.addEventListener('pointercancel', this.onPointerUp);
      this.image.addEventListener('pointerout', this.onPointerUp);
      this.image.addEventListener('pointerleave', this.onPointerUp);

      this.image.addEventListener('dragstart', event => event.preventDefault());
    };
  }

  onPointerDown = (event: PointerEvent) => {
    this.events.addEvent(event);

    const { setScrollStartEvent, setRotateStartEvent } = this.events;

    setScrollStartEvent();
    setRotateStartEvent();
  };

  onPointerMove = (event: PointerEvent) => {
    this.events.updateEvent(event);

    const { eventsCount, pinchDiff, scrollDiff, rotateDiff } = this.events;
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

  onPointerUp = (event: PointerEvent) => {
    const { removeEvent, clearEventsAccounts } = this.events;

    removeEvent(event);
    clearEventsAccounts();

    this.props.camera.fixCameraState();
  };

  // renderHud = () => {
  //   const {
  //     imageStartX,
  //     imageStartY,
  //     imageStartScale,
  //     imageStartBrightness,
  //     imageCurrentX,
  //     imageCurrentY,
  //     imageCurrentScale,
  //     imageCurrentBrightness,
  //
  //     rangeX,
  //     rangeMaxX,
  //     rangeMinX,
  //
  //     rangeY,
  //     rangeMaxY,
  //     rangeMinY
  //   } = this.props.camera;
  //
  //   return (
  //     <pre>
  //       {`
  //       Current
  //         Scale:      ${imageCurrentScale.toFixed(4)}
  //         X:          ${imageCurrentX.toFixed(4)}
  //         Y:          ${imageCurrentY.toFixed(4)}
  //         Brightness: ${imageCurrentBrightness.toFixed(4)}
  //       Range
  //         rangeX:     ${rangeX.toFixed(4)}
  //         rangeMinX:  ${rangeMinX.toFixed(4)}
  //         rangeMaxX:  ${rangeMaxX.toFixed(4)}
  //         rangeY:     ${rangeY.toFixed(4)}
  //         rangeMinY:  ${rangeMinY.toFixed(4)}
  //         rangeMaxY:  ${rangeMaxY.toFixed(4)}
  //       Updated
  //         Scale:      ${imageStartScale.toFixed(4)}
  //         X:          ${imageStartX.toFixed(4)}
  //         Y:          ${imageStartY.toFixed(4)}
  //         Brightness: ${imageStartBrightness.toFixed(4)}
  //     `}
  //     </pre>
  //   );
  // };

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
      <div className="event-source-motion-sensor" touch-action="none">
        <div className="motion-sensor-container">
          <img
            ref={this.imageRef}
            src={this.props.image}
            alt="Изображение с камеры"
            style={this.defineImageStyle()}
          />
        </div>
        <div className="motion-sensor-indicators">
          <span>Приближение: {imageCurrentScale.toFixed(1)}</span>
          <span>Яркость: {imageBrightnessProgress.toFixed(0)}%</span>
        </div>
        {/* <div id="hud">{this.renderHud()}</div> */}
      </div>
    );
  }
}

export default EventSourceMotionSensor;
