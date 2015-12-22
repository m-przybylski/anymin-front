
var buildConfig = require('../build.config.js');
var pkg = require('../package.json');
var argv = require('yargs').argv;

GLOBAL.coffeeOK = true;

module.exports = {
    "arguments": {
        tests: (typeof argv.tests === "undefined") || (argv.tests === true) ? true : false,
        docs: (typeof argv.docs === "undefined") || (argv.docs === true) ? true : false,
        uglify: (typeof argv.uglify === "undefined") || (argv.uglify === true) ? true : false,
        production: false,
        b2d: false,
        jadeCache: true
    }
};
