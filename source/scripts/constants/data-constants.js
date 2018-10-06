/* eslint camelcase: 0 */

import eventImage1 from '../../assets/events/event-image1.jpg';
import eventImage1_2x from '../../assets/events/event-image1@2x.jpg';
import eventImage1_3x from '../../assets/events/event-image1@3x.jpg';
import eventImage1_webp from '../../assets/events/event-image1.webp';
import eventImage1_webp_2x from '../../assets/events/event-image1@2x.webp';
import eventImage1_webp_3x from '../../assets/events/event-image1@3x.webp';
import eventImage2 from '../../assets/events/event-image2.svg';

export const DEVICES_DATA = [
  {
    turnedOn: true,
    title: 'Выключить весь свет в доме и во дворе',
    type: 'lighting',
    stateInfo: 'Начнется в 18:00'
  },
  {
    title: 'Я ухожу',
    type: 'scheduled'
  },
  {
    turnedOn: false,
    title: 'Включить свет в коридоре',
    type: 'lighting'
  },
  {
    turnedOn: true,
    title: 'Набрать горячую ванну',
    type: 'temperature',
    stateInfo: 'Начнется в 18:00'
  },
  {
    turnedOn: true,
    title: 'Сделать пол тёплым во всей квартире',
    type: 'temperature-circular',
    stateInfo: 'Начнется в 18:00'
  },
  {
    turnedOn: true,
    title: 'Сделать пол тёплым во всей квартире',
    type: 'temperature-circular'
  },
  {
    turnedOn: true,
    title: 'Сделать пол тёплым во всей квартире',
    type: 'temperature-circular',
    stateInfo: 'Начнется в 18:00'
  },
  {
    turnedOn: true,
    title: 'Сделать пол тёплым во всей квартире',
    type: 'temperature-circular'
  },
  {
    turnedOn: true,
    title: 'Сделать пол тёплым во всей квартире',
    type: 'temperature-circular'
  },
  {
    turnedOn: true,
    title: 'Сделать пол тёплым во всей квартире',
    type: 'temperature-circular'
  }
];

export const EVENTS_DATA = [
  {
    type: 'info',
    title: 'Еженедельный отчет по расходам ресурсов',
    source: 'Сенсоры потребления',
    time: '19:00, Сегодня',
    description:
      'Так держать! За последнюю неделю вы потратили на 10% меньше ресурсов, чем неделей ранее.',
    icon: 'stats',
    size: 'large',
    data: {
      image: eventImage2
    }
  },
  {
    type: 'info',
    title: 'Дверь открыта',
    source: 'Сенсор входной двери',
    time: '18:50, Сегодня',
    description: null,
    icon: 'key',
    size: 'small'
  },
  {
    type: 'info',
    title: 'Уборка закончена',
    source: 'Пылесос',
    time: '18:45, Сегодня',
    description: null,
    icon: 'robot-cleaner',
    size: 'small'
  },
  {
    type: 'info',
    title: 'Новый пользователь',
    source: 'Роутер',
    time: '18:45, Сегодня',
    description: null,
    icon: 'router',
    size: 'small'
  },
  {
    type: 'info',
    title: 'Изменен климатический режим',
    source: 'Сенсор микроклимата',
    time: '18:30, Сегодня',
    description: 'Установлен климатический режим «Фиджи»',
    icon: 'thermal',
    size: 'medium',
    data: {
      temperature: 24,
      humidity: 80
    }
  },
  {
    type: 'critical',
    title: 'Невозможно включить кондиционер',
    source: 'Кондиционер',
    time: '18:21, Сегодня',
    description: 'В комнате открыто окно, закройте его и повторите попытку',
    icon: 'ac',
    size: 'medium'
  },
  {
    type: 'info',
    title: 'Музыка включена',
    source: 'Яндекс.Станция',
    time: '18:16, Сегодня',
    description: 'Сейчас проигрывается:',
    icon: 'music',
    size: 'medium',
    data: {
      albumcover:
        'https://avatars.yandex.net/get-music-content/193823/1820a43e.a.5517056-1/m1000x1000',
      artist: 'Florence & The Machine',
      track: {
        name: 'Big God',
        length: '4:31'
      },
      volume: 80
    }
  },
  {
    type: 'info',
    title: 'Заканчивается молоко',
    source: 'Холодильник',
    time: '17:23, Сегодня',
    description:
      'Кажется, в холодильнике заканчивается молоко. Вы хотите добавить его в список покупок?',
    icon: 'fridge',
    size: 'medium',
    data: {
      buttons: ['Да', 'Нет']
    }
  },
  {
    type: 'info',
    title: 'Зарядка завершена',
    source: 'Оконный сенсор',
    time: '16:22, Сегодня',
    description: 'Ура! Устройство «Оконный сенсор» снова в строю!',
    icon: 'battery',
    size: 'small'
  },
  {
    type: 'critical',
    title: 'Пылесос застрял',
    source: 'Сенсор движения',
    time: '16:17, Сегодня',
    description:
      'Робопылесос не смог сменить свое местоположение в течение последних 3 минут. Похоже, ему нужна помощь.',
    icon: 'cam',
    data: {
      image: eventImage1,
      image2x: eventImage1_2x,
      image3x: eventImage1_3x,
      imageWebp: eventImage1_webp,
      imageWebp2x: eventImage1_webp_2x,
      imageWebp3x: eventImage1_webp_3x
    },
    size: 'large'
  },
  {
    type: 'info',
    title: 'Вода вскипела',
    source: 'Чайник',
    time: '16:20, Сегодня',
    description: null,
    icon: 'kettle',
    size: 'small'
  }
];

export const FILTERS = [
  { value: 0, label: 'Все' },
  { value: 1, label: 'Кухня' },
  { value: 2, label: 'Зал' },
  { value: 3, label: 'Лампочки' },
  { value: 4, label: 'Камеры' }
];

export const DEVICES_TYPES = {
  lighting: 'lighting',
  temperature: 'temperature',
  temperatureCircular: 'temperature-circular',
  scheduled: 'scheduled'
};
