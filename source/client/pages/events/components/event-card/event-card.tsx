import _ from 'lodash';
import * as React from 'react';
import { SvgIcon, EllipsisWrapper } from 'components';
import { cn } from '@bem-react/classname';

import EventsSources from '../events-sources';
import {
  EVENT_VALID_SOURCES,
  EventCardType
} from '../../constants/data-constants';
import { IEvent } from '../../stores/events';
import './event-card.less';

const block = cn('EventCard');

interface IProps extends IEvent {
  className?: string;
}

class EventCard extends React.Component<IProps> {
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
      <div className={block('ContentData')}>
        {React.createElement(component, data)}
      </div>
    );
  }

  render() {
    const {
      size,
      type,
      icon,
      title,
      className,
      source,
      time,
      description,
      data
    } = this.props;

    return (
      <div className={block({ size, type }, [className])}>
        <div className={block('Header')}>
          <div className={block('HeaderTitle')} title={title}>
            <SvgIcon id={icon} className={block('HeaderTitleSvgIcon')} />
            <EllipsisWrapper
              className={block('HeaderTitleText')}
              text={title}
            />
          </div>
          <div className={block('HeaderInfo')}>
            <div className={block('HeaderInfoSource')}>{source}</div>
            <div className={block('HeaderInfoTime')}>{time}</div>
          </div>
        </div>
        {description && (
          <div className={block('Content')}>
            <div className={block('ContentDescription')}>{description}</div>
            {this.renderData(source, data)}
          </div>
        )}
        <button className={block('CrossButton')}>
          <SvgIcon id="cross" className={block('CrossButtonSvgIcon')} />
        </button>
        <button className={block('NextButton')}>
          <SvgIcon id="next" className={block('NextButtonSvgIcon')} />
        </button>
      </div>
    );
  }
}

export { block as cnEventCard, IProps as IEventCardProps, EventCard };
