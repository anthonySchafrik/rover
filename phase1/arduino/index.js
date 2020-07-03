const { Board } = require('johnny-five');

// board for mac
const board = new Board();
// board for windows
// const board = new Board({ port: 'COM3' });

board.on('ready', function () {
  const weatherStation = require('./weather-station/sensors');
  const { thermometer } = weatherStation.sensors;
  const { weatherOnDataEvent } = weatherStation.sensorFunctions;

  thermometer.on('data', () => {
    weatherOnDataEvent();
  });

  console.log(`Board ready, ${new Date()}`);
});
