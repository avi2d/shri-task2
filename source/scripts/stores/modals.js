/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';

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
}));

export default Modals.create();
