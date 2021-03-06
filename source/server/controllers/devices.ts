import _ from 'lodash';
import * as Express from 'express';

import devicesService from '../services/devices';

export default (app: Express.Application) => {
  /**
   * @swagger
   * /devices:
   *   get:
   *     tags:
   *        - Devices
   *     description: Возвращает список приборов
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: offset
   *         description: Смещение
   *         in: query
   *         required: false
   *         type: number
   *       - name: count
   *         description: Количество
   *         in: query
   *         required: false
   *         type: number
   *       - name: type
   *         description: Тип устройства
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Массив устройств
   */
  app.get('/devices', async (req: Express.Request, res: Express.Response) => {
    const { offset, count, type } = _.get(req, 'query', {});

    res.send(await devicesService.getDevices(offset, count, type));
  });

  /**
   * @swagger
   * /filters:
   *   get:
   *     tags:
   *        - Devices
   *     description: Возвращает список фильтров
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: offset
   *         description: Смещение
   *         in: query
   *         required: false
   *         type: number
   *       - name: count
   *         description: Количество
   *         in: query
   *         required: false
   *         type: number
   *     responses:
   *       200:
   *         description: Массив фильтров
   */
  app.get('/filters', async (req: Express.Request, res: Express.Response) => {
    const { offset, count } = _.get(req, 'query', {});

    res.send(await devicesService.getFilters(offset, count));
  });
};
