import express from 'express';
import cors from 'cors';
import path from 'path';

import swaggerMiddleware from './middlewares/swagger';
import eventsController from './controllers/events';
import devicesController from './controllers/devices';

const app = express();
const port = 5001;

app.use(cors());
app.use(swaggerMiddleware);
app.use('/static', express.static(path.join(__dirname, './static')));

eventsController(app);
devicesController(app);

app.listen(port, () => {
  app.set('serverStartTime', Date.now());

  console.log(`Listening on port ${port}`);
});
