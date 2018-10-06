import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SvgIcon } from '../components';
import EventsSources from './events-sources';
import EllipsisWrapper from './ellipsis-wrapper';

const CARD_SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};

const CARD_TYPE = {
  info: 'info',
  critical: 'critical'
};

const VALID_SOURCES = [
  {
    key: 'Сенсоры потребления',
    component: 'ConsumptionSensor',
    fields: ['image']
  },
  {
    key: 'Сенсор входной двери',
    component: null,
    fields: null
  },
  {
    key: 'Пылесос',
    component: null,
    fields: null
  },
  {
    key: 'Роутер',
    component: null,
    fields: null
  },
  {
    key: 'Сенсор микроклимата',
    component: 'MicroclimateSensor',
    fields: ['temperature', 'humidity']
  },
  {
    key: 'Кондиционер',
    component: null,
    fields: null
  },
  {
    key: 'Яндекс.Станция',
    component: 'Station',
    fields: ['albumcover', 'artist', 'track', 'volume']
  },
  {
    key: 'Холодильник',
    component: 'Fridge',
    fields: ['buttons']
  },
  {
    key: 'Оконный сенсор',
    component: null,
    fields: null
  },
  {
    key: 'Сенсор движения',
    component: 'MotionSensor',
    fields: ['image']
  },
  {
    key: 'Чайник',
    component: null,
    fields: null
  }
];

class EventCard extends Component {
  renderData(source, data) {
    if (!source || !data) return null;

    const sourceObject = _.find(VALID_SOURCES, { key: source });

    if (!sourceObject || !sourceObject.fields || !sourceObject.component) {
      return null;
    }

    const component = EventsSources[sourceObject.component];

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

EventCard.propTypes = {
  size: PropTypes.oneOf(Object.values(CARD_SIZE)),
  type: PropTypes.oneOf(Object.values(CARD_TYPE)),
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string,
  data: PropTypes.object
};

EventCard.defaultProps = {
  type: CARD_TYPE.info
};

export default EventCard;
