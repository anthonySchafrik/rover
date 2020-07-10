const {
  Thermometer,
  Barometer,
  Altimeter,
  Sensor,
  Expander,
  Board,
  Expander,
} = require('johnny-five');

const HumiditySensor = require('node-dht-sensor').promises;

const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;

const virtual = new Board.Virtual(new Expander('ADS1115'));
virtual.io.REGISTER.PIN_DATA = 0xc3;
virtual.io.REGISTER.PIN[0] = 0xc1;

const controller = 'BMP180';
const freq = 5000;

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

const uvSensor = new Sensor({ pin: 'A0', freq, board: virtual });

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
  const { analog } = uvSensor;

  const voltage = analog * (3.3 / 1023.0);
  const humidity = await getHumidity();

  console.log(`  fahrenheit : ${fahrenheit.toFixed(2)} `);
  console.log(`  pressure   : ${(pressure / 3.386).toFixed(2)} `); // kpa to mercury inches
  console.log(`  humidity   : ${humidity}`);
  console.log(`  feet       : ${feet.toFixed(2)} `);
  console.log(`  meters     : ${meters.toFixed(2)}`);
  console.log(`  uv light   : ${(voltage / 0.1).toFixed(2)}`);

  try {
    // sendCurrentWeatherData({
    //   temperature: fahrenheit,
    //   pressure: pressure / 3.386,
    //   feet,
    //   meters,
    //   humidity,
    //   uvLight: voltage / 0.1,
    // });

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
