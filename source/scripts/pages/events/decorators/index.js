import React from 'react';

import EventsService from '../services/eventsService';

const addEvents = WrappedComponent => {
  return class EventsServiceHoc extends React.Component {
    render() {
      return <WrappedComponent {...this.props} events={new EventsService()} />;
    }
  };
};

export { addEvents };
