import { types, flow, Instance } from 'mobx-state-tree';

import eventsSource from '../sources/events';
import { EventCardType, EventCardSize } from '../constants/data-constants';

const Event = types.model({
  type: types.enumeration<EventCardType>(
    'EventType',
    Object.values(EventCardType)
  ),
  size: types.enumeration<EventCardSize>(
    'EventSize',
    Object.values(EventCardSize)
  ),
  title: types.string,
  source: types.string,
  time: types.string,
  description: types.maybeNull(types.string),
  icon: types.string,
  data: types.frozen()
});

const Events = types
  .model('events', {
    data: types.optional(types.array(Event), []),
    total: 0
  })
  .actions(self => ({
    fetchEvents: flow(function*() {
      const { data, total } = yield eventsSource.getEvents();

      self.data = data;
      self.total = total;
    })
  }));

export default Events.create();

export type IEvent = Instance<typeof Event>;
export type IEvents = Instance<typeof Events>;
