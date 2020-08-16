// /*
//   THIS IS JUST A TEST/IDEA PLAYGROUND NOTHING MORE
// */

// var five = require('johnny-five');
// var PiIO = require('pi-io');

// var board = new five.Board({
//   io: new PiIO(),
// });

// board.on('ready', function () {
//   var proximity = new five.Proximity({
//     controller: PiIO.HCSR04, // Custom controller
//     triggerPin: 'GPIO23',
//     echoPin: 'GPIO24',
//   });

//   proximity.on('change', function () {
//     console.log('cm: ', this.cm);
//   });
// });

const test = () => {
  console.log('fired');

  setTimeout(() => {
    console.log('setTimeout');
  }, 2000);
};

const auto = () => {
  setInterval(() => {
    console.log('setInterval');
    test();
  }, 4000);
};
