const Raspi = require('raspi-io').RaspiIO;
const { Board } = require('johnny-five');

const board = new Board({ io: new Raspi() });

board.on('ready', function () {
  const weatherStation = require('./weather-station/sensors');
  // const { thermometer } = weatherStation.sensors;
  // const { weatherOnDataEvent } = weatherStation.sensorFunctions;

  const motors = require('./motors/motor');
  const { leftMotor, rightMotor } = motors.motors;
  const {
    // driveF,
    // driveB,
    // leftTurn,
    // rightTurn,
    stop,
    // motorDemo,
    // autoRoam,
    // stopRoam,
  } = motors.motorFunctions;

  board.repl.inject({
    // leftMotor,
    // rightMotor,
    // driveF,
    // driveB,
    // leftTurn,
    // rightTurn,
    // stop,
    // motorDemo,
    // autoRoam,
    // stopRoam,
  });

  // console.log(thermometer)

  // thermometer.on('data', async () => {
  //   try {
  //     weatherOnDataEvent();
  //   } catch (error) {
  //     console.log('error in thermometer.on ', error);
  //   }
  // });

  console.log(`Board ready, ${new Date()}`);
  // leftMotor.fwd(255);
  // rightMotor.fwd(255);
  
  
  // rightMotor.stop();
  // leftMotor.stop();
});
