import classNames from 'classnames';
import * as React from 'react';
import { SvgIcon } from 'components';
import { inject, observer } from 'mobx-react';
import { IModals } from 'stores/modals';

import { DeviceType } from '../../constants/data-constants';
import utils from '../../utils/index';

interface IProps {
  turnedOn: boolean;
  type: DeviceType;
  className?: string;
  title: string;
  stateInfo: string;
  modals: IModals;
}

interface IState {
  point: {
    x: number;
    y: number;
  };
}

@inject('modals')
@observer
class SliderItem extends React.Component<IProps, IState> {
  state = {
    point: { x: -1, y: -1 }
  };

  onMouseDown = ({ pageX, pageY }) => {
    this.setState({ point: { x: pageX, y: pageY } });
  };

  onTouchStart = ({ touches }) => {
    if (touches.length === 0) return;

    this.setState({
      point: { x: touches[0].clientX, y: touches[0].clientY }
    });
  };

  onMouseUp = type => ({ pageX, pageY, button }) => {
    const { point } = this.state;

    if (button !== 0) return;

    if (pageX !== point.x || pageY !== point.y) {
      return;
    }

    if (type !== DeviceType.scheduled) {
      this.props.modals.modalToggle(type);
    }
  };

  onTouchEnd = type => ({ touches }) => {
    const { point } = this.state;

    if (touches.length === 0) return;

    if (!point) return;

    if (touches[0].clientX !== point.x || touches[0].clientY !== point.y) {
      return;
    }

    if (type !== DeviceType.scheduled) {
      this.props.modals.modalToggle(type);
    }
  };

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

export default SliderItem;
