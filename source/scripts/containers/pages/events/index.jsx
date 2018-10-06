import React from 'react';
import { EventCard } from '../../../components';
import { EVENTS_DATA } from '../../../constants/data-constants';

const EventsPage = () => (
  <div className="events-page">
    <div className="page-title">Лента событий</div>
    <div className="page-content">
      {EVENTS_DATA.map((event, index) => (
        <EventCard {...event} key={index} />
      ))}
    </div>
  </div>
);

export default EventsPage;
