import * as React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Slider from 'react-slick';

const DEFAULT_SETTINGS = {
  arrows: false,
  infinite: false,
  variableWidth: true,
  swipe: true,
  swipeToSlide: true,
  speed: 100,
  touchThreshold: 15
};

interface IDataItem {
  label: string;
  value: number;
}

interface IProps {
  vertical?: boolean;
  swipable?: boolean;
  defaultValue: IDataItem;
  data: IDataItem[];
}

interface IState {
  selectedValue: IDataItem;
}

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
          {data.map(({ label, value }, index) => (
            <div key={value} className="item-wrapper">
              <li
                className={classNames({
                  selected: index === selectedValue.value
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
        {data.map(({ label, value }, index) => (
          <li
            key={value}
            className={classNames({ selected: index === selectedValue.value })}
          >
            {label}
          </li>
        ))}
      </ul>
    );
  }
}

export default FiltersList;
