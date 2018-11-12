import * as React from 'react';
import { inject, observer, Observer } from 'mobx-react';
import { RegistryConsumer } from '@bem-react/di';
import { cn } from '@bem-react/classname';

import { IEvents } from './stores/events';
import {
  cnEventCard,
  IEventCardProps
} from './components/event-card/event-card';

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
          <RegistryConsumer>
            {registries => {
              const platform = registries.platform;
              const EventCard = platform.get<IEventCardProps>(cnEventCard());

              return (
                <Observer>
                  {() =>
                    data.map((event, index) => (
                      <EventCard
                        {...event}
                        key={index}
                        className={block('ContentEventCard', {
                          size: event.size
                        })}
                      />
                    ))
                  }
                </Observer>
              );
            }}
          </RegistryConsumer>
        </div>
      </div>
    );
  }
}

export default EventsPage;
