/* 
  THIS IS JUST A TEST/IDEA PLAYGROUND NOTHING MORE
*/

const { Board, Proximity } = require('johnny-five');

// board for mac
// const board = new Board();
// board for windows
const board = new Board({ port: 'COM3' });

board.on('ready', function () {
  const proximity = new Proximity({
    controller: 'HCSR04',
    pin: 7,
  });

  proximity.on('change', () => {
    const { centimeters, inches } = proximity;
    console.log('Proximity: ');
    console.log('  cm  : ', centimeters);
    console.log('  in  : ', inches);
    console.log('-----------------');
  });
});
