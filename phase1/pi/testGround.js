/* 
  THIS IS JUST A TEST/IDEA PLAYGROUND NOTHING MORE
*/

const { Board, Thermometer } = require('johnny-five');

// board for mac
const board = new Board();
// board for windows
// const board = new Board({ port: 'COM3' });

board.on('ready', function () {
  console.log(`Board ready, ${new Date()}`);
  const t = new Thermometer({
    controller: 'MCP9808',
    freq: 5000,
  });

  t.on('data', function () {
    console.log('celsius: %d', this.C);
    console.log('fahrenheit: %d', this.F);
    console.log('kelvin: %d', this.K);
  });
});
