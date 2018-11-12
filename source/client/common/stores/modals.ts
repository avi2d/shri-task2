import { Instance, types } from 'mobx-state-tree';
import { autorun } from 'mobx';
import { ModalActive } from 'types';

const Modals = types
  .model('modals', {
    active: types.maybeNull(types.union(types.string, types.number))
  })
  .actions(self => ({
    modalToggle(modal: ModalActive) {
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
  const layout = document.querySelector<HTMLElement>('.Layout')!;

  if (Modals.active) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'ModalOverlay';
    layout.appendChild(modalOverlay);

    document.body.style.overflow = 'hidden';

    modalOverlay.style.opacity = '1';
    modalOverlay.style.visibility = 'visible';
    layout.style.filter = 'blur(3px)';
  } else {
    const modalOverlay = document.querySelector<HTMLElement>('.ModalOverlay');

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
