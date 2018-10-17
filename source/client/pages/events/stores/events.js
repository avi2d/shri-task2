import { types, flow } from 'mobx-state-tree';

import eventsSource from '../sources/events';

const Event = types.model({
  type: types.enumeration('EventType', ['critical', 'info']),
  title: types.string,
  source: types.string,
  time: types.string,
  description: types.maybe(types.string),
  icon: types.string,
  size: types.string,
  data: types.frozen
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
