import { Instance, types } from 'mobx-state-tree';

const WindowSize = types
  .model('windowSize', {
    width: window.innerWidth,
    height: window.innerHeight
  })
  .views(self => ({
    get isWidthLowerThen800() {
      return self.width <= 800;
    },

    get isWidthLowerThen500() {
      return self.width <= 500;
    },

    get isWidthLowerThen1070() {
      return self.width <= 1070;
    }
  }))
  .actions(self => ({
    handleUpdateSize({ target }: Event) {
      self.width = (target as Window).innerWidth;
      self.height = (target as Window).innerHeight;
    }
  }))
  .actions(self => ({
    afterCreate() {
      window.addEventListener('resize', self.handleUpdateSize);
    }
  }));

export default WindowSize.create();

export type IWindowsSize = Instance<typeof WindowSize>;
