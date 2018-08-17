import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Slider from 'react-slick';

const DEFAULT_SETTINGS = {
  arrows: false,
  infinite: false,
  variableWidth: true,
  swipe: true,
  swipeToSlide: true,
  speed: 500,
};

class FiltersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.defaultValue,
    };
  }

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
          className="filters-list"
        >
          {data.map(({ label, value }, index) => (
            <div key={value} className="item-wrapper">
              <li
                className={classNames({ selected: index === selectedValue.value })}
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

FiltersList.propTypes = {
  vertical: PropTypes.bool,
  swipable: PropTypes.bool,
  defaultValue: PropTypes.object,
  data: PropTypes.array.isRequired
};

FiltersList.defaultProps = {
  vertical: false,
};

export default FiltersList;

