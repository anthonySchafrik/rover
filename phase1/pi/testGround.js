/* 
  THIS IS JUST A TEST/IDEA PLAYGROUND NOTHING MORE
*/

const { Board, Sensor } = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

// board for mac
// const board = new Board();
// board for windows
// const board = new Board({ port: 'COM3' });
// board for pi
const board = new Board({ io: new Raspi() });

board.on('ready', function () {
  console.log(`Board ready, ${new Date()}`);

  const uvSensor = new Sensor({ pin: 21, freq: 5000, type: 'digital' });

  uvSensor.on('data', () => {
    const { value } = uvSensor;

    const voltage = value * (5.0 / 1023.0);

    console.log('  uv light     : ', voltage / 0.1);
  });
});
