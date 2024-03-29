// /*
//   THIS IS JUST A TEST/IDEA PLAYGROUND NOTHING MORE
// */

const Raspi = require('raspi-io').RaspiIO;
const { Animation, Board, Servo } = require('johnny-five');

const board = new Board({ io: new Raspi() });

board.on('ready', () => {
  // Create a new `servo` hardware instance.
  const servo = new Servo(23);

  // Create a new `animation` instance.
  const animation = new Animation(servo);

  // Enqueue an animation segment with options param
  // See Animation example and docs for details
  animation.enqueue({
    cuePoints: [0, 0.25, 0.75, 1],
    keyFrames: [
      90,
      { value: 180, easing: 'inQuad' },
      { value: 0, easing: 'outQuad' },
      90,
    ],
    duration: 2000,
  });

  // Inject the `servo` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    servo,
    animation,
  });
});
