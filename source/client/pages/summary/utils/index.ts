import { DeviceType } from '../constants/data-constants';

export default {
  defineIcon(type, turnedOn = false) {
    if (type !== DeviceType.scheduled) {
      return `state-${type}-${turnedOn ? 'on' : 'off'}`;
    }

    return `state-${type}`;
  },

  formatNumberToOutput(value) {
    return value > 0 ? `+${value}` : value;
  }
};
