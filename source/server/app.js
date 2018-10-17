const express = require('express');
const cors = require('cors');
const path = require('path');

const swaggerMiddleware = require('./middlewares/swagger');
const eventsController = require('./controllers/events');

const app = express();
const port = process.env.PORT || 5001;

global.serverStartTime = null;

app.use(cors());
app.use(swaggerMiddleware);

eventsController(app);
app.use('/static', express.static(path.join(__dirname, './static')));

app.listen(port, () => {
  global.serverStartTime = Date.now();

  console.log(`Listening on port ${port}`);
});
