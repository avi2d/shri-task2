export const DEVICES_DATA = [
  {
    turnedOn: true,
    title: "Выключить весь свет в доме и во дворе",
    type: "lighting",
    stateInfo: "Начнется в 18:00"
  },
  {
    title: "Я ухожу",
    type: "scheduled"
  },
  {
    turnedOn: false,
    title: "Включить свет в коридоре",
    type: "lighting"
  },
  {
    turnedOn: true,
    title: "Набрать горячую ванну",
    type: "temperature",
    stateInfo: "Начнется в 18:00"
  },
  {
    turnedOn: true,
    title: "Сделать пол тёплым во всей квартире",
    type: "temperature-circular",
    stateInfo: "Начнется в 18:00"
  },
  {
    turnedOn: true,
    title: "Сделать пол тёплым во всей квартире",
    type: "temperature-circular"
  },
  {
    turnedOn: true,
    title: "Сделать пол тёплым во всей квартире",
    type: "temperature-circular",
    stateInfo: "Начнется в 18:00"
  },
  {
    turnedOn: true,
    title: "Сделать пол тёплым во всей квартире",
    type: "temperature-circular"
  },
  {
    turnedOn: true,
    title: "Сделать пол тёплым во всей квартире",
    type: "temperature-circular"
  },
  {
    turnedOn: true,
    title: "Сделать пол тёплым во всей квартире",
    type: "temperature-circular"
  }
];

export const FILTERS = [
  { value: 0, label: "Все" },
  { value: 1, label: "Кухня" },
  { value: 2, label: "Зал" },
  { value: 3, label: "Лампочки" },
  { value: 4, label: "Камеры" }
];

export const DEVICES_TYPES = {
  lighting: "lighting",
  temperature: "temperature",
  temperatureCircular: "temperature-circular",
  scheduled: "scheduled"
};
