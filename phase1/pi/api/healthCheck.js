const api = require('./api');

const healthCheck = () => {
  return api.post('/health');
};

module.exports = { healthCheck };
