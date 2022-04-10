const { Motor } = require('johnny-five');
let { PythonShell } = require('python-shell');

const timer = 2000;
let interval;

const leftMotor = new Motor({
  pins: {
    dir: 'P1-12',
    pwm: 'P1-11',
  },
  invertPWM: true,
});

const rightMotor = new Motor({
  pins: {
    dir: 'P1-32',
    pwm: 'P1-31',
  },
  invertPWM: true,
});

const stop = () => {
  leftMotor.stop();
  rightMotor.stop();
};

const driveF = () => {
  rightMotor.forward(125);

  leftMotor.forward(150);

  setTimeout(() => {
    stop();
  }, timer);
};

const driveB = () => {
  setTimeout(() => {
    leftMotor.reverse(125);
  }, 1);

  rightMotor.reverse(125);

  setTimeout(() => {
    stop();
  }, timer);
};

const leftTurn = () => {
  rightMotor.forward(100);
  leftMotor.reverse(100);

  setTimeout(() => {
    stop();
  }, 750);
};

const rightTurn = () => {
  rightMotor.reverse(100);
  leftMotor.forward(100);

  setTimeout(() => {
    stop();
  }, 750);
};

const motorDemo = () => {
  driveF();

  setTimeout(() => {
    leftTurn();
  }, 4000);

  setTimeout(() => {
    driveB();
  }, 6000);

  setTimeout(() => {
    rightTurn();
  }, 9000);

  setTimeout(() => {
    driveF();
  }, 11000);
};

const autoRoam = () => {
  let distance;
  let count = 0;
  interval = setInterval(async () => {
    // console.log('start of interval');
    await PythonShell.run(
      './motors/UltrasonicRanging.py',
      { mode: 'text', pythonOptions: ['-u'] },
      function (err, results) {
        if (err) throw err;
        distance = Number(results[0]);

        console.log('This is distance => ', distance);
        if (distance < 15) {
          console.log('back', distance);
          driveB();

          setTimeout(() => {
            if (Math.random() > 0.3) {
              leftTurn();
            } else {
              rightTurn();
            }
          }, 2500);
        } else {
          console.log('going fwd');
          driveF();
        }
        // console.log('end of function');
        // console.log(count);
        // count++;
        // console.log('------------------');
        // console.log('');
      }
    );
  }, 6000);
};

const stopRoam = () => clearInterval(interval);

module.exports = {
  motors: {
    rightMotor,
    leftMotor,
  },
  motorFunctions: {
    driveF,
    driveB,
    leftTurn,
    rightTurn,
    stop,
    motorDemo,
    autoRoam,
    stopRoam,
  },
};
