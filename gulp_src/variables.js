var argv, buildConfig, pkg;

buildConfig = require('../build.config.coffee');

pkg = require('../package.json');

argv = require('yargs').argv;

GLOBAL.coffeeOK = true;

module.exports = {
    build: buildConfig,
    pkg: pkg,
    gulpDir: buildConfig.gulp_build_dir,
    buildDir: buildConfig.gulp_build_dir + '/build',
    testsDir: buildConfig.gulp_build_dir + '/tests',
    testsSrc: typeof argv['testing-dir'] === "undefined" ? buildConfig.gulp_build_dir + '/tests' : buildConfig.gulp_build_dir + '/tests/' + argv['testing-dir'],
    testsBuild: typeof argv['testing-dir'] === "undefined" ? buildConfig.gulp_build_dir + '/build' : buildConfig.gulp_build_dir + '/build/' + argv['testing-dir'],
    prod: {
        plain: buildConfig.gulp_build_dir + '/tmp/plain-js',
        jsNotAnnotated: [buildConfig.gulp_build_dir + '/tmp/plain-js/**/*.js', '!' + buildConfig.gulp_build_dir + '/tmp/plain-js/**/*.spec.js'],
        jsAnnotated: buildConfig.gulp_build_dir + '/tmp/build',
        build: buildConfig.gulp_build_dir + '/mid/not-annotated',
        buildNotAnnotated: buildConfig.gulp_build_dir + '/mid/not-annotated/**/*.js',
        buildAnnotated: buildConfig.gulp_build_dir + '/mid/build',
        buildTests: buildConfig.gulp_build_dir + '/mid/tests'
    },
    "arguments": {
        tests: (typeof argv.tests === "undefined") || (argv.tests === true) ? true : false,
        docs: (typeof argv.docs === "undefined") || (argv.docs === true) ? true : false,
        uglify: (typeof argv.uglify === "undefined") || (argv.uglify === true) ? true : false,
        production: false,
        b2d: false,
        jadeCache: true
    }
};
