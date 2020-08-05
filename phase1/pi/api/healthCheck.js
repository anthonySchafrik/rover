const api = require('./api');

const healthCheck = () => {
  return api.get('/health');
};

module.exports = { healthCheck };
