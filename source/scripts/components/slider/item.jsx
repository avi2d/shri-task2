import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import SvgIcon from '../svg-icon';
import utils from '../../utils';
import { DEVICES_TYPES } from '../../constants/data-constants';

@inject('modals')
@observer
class SliderItem extends Component {
  constructor(props) {
    super(props);

    this.state = { point: null };

    this.onMouseDown = ({ pageX, pageY }) =>
      this.setState({ point: { x: pageX, y: pageY } });
    this.onTouchStart = ({ touches }) => {
      if (touches.length === 0) return;

      this.setState({
        point: { x: touches[0].clientX, y: touches[0].clientY }
      });
    };

    this.onMouseUp = type => ({ pageX, pageY, button }) => {
      const { point } = this.state;

      if (button !== 0) return;

      if (!point) return;

      if (pageX !== point.x || pageY !== point.y) {
        return;
      }

      if (type !== DEVICES_TYPES.scheduled) {
        this.props.modals.modalToggle(type);
      }
    };
    this.onTouchEnd = type => ({ touches }) => {
      const { point } = this.state;

      if (touches.length === 0) return;

      if (touches[0].clientX !== point.x || touches[0].clientY !== point.y) {
        return;
      }

      if (type !== DEVICES_TYPES.scheduled) {
        this.props.modals.modalToggle(type);
      }
    };
  }

  render() {
    const { turnedOn, type, className, title, stateInfo } = this.props;

    return (
      <div className="slider-item-wrapper">
        <div
          className={classNames('slider-item', className, type, {
            'turned-on': turnedOn
          })}
          title={title}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onMouseUp={this.onMouseUp(type)}
          onTouchEnd={this.onTouchEnd(type)}
        >
          <div className="slider-item-header">
            <SvgIcon id={utils.defineIcon(type, turnedOn)} />
          </div>
          <div className="slider-item-content">
            <div className="content-title">{title}</div>
            {stateInfo && <div className="content-state-info">{stateInfo}</div>}
          </div>
        </div>
      </div>
    );
  }
}

SliderItem.propTypes = {
  turnedOn: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(DEVICES_TYPES)),
  className: PropTypes.string,
  title: PropTypes.string,
  stateInfo: PropTypes.string,
  modals: PropTypes.object
};

export default SliderItem;
