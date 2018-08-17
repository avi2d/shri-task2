/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import { autorun } from 'mobx';

const Modals = types.model('modals', {
  active: '',
}).actions(self => ({
  modalToggle(modal) {
    if (self.active === modal) {
      self.active = '';
      return;
    }

    self.active = modal;
  },

  stateClear() {
    self.active = '';
  }
})).create();

autorun(() => {
  if (Modals.active) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

export default Modals;
