import * as React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Slider, { Settings } from 'react-slick';
import { observer } from 'mobx-react';

import { IFilter } from '../stores/devices';

const DEFAULT_SETTINGS: Settings = {
  arrows: false,
  infinite: false,
  variableWidth: true,
  swipe: true,
  swipeToSlide: true,
  speed: 100,
  touchThreshold: 15
};

interface IProps {
  vertical?: boolean;
  swipable?: boolean;
  defaultValue: IFilter;
  data: IFilter[];
}

interface IState {
  selectedValue: IFilter;
}

@observer
class FiltersList extends React.Component<IProps, IState> {
  static defaultProps = {
    vertical: false,
    swipable: false
  };

  state = {
    selectedValue: this.props.defaultValue
  };

  render() {
    const { selectedValue } = this.state;
    const { vertical, swipable, data } = this.props;

    if (vertical) {
      return (
        <Select
          isSearchable={false}
          classNamePrefix="react-select"
          className="filters-list vertical"
          value={selectedValue}
          options={data}
        />
      );
    }

    if (swipable) {
      return (
        <Slider
          {...DEFAULT_SETTINGS}
          className={classNames('filters-list', { swipable })}
        >
          {data.map(({ label, id }, index) => (
            <div key={id} className="item-wrapper">
              <li
                className={classNames({
                  selected: index === selectedValue.id
                })}
              >
                {label}
              </li>
            </div>
          ))}
        </Slider>
      );
    }

    return (
      <ul className="filters-list">
        {data.map(({ label, id }, index) => (
          <li
            key={id}
            className={classNames({ selected: index === selectedValue.id })}
          >
            {label}
          </li>
        ))}
      </ul>
    );
  }
}

export default FiltersList;
