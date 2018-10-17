const _ = require('lodash');

const eventsController = require('../services/events');

module.exports = function(app) {
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
  app.get('/status', (req, res) => {
    res.send(eventsController.getServerWorkingTime(global.serverStartTime));
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
  app.get('/events', (req, res) => {
    const { offset, count, type } = _.get(req, 'query', {});

    res.send(eventsController.getEvents(offset, count, type));
  });
};
