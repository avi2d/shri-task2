import classNames from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import Button from "./button";

@inject("modals")
@observer
class Modal extends Component {
  constructor(props) {
    super(props);

    const { stateClear, modalToggle, active } = props.modals;

    this.componentWillUnmount = () => stateClear();

    this.onModalToggle = () => modalToggle(active);
  }

  render() {
    const {
      modals: { active },
      type,
      children
    } = this.props;
    const opened = type === active;

    return (
      <div className={classNames("modal-wrapper", "modal-effect", { opened })}>
        <div className={classNames("modal")}>
          <div className="modal-content">{children}</div>
          <div className="modal-footer">
            <Button shStyle="primary" onClick={this.onModalToggle}>
              Применить
            </Button>
            <Button onClick={this.onModalToggle}>Закрыть</Button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  modals: PropTypes.object,
  children: PropTypes.node
};

export default Modal;
