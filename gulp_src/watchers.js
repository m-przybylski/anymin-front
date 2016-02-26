var config      = require('../build.config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var watch       = require('gulp-watch');
var chalk       = require('chalk');



gulp.task('watchers', function() {

    var jsWatchArgs = {
        source: config.app_files.js,
        tasks: ['eslinter-js', 'transpile-scripts']
    };

    if (config.variables.tests) {
        jsWatchArgs.tasks.push('run-tests-watch');
        jsWatchArgs.source = config.app_files.allJs;
    }

    var jsWatcher = gulp.watch(jsWatchArgs.source, function() {
        return runSequence(jsWatchArgs.tasks);
    });

    var jsunitWatcher = gulp.watch(config.app_files.jsunit, function() {
        return runSequence('eslinter-jsunit');
    });

    var jadeWatcher = gulp.watch(config.app_files.jade_all, function() {

    });

    var sassWatcher = gulp.watch(config.app_files.sass_all, function() {
        return runSequence('build-styles');
    });

    jsWatcher.on('change', function(e) {
        console.log(chalk.yellow('[JS] ' + chalk.yellow(e.path)));
    });

    jsWatcher.on('add', function(e) {
        setTimeout(function() {
            return runSequence('html-injector');
        }, 1000);
        console.log(chalk.yellow('[NEW JS FILE INJECTED] ' + chalk.yellow(e)));
    });

    sassWatcher.on('change', function(e) {
        console.log(chalk.yellow('[SASS] ' + chalk.yellow(e.path)));
    });

    jadeWatcher.on('change', function(e) {
        console.log(chalk.yellow('[JADE] ' + chalk.yellow(e.path)));
        if (e.path.match(/partial.jade/)) {
            config.variables.jadeCache = false;
            console.log(chalk.blue('[JADE] Partial file had been modified. Running JADE without cache'));
        }
        runSequence('compile-jade');
    });
});
