import { Instance, types } from 'mobx-state-tree';
import { IPoint } from 'types';

const MIN_SCALE = 1;
const MAX_SCALE = 4;

const MIN_BRIGHTNESS = 0;
const MAX_BRIGHTNESS = 2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(min, value), max);

const Camera = types
  .model('camera', {
    imageStartX: 0,
    imageStartY: 0,
    imageStartScale: 1,
    imageStartBrightness: 1,
    imageCurrentX: 0,
    imageCurrentY: 0,
    imageCurrentScale: 1,
    imageCurrentBrightness: 1,

    containerWidth: 0,
    containerHeight: 0,
    containerDefaultWidth: 0,
    containerDefaultHeight: 0,

    rangeX: 0,
    rangeMaxX: 0,
    rangeMinX: 0,

    rangeY: 0,
    rangeMaxY: 0,
    rangeMinY: 0
  })
  .views(self => ({
    get imageBrightnessProgress() {
      return (
        (self.imageCurrentBrightness / (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) * 100
      );
    }
  }))
  .actions(self => ({
    updateRange() {
      const scaledImageWidth =
        self.containerDefaultWidth * self.imageCurrentScale;
      const scaledImageHeight =
        self.containerDefaultHeight * self.imageCurrentScale;

      self.rangeX = Math.max(0, scaledImageWidth - self.containerWidth);
      self.rangeY = Math.max(0, scaledImageHeight - self.containerHeight);

      self.rangeMaxX = self.rangeX / 2;
      self.rangeMinX = 0 - self.rangeMaxX;

      self.rangeMaxY = self.rangeY / 2;
      self.rangeMinY = 0 - self.rangeMaxY;
    },

    updateOffset(scrollDiff: IPoint) {
      self.imageCurrentX = clamp(
        self.imageStartX + scrollDiff.x,
        self.rangeMinX,
        self.rangeMaxX
      );
      self.imageCurrentY = clamp(
        self.imageStartY + scrollDiff.y,
        self.rangeMinY,
        self.rangeMaxY
      );
    }
  }))
  .actions(self => ({
    performInitialData(imageWidth: number, imageHeight: number) {
      self.containerWidth = imageWidth;
      self.containerHeight = imageHeight;
      self.containerDefaultWidth = imageWidth;
      self.containerDefaultHeight = imageHeight;

      self.updateRange();

      self.imageCurrentX = clamp(
        self.imageStartX,
        self.rangeMinX,
        self.rangeMaxX
      );
      self.imageCurrentY = clamp(
        self.imageStartY,
        self.rangeMinY,
        self.rangeMaxY
      );
    },

    updateScale(pinchDiff: number) {
      const newScale = self.imageStartScale + pinchDiff / 100;

      self.imageStartScale = clamp(newScale, MIN_SCALE, MAX_SCALE);
      self.imageCurrentScale = self.imageStartScale;

      self.updateRange();

      self.imageCurrentX = clamp(
        self.imageCurrentX,
        self.rangeMinX,
        self.rangeMaxX
      );
      self.imageCurrentY = clamp(
        self.imageCurrentY,
        self.rangeMinY,
        self.rangeMaxY
      );
    },

    updateBrightness(rotateDiff: number) {
      const newBrightness = self.imageStartBrightness + rotateDiff / 100;

      self.imageStartBrightness = clamp(
        newBrightness,
        MIN_BRIGHTNESS,
        MAX_BRIGHTNESS
      );
      self.imageCurrentBrightness = self.imageStartBrightness;
    },

    fixCameraState() {
      self.imageStartScale = self.imageCurrentScale;
      self.imageStartX = self.imageCurrentX;
      self.imageStartY = self.imageCurrentY;
    }
  }));

export default Camera.create();

export type ICamera = Instance<typeof Camera>;
