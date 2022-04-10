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
