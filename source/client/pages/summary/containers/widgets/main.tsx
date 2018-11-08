import * as React from 'react';
import { SvgIcon } from 'components';

import { Slider } from '../../components';
import { IDevice } from '../../stores/devices';

interface IProps {
  devices: IDevice[];
}

const MainWidget: React.SFC<IProps> = ({ devices }) => (
  <div className="main-widget">
    <div className="widget-header">
      <span className="widget-header-title">Главное</span>
    </div>
    <div className="widget-content">
      <div className="widget-content-main-info">
        <div className="greeting">Привет, Геннадий!</div>
        <div className="state-info">
          Двери и окна закрыты, сигнализация включена.
        </div>
        <div className="temperature-info">
          <div className="inside">
            <div className="title">Дома</div>
            <div className="value">+23</div>
          </div>
          <div className="outside">
            <div className="title">За окном</div>
            <div className="value">
              +19
              <SvgIcon id="whether-state-cloud-drizzle" />
            </div>
          </div>
        </div>
      </div>
      <Slider
        data={devices}
        settings={{
          vertical: true,
          swipeToSlide: true,
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 1320,
              settings: {
                vertical: false,
                infinite: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                vertical: false,
                infinite: true,
                slidesToShow: 4
              }
            }
          ]
        }}
      />
    </div>
  </div>
);

export default MainWidget;
