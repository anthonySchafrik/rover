const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const Logger = require('js-logger');

const healthRouter = require('./src/routes/healthRouter');
const sensorRouter = require('./src/routes/sensorRouter');

Logger.useDefaults({
  defaultLevel: Logger.INFO,
  formatter: function (messages, context) {
    messages.unshift(new Date().toString());
  },
});

dotenv.config({
  path: path.join(__dirname, '.env'),
});

const app = express();

const port = process.env.PORT;
const apiBase = process.env.API_BASE;

app.use(bodyParser.json());

app.use(apiBase, healthRouter);
app.use(apiBase, sensorRouter);

app.post(`${apiBase}/logger`, (req, res) => {
  const loggerLevel = req.body.loggerLevel;

  console.log(`Changing logger level to ${loggerLevel}`);

  Logger.setLevel(Logger[loggerLevel]);

  res.sendStatus(200);
});

app.listen(port, () => {
  Logger.info(`server listing on port ${port}`);
});
