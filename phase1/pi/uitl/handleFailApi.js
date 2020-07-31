const healthCheck = require('../api/healthCheck').healthCheck;
const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;

const handleFailedWeatherApiPost = async (dataToSend) => {
  if (dataToSend.length > 0) {
    if (healthCheck()) {
      try {
        return sendCurrentWeatherData(dataToSend);
      } catch (error) {
        console.log('error in handleFailedWeatherApiPost', error);
      }
    }
  }
};

module.exports = { handleFailedWeatherApiPost };
