export enum DeviceType {
  lighting = 'lighting',
  temperature = 'temperature',
  temperatureCircular = 'temperature-circular',
  scheduled = 'scheduled'
}

export interface ISliderApi {
  slickPrev: () => void;
  slickNext: () => void;
}
