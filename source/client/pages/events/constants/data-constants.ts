export const EVENT_VALID_SOURCES = [
  {
    key: 'Сенсоры потребления',
    component: 'ConsumptionSensor',
    fields: ['image']
  },
  {
    key: 'Сенсор входной двери',
    component: null,
    fields: null
  },
  {
    key: 'Пылесос',
    component: null,
    fields: null
  },
  {
    key: 'Роутер',
    component: null,
    fields: null
  },
  {
    key: 'Сенсор микроклимата',
    component: 'MicroclimateSensor',
    fields: ['temperature', 'humidity']
  },
  {
    key: 'Кондиционер',
    component: null,
    fields: null
  },
  {
    key: 'Яндекс.Станция',
    component: 'Station',
    fields: ['albumcover', 'artist', 'track', 'volume']
  },
  {
    key: 'Холодильник',
    component: 'Fridge',
    fields: ['buttons']
  },
  {
    key: 'Оконный сенсор',
    component: null,
    fields: null
  },
  {
    key: 'Сенсор движения',
    component: 'MotionSensor',
    fields: ['image']
  },
  {
    key: 'Чайник',
    component: null,
    fields: null
  }
];

export enum EventCardSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export enum EventCardType {
  info = 'info',
  critical = 'critical'
}
