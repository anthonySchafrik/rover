const { Thermometer, Barometer, Altimeter, Sensor } = require('johnny-five');
const HumiditySensor = require('node-dht-sensor').promises;

const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;

const controller = 'BMP180';
const freq = 5000;

const thermometer = new Thermometer({
  controller,
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

const uvSensor = new Sensor({ pin: 21, freq, type: 'digital' });

const getHumidity = async () => {
  try {
    const res = await HumiditySensor.read(22, 23);

    return res.humidity.toFixed(2);
  } catch (err) {
    console.error('Failed to read Humidity Sensor data:', err);

    return 0;
  }
};

const weatherOnDataEvent = async () => {
  const { fahrenheit } = thermometer;
  const { pressure } = barometer;
  const { feet, meters } = altimeter;
  const { value } = uvSensor;

  const voltage = value * (5.0 / 1023.0);
  const humidity = await getHumidity();

  console.log(`  fahrenheit : ${fahrenheit.toFixed(2)} `);
  console.log(`  pressure   : ${(pressure / 3.386).toFixed(2)} `); // kpa to mercury inches
  console.log(`  humidity   : ${humidity}`);
  console.log(`  feet       : ${feet.toFixed(2)} `);
  console.log(`  meters     : ${meters.toFixed(2)}`);
  console.log(`  uv light   : ${(voltage / 0.1).toFixed(2)}`);

  try {
    sendCurrentWeatherData({
      temperature: fahrenheit,
      pressure: pressure / 3.386,
      feet,
      meters,
      humidity,
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
