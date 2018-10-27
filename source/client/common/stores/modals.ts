import { Instance, types } from 'mobx-state-tree';
import { autorun } from 'mobx';

const Modals = types
  .model('modals', {
    active: types.maybe(types.union(types.string, types.number, types.null))
  })
  .actions(self => ({
    modalToggle(modal) {
      if (self.active === modal) {
        self.active = null;
        return;
      }

      self.active = modal;
    },

    stateClear() {
      self.active = null;
    }
  }))
  .create();

autorun(() => {
  const layout = document.querySelector<HTMLElement>('.layout')!;

  if (Modals.active) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    layout.appendChild(modalOverlay);

    document.body.style.overflow = 'hidden';

    modalOverlay.style.opacity = '1';
    modalOverlay.style.visibility = 'visible';
    layout.style.filter = 'blur(3px)';
  } else {
    const modalOverlay = document.querySelector<HTMLElement>('.modal-overlay');

    document.body.style.overflow = '';

    if (!modalOverlay) return;

    modalOverlay.style.opacity = '';
    modalOverlay.style.visibility = '';
    layout.style.filter = '';

    layout.removeChild(modalOverlay);
  }
});

export default Modals;

export type IModals = Instance<typeof Modals>;
