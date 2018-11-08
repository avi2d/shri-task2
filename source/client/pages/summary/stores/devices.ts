import { types, flow, Instance } from 'mobx-state-tree';

import devicesSource from '../sources/devices';
import { DeviceType } from '../types';

const Device = types.model({
  type: types.enumeration<DeviceType>('DeviceType', Object.values(DeviceType)),
  turnedOn: types.maybeNull(types.boolean),
  title: types.string,
  stateInfo: types.maybeNull(types.string)
});

const Filter = types.model({
  label: types.string,
  id: types.number
});

const Devices = types
  .model('devices', {
    data: types.optional(types.array(Device), []),
    filters: types.optional(types.array(Filter), []),
    total: 0
  })
  .actions(self => ({
    fetchDevices: flow(function*() {
      const { data, total } = yield devicesSource.getDevices();

      self.data = data;
      self.total = total;
    }),

    fetchFilters: flow(function*() {
      const { data } = yield devicesSource.getFilters();

      self.filters = data;
    })
  }));

export default Devices.create();

export type IDevice = Instance<typeof Device>;
export type IFilter = Instance<typeof Filter>;
export type IDevices = Instance<typeof Devices>;
