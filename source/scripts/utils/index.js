import { DEVICES_TYPES } from '../constants/data-constants';

export default {
  defineIcon(type, turnedOn) {
    if (type !== DEVICES_TYPES.scheduled) {
      return `state-${type}-${turnedOn ? 'on' : 'off'}`;
    }

    return `state-${type}`;
  }
};
