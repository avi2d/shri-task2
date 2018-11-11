import * as React from 'react';
import { inject, observer } from 'mobx-react';

import EventCard from './components/event-card';
import { IEvents } from './stores/events';
import { cn } from '@bem-react/classname';

const block = cn('EventsPage');

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
      <div className={block()}>
        <div className={block('Title')}>Лента событий</div>
        <div className={block('Content')}>
          {data.map((event, index) => (
            <EventCard
              {...event}
              key={index}
              className={block('ContentEventCard', { size: event.size })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default EventsPage;
