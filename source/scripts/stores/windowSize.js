/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';

const WindowSize = types.model('windowSize', {
  width: window.innerWidth,
  height: window.innerHeight,
}).views(self => ({
  get isWidthLowerThen800() {
    return self.width <= 800;
  },

  get isWidthLowerThen500() {
    return self.width <= 500;
  },

  get isWidthLowerThen1070() {
    return self.width <= 1070;
  },
})).actions(self => ({
  handleUpdateSize({ target }) {
    self.width = target.innerWidth;
    self.height = target.innerHeight;
  },

  afterCreate() {
    window.addEventListener('resize', self.handleUpdateSize);
  }
}));

export default WindowSize.create();
