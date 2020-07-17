const healthCheck = require('../api/healthCheck').healthCheck;
const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;

const weatherPostApi = (dataToSend) => {
  return dataToSend.map(async (data) => {
    try {
      await sendCurrentWeatherData(data);
    } catch (error) {
      console.log(error);
      return data;
    }
  });
};

const handleFailedApi = (dataToSend) => {
  let setTimer = false;
  let apiTimer;

  if (dataToSend.length) {
    if (healthCheck()) {
      return weatherPostApi(dataToSend);
    } else {
      setTimer = true;

      apiTimer = setInterval(async () => {
        if (healthCheck()) {
          setTimer = false;

          clearInterval(apiTimer);

          return weatherPostApi(dataToSend);
        }
        console.log('healthCheck api down');
      }, 300000);
    }
  }
};

module.exports = { handleFailedApi };
