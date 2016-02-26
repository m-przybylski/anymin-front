var readline    = require('readline');
var runSequence = require('run-sequence');
var chalk       = require('chalk');
var config      = require('../build.config');

if (config.variables.wait) {

  console.log(chalk.white.bgGreen('[MANUAL TASK] Manual task watcher had been turned on'));

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', function (line) {
    try {
      runSequence(line);
      console.log(chalk.white.bgGreen('[MANUAL TASK] Running ' + line + ' task'));
    } catch (e) {
      console.log(chalk.white.bgRed('[MANUAL TASK] Task ' + line + ' not found'));
    }
  });

}