import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Modal from '../components/modal';
import InputRange from '../components/input-range';

@inject('modals')
@observer
class App extends Component {
  constructor(props) {
    super(props);

    const { modalToggle } = props.modals;

    this.modalOpen = () => modalToggle('testType');
  }

  render() {
    return (
      <div>
        <Modal type="testType">
          <InputRange type="lighting" />
          <InputRange type="temperature" min="-10" max="+35" />
        </Modal>
        <button onClick={this.modalOpen}>Open modal</button>
      </div>
    );
  }
}

App.propTypes = {
  modals: PropTypes.object
};

export default App;
