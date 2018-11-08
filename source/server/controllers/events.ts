import _ from 'lodash';
import * as Express from 'express';

import eventsController from '../services/events';

export default (app: Express.Application) => {
  /**
   * @swagger
   * /status:
   *   get:
   *     tags:
   *        - Events
   *     description: Возвращает время работы сервера
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Строка со временем в формате hh:mm:ss
   */
  app.get('/status', (req: Express.Request, res: Express.Response) => {
    res.send(eventsController.getServerWorkingTime(app.get('serverStartTime')));
  });

  /**
   * @swagger
   * /events:
   *   get:
   *     tags:
   *        - Events
   *     description: Возвращает список событий
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
   *         description: Тип события
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Массив событий
   */
  app.get('/events', async (req: Express.Request, res: Express.Response) => {
    const { offset, count, type } = _.get(req, 'query', {});

    res.send(await eventsController.getEvents(offset, count, type));
  });
};
