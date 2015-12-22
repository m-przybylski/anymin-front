
var buildConfig = require('../build.config.js');
var pkg = require('../package.json');
var argv = require('yargs').argv;

GLOBAL.coffeeOK = true;

module.exports = {
    "arguments": {
        tests: !!((typeof argv.tests === "undefined") || (argv.tests === true)),
        docs: !!((typeof argv.docs === "undefined") || (argv.docs === true)),
        uglify: !!((typeof argv.uglify === "undefined") || (argv.uglify === true)),
        production: false,
        b2d: false,
        jadeCache: true
    }
};
