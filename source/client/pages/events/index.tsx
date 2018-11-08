import * as React from 'react';
import { inject, observer } from 'mobx-react';

import EventCard from './components/event-card';
import { IEvents } from './stores/events';

interface IProps {
  events: IEvents;
}

@inject('events')
@observer
class EventsPage extends React.Component<IProps> {
  async componentDidMount() {
    await this.props.events.fetchEvents();
  }

  render() {
    const { data } = this.props.events;

    return (
      <div className="events-page">
        <div className="page-title">Лента событий</div>
        <div className="page-content">
          {data.map((event, index) => (
            <EventCard {...event} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default EventsPage;
