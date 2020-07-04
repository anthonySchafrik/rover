const Raspi = require('raspi-io').RaspiIO;
const { Board } = require('johnny-five');

const board = new Board({ io: new Raspi() });

board.on('ready', function () {
  const weatherStation = require('./weather-station/sensors');
  const { thermometer } = weatherStation.sensors;
  const { weatherOnDataEvent } = weatherStation.sensorFunctions;

  thermometer.on('data', () => {
    weatherOnDataEvent();
  });

  console.log(`Board ready, ${new Date()}`);
});
