const { Board } = require('johnny-five');

const board = new Board({ port: 'COM3' });

board.on('ready', function () {
  const weatherStation = require('./weather-station/sensors');
  const { thermometer } = weatherStation.sensors;
  const { weatherOnDataEvent } = weatherStation.sensorFunctions;

  thermometer.on('data', () => {
    weatherOnDataEvent();
  });
});
