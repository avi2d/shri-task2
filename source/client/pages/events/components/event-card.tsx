import _ from 'lodash';
import * as React from 'react';
import { SvgIcon, EllipsisWrapper } from 'components';

import EventsSources from './events-sources';
import {
  EVENT_VALID_SOURCES,
  EventCardType
} from '../constants/data-constants';
import { IEvent } from '../stores/events';

class EventCard extends React.Component<IEvent> {
  static defaultProps = {
    type: EventCardType.info
  };

  renderData(source: string, data: object) {
    if (!source || !data) return null;

    const sourceObject = _.find(EVENT_VALID_SOURCES, { key: source });

    if (!sourceObject || !sourceObject.fields || !sourceObject.component) {
      return null;
    }

    const component = (EventsSources as any)[sourceObject.component];

    if (!component) return null;

    return (
      <div className="content-data">{React.createElement(component, data)}</div>
    );
  }

  render() {
    const {
      size,
      type,
      icon,
      title,
      source,
      time,
      description,
      data
    } = this.props;

    return (
      <div className={`event-card ${size}-size ${type}-type`}>
        <div className="event-card-header">
          <div className="header-title" title={title}>
            <SvgIcon id={icon} />
            <EllipsisWrapper className="header-title-text" text={title} />
          </div>
          <div className="header-info">
            <div className="header-info-source">{source}</div>
            <div className="header-info-time">{time}</div>
          </div>
        </div>
        {description && (
          <div className="event-card-content">
            <div className="content-description">{description}</div>
            {this.renderData(source, data)}
          </div>
        )}
        <button className="event-card-cross-button">
          <SvgIcon id="cross" />
        </button>
        <button className="event-card-next-button">
          <SvgIcon id="next" />
        </button>
      </div>
    );
  }
}

export default EventCard;
