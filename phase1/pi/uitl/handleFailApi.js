const healthCheck = require('../api/healthCheck').healthCheck;
const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;

// var t = setInterval(() => console.log('thig'), 5000)
// clearInterval(t)

const handleFailedApi = (dataToSend) => {
  if (dataToSend.length) {
    if (healthCheck()) {
      return dataToSend.map((data) => {
        try {
          sendCurrentWeatherData(data);
        } catch (error) {
          console.log(error);
          return data;
        }
      });
    }
  }
};

module.exports = { handleFailedApi };
