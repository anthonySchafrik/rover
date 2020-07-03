const { Thermometer, Barometer, Altimeter, Sensor } = require('johnny-five');
const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;

const controller = 'BMP180';
const freq = 300000;

const thermometer = new Thermometer({
  controller: 'MCP9808',
  freq,
});

const barometer = new Barometer({
  controller,
  freq,
});

const altimeter = new Altimeter({
  controller,
  freq,
});

const uvSensor = new Sensor({ pin: 'A0', freq });

const weatherOnDataEvent = async () => {
  const { fahrenheit } = thermometer;
  const { pressure } = barometer;
  const { feet, meters } = altimeter;
  const { value } = uvSensor;

  const voltage = value * (5.0 / 1023.0);

  console.log('  fahrenheit   : ', fahrenheit);
  console.log('  pressure     : ', pressure / 3.386); // kpa to mercury inches
  console.log('  feet         : ', feet);
  console.log('  meters       : ', meters);
  console.log('  uv light     : ', voltage / 0.1);

  try {
    sendCurrentWeatherData({
      temperature: fahrenheit,
      pressure: pressure / 3.386,
      feet,
      meters,
      uvLight: voltage / 0.1,
    });

    console.log('  weather data sent');
  } catch (error) {
    console.log('  weather data failed to send');
    console.log(error);
  }

  console.log('--------------------------------------');
};

module.exports = {
  sensors: { thermometer, barometer, altimeter, uvSensor },
  sensorFunctions: {
    weatherOnDataEvent,
  },
};
