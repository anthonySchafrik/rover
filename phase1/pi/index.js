const Raspi = require('raspi-io').RaspiIO;
const { Board, Motor } = require('johnny-five');

const board = new Board({ io: new Raspi() });

board.on('ready', function () {
  const weatherStation = require('./weather-station/sensors');
  const { thermometer } = weatherStation.sensors;
  const { weatherOnDataEvent } = weatherStation.sensorFunctions;

  const motors = require('./motors/motor');
  const { driveF, driveB } = motors.motorFunctions;

  // const motor1 = new Motor({
  //   pins: {
  //     dir: 'P1-11',
  //     pwm: 'P1-12',
  //   },
  //   invertPWM: true,
  // });

  // const motor2 = new Motor({
  //   pins: {
  //     dir: 'P1-31',
  //     pwm: 'P1-32',
  //   },
  //   invertPWM: true,
  // });

  // const driveF = () => {
  //   motor1.forward(120);
  //   motor2.reverse(125);

  //   setTimeout(() => {
  //     motor1.stop();
  //     motor2.stop();
  //   }, 2000);
  // };

  // const driveB = () => {
  //   motor1.reverse(120);
  //   motor2.forward(125);

  //   setTimeout(() => {
  //     motor1.stop();
  //     motor2.stop();
  //   }, 2000);
  // };

  board.repl.inject({
    driveF,
    driveB,
  });

  thermometer.on('data', async () => {
    try {
      weatherOnDataEvent();
    } catch (error) {
      console.log('error in thermometer.on ', error);
    }
  });

  console.log(`Board ready, ${new Date()}`);
});
