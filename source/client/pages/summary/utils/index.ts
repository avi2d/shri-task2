import { DeviceType } from '../types';

export default {
  defineIcon(type: string, turnedOn: boolean | null = false) {
    if (type !== DeviceType.scheduled) {
      return `state-${type}-${turnedOn ? 'on' : 'off'}`;
    }

    return `state-${type}`;
  },

  formatNumberToOutput(value: number | string): string {
    return value > 0 ? `+${value}` : `${value}`;
  }
};
