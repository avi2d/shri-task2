import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import EventCard from './components/event-card';

@inject('events')
@observer
class EventsPage extends Component {
  componentDidMount() {
    this.props.events.fetchEvents();
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

EventCard.propTypes = {
  events: PropTypes.object
};

export default EventsPage;
