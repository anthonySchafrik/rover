const { Motor } = require('johnny-five');

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
  setTimeout(() => {
    rightMotor.forward(125);
  }, 1);

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
  },
};
