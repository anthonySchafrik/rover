const Logger = require('js-logger');

const healthCheck = (req, res) => {
  Logger.warn('Health check coming on');

  res.sendStatus(200);
};

module.exports = { healthCheck };
