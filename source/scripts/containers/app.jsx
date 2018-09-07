import React, { Component, Fragment } from "react";

import { Modal } from "../components";
import { FILTERS, DEVICES_TYPES } from "../constants/data-constants";

import Layout from "./layout";
import MainWidget from "./widgets/main";
import ScenariosWidget from "./widgets/scenarios";
import DevicesWidget from "./widgets/devices";
import DeviceForm from "./device-form";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <MainWidget />
          <ScenariosWidget />
          <DevicesWidget />
          <div className="modal-overlay" />
        </Layout>
        <Modal type={DEVICES_TYPES.lighting}>
          <DeviceForm
            type={DEVICES_TYPES.lighting}
            title="Xiaomi Yeelight LED Smart Bulb"
            scheduleInfo="Включится в 17:00"
            filters={FILTERS}
          />
        </Modal>
        <Modal type={DEVICES_TYPES.temperature}>
          <DeviceForm
            type={DEVICES_TYPES.temperature}
            title="Elgato Eve Degree Connected"
            scheduleInfo="Включено"
            filters={FILTERS}
            devicePrevState="+23"
          />
        </Modal>
        <Modal type={DEVICES_TYPES.temperatureCircular}>
          <DeviceForm
            type={DEVICES_TYPES.temperatureCircular}
            title="Elgato Eve Degree Connected"
            scheduleInfo="Включено"
            filters={FILTERS}
            devicePrevState="+23"
          />
        </Modal>
      </Fragment>
    );
  }
}

export default App;
