const { Motor } = require('johnny-five');

const rightMotor = new Motor({
  pins: {
    dir: 'P1-11',
    pwm: 'P1-12',
  },
  invertPWM: true,
});

const leftMotor = new Motor({
  pins: {
    dir: 'P1-31',
    pwm: 'P1-32',
  },
  invertPWM: true,
});

const driveF = () => {
  motor1.forward(120);
  motor2.reverse(125);

  setTimeout(() => {
    motor1.stop();
    motor2.stop();
  }, 2000);
};

const driveB = () => {
  motor1.reverse(120);
  motor2.forward(125);

  setTimeout(() => {
    motor1.stop();
    motor2.stop();
  }, 2000);
};

module.exports = {
  motors: { rightMotor, leftMotor },
  motorFunctions: {
    driveF,
    driveB,
  },
};
