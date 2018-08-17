import React from 'react';

import { SvgIcon, Slider } from '../../components';
import { FAVORITES_SCENARIOS } from '../../constants/data-constants';

const MainWidget = () => (
  <div className="main-widget">
    <div className="widget-header">
      <span className="widget-header-title">Главное</span>
    </div>
    <div className="widget-content">
      <div className="widget-content-main-info">
        <div className="greeting">Привет, Геннадий!</div>
        <div className="state-info">Двери и окна закрыты, сигнализация включена.</div>
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
        data={FAVORITES_SCENARIOS}
        settings={{
          vertical: true,
          swipeToSlide: true,
          verticalSwiping: true,
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 1320,
              settings: {
                vertical: false,
                verticalSwiping: false,
              }
            },
            {
              breakpoint: 800,
              settings: {
                vertical: false,
                verticalSwiping: false,
                slidesToShow: 4,
              }
            },
          ]
        }}
      />
    </div>
  </div>
);

export default MainWidget;
