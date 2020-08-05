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

$.ajax({
  type: 'POST',
  url: '~/UltrasonicRanging.py',
  data: {},
}).done(function (o) {
  console.log(o);
});
