import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react/index";

import { InputRange, FiltersList, SvgIcon } from "../components";
import utils from "../utils";
import { DEVICES_TYPES } from "../constants/data-constants";

@inject("windowSize")
@observer
class DeviceForm extends Component {
  render() {
    const {
      type,
      title,
      scheduleInfo,
      filters,
      devicePrevState,
      windowSize: { isWidthLowerThen500 }
    } = this.props;

    return (
      <div className="device-form">
        <div className="device-form-header">
          <div className="header-title">{title}</div>
          {!isWidthLowerThen500 && (
            <div className="header-prev-state">
              <span className="header-prev-state-value">{devicePrevState}</span>
              <SvgIcon id={utils.defineIcon(type)} />
            </div>
          )}
        </div>
        <div className="device-schedule-info">{scheduleInfo}</div>
        {type !== DEVICES_TYPES.temperatureCircular && (
          <FiltersList swipable data={filters} defaultValue={filters[0]} />
        )}
        <div className="device-form-content">
          <InputRange vertical={isWidthLowerThen500} type={type} />
        </div>
      </div>
    );
  }
}

DeviceForm.propTypes = {
  windowSize: PropTypes.object,
  filters: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  scheduleInfo: PropTypes.string.isRequired,
  devicePrevState: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DeviceForm;
