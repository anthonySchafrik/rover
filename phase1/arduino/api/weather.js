const api = require('./api');

const baseUrl = '/sensor/weather';

const sendCurrentWeatherData = (weatherData) => {
  return api.post(baseUrl, { weatherData });
};

module.exports = { sendCurrentWeatherData };
