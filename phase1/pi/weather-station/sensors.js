const {
  Thermometer,
  Barometer,
  Altimeter,
  Sensor,
  Expander,
  Board,
} = require('johnny-five');

const HumiditySensor = require('node-dht-sensor').promises;
const sendCurrentWeatherData = require('../api/weather').sendCurrentWeatherData;
const handleFailedWeatherApiPost = require('../uitl/handleFailApi')
  .handleFailedWeatherApiPost;

// if api call fails data gets stored and flag get set
var hasWeatherDataToSend = false;
var storedWeatherData = [];

const virtual = new Board.Virtual(new Expander('ADS1115'));
virtual.io.REGISTER.PIN_DATA = 0xc3;
virtual.io.REGISTER.PIN[0] = 0xc1;

const controller = 'BMP180';
const freq = 30000 //300000;

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
    const res = await HumiditySensor.read(22, 16);
    
    return res.humidity.toFixed(2);
  } catch (err) {
    console.error('  Failed to read Humidity Sensor data:', err);

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

  // try {
  //   await sendCurrentWeatherData([
  //     {
  //       temperature: fahrenheit.toFixed(2),
  //       pressure: (pressure / 3.386).toFixed(2),
  //       feet: feet.toFixed(2),
  //       meters: meters.toFixed(2),
  //       humidity,
  //       uvLight: (voltage / 0.1).toFixed(2),
  //     },
  //   ]);

  //   if (hasWeatherDataToSend) {
  //     const returnedWeatherData = await handleFailedWeatherApiPost(
  //       storedWeatherData
  //     );

  //     console.log({ returnedWeatherData });

  //     if (
  //       returnedWeatherData !== undefined &&
  //       returnedWeatherData.status === 200
  //     ) {
  //       console.log('  Stored weather data sent');

  //       storedWeatherData = [];
  //     } else {
  //       storedWeatherData = returnedWeatherData.data;
  //     }
  //   }

  //   console.log('  weather data sent');
  // } catch (error) {
  //   console.log(`  Error when sending weatherData => ${error}`);

  //   storedWeatherData.push({
  //     temperature: fahrenheit.toFixed(2),
  //     pressure: (pressure / 3.386).toFixed(2),
  //     feet: feet.toFixed(2),
  //     meters: meters.toFixed(2),
  //     humidity,
  //     uvLight: (voltage / 0.1).toFixed(2),
  //     timecolumn: new Date(),
  //   });

  //   hasWeatherDataToSend = true;

  //   console.log('  weather data failed to send');
  // }
  // console.log(`  ${new Date()}`);
  console.log('--------------------------------------');
};

module.exports = {
  sensors: { thermometer, barometer, altimeter, uvSensor },
  sensorFunctions: {
    weatherOnDataEvent,
  },
};
