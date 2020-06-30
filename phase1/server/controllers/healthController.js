const healthCheck = (req, res) => {
  console.log('health check coming in');
  res.sendStatus(200);
};

module.exports = { healthCheck };
