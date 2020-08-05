const { Motor } = require('johnny-five');
let { PythonShell } = require('python-shell');

let distance;

// setInterval(() => {
//   PythonShell.run(
//     './UltrasonicRanging.py',
//     { mode: 'text', pythonOptions: ['-u'] },
//     function (err, results) {
//       if (err) throw err;
//       distance = results[0];
//     }
//   );
// }, 500);

const leftMotor = new Motor({
  pins: {
    dir: 'P1-11',
    pwm: 'P1-12',
  },
  invertPWM: true,
});

const rightMotor = new Motor({
  pins: {
    dir: 'P1-31',
    pwm: 'P1-32',
  },
  invertPWM: true,
});

const stop = () => {
  leftMotor.stop();
  rightMotor.stop();
};

const driveF = () => {
  // PythonShell.run(
  //   './UltrasonicRanging.py',
  //   { mode: 'text', pythonOptions: ['-u'] },
  //   function (err, results) {
  //     if (err) throw err;
  //     distance = results[0];
  //   }
  // );

  // if (distance < 10) {
  //   console.log('too close');
  //   stop();
  //   return;
  // }

  rightMotor.forward(125);

  leftMotor.forward(150);

  setTimeout(() => {
    stop();
  }, 2000);
};

const driveB = () => {
  setTimeout(() => {
    leftMotor.reverse(125);
  }, 1);

  rightMotor.reverse(125);

  setTimeout(() => {
    stop();
  }, 2000);
};

const leftTurn = () => {
  rightMotor.forward(75);
  leftMotor.reverse(75);

  setTimeout(() => {
    stop();
  }, 1500);
};

const rightTurn = () => {
  rightMotor.reverse(75);
  leftMotor.forward(75);

  setTimeout(() => {
    stop();
  }, 1500);
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
  setInterval(() => {
    PythonShell.run(
      './UltrasonicRanging.py',
      { mode: 'text', pythonOptions: ['-u'] },
      function (err, results) {
        if (err) throw err;
        distance = results[0];
      }
    );

    console.log(distance);

    if (distance < 14) {
      console.log('back', distance);
      driveB();
    }

    if (distance > 15) {
      driveF();
    } else {
      leftTurn();
    }
  }, 1000);
};

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
  },
};
