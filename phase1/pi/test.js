// var gpiop = require('rpi-gpio').promise;

// gpiop
//   .setup(7, gpiop.DIR_OUT)
//   .then(() => {
//     return gpiop.write(7, true);
//   })
//   .then(() => {
//     setTimeout(() => {
//       return gpiop.write(7, false);
//     }, 5000);
//   })
//   .catch((err) => {
//     console.log('Error: ', err.toString());
//   });

let { PythonShell } = require('python-shell');

// let pyshell = new PythonShell('./UltrasonicRanging.py', { mode: 'text' });

// pyshell.on('message', function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
//   console.log(message);
// });
const t = PythonShell.run(
  './UltrasonicRanging.py',
  { mode: 'text', pythonOptions: ['-u'] },
  function (err, results) {
    if (err) throw err;
    console.log(results);
    console.log('finished');
  }
);

module.exports.t;

/* 

"dependencies": {
    "axios": "^0.19.2",
    "dotenv": "^8.2.0",
    "johnny-five": "^2.0.0",
    "node-dht-sensor": "^0.4.2",
    "onoff": "^6.0.0",
    "path": "^0.12.7",
    "pi-io": "^1.1.0",
    "proximity-hcsr04": "^0.1.0",
    "python-shell": "^2.0.1",
    "raspi-io": "^11.0.0",
    "rpi-gpio": "^2.1.7"
  }


*/
