const express = require('express');
const cors = require('cors');
const path = require('path');

const swaggerMiddleware = require('./middlewares/swagger');
const eventsController = require('./controllers/events');

const app = express();
const port = 5001;

app.use(cors());
app.use(swaggerMiddleware);
app.use('/static', express.static(path.join(__dirname, './static')));

eventsController(app);

app.listen(port, () => {
  app.set('serverStartTime', Date.now());

  console.log(`Listening on port ${port}`);
});
