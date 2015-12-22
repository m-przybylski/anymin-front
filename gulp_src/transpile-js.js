var config      = require('../build.config');

var gulp        = require('gulp');
var babel       = require('gulp-babel');
var annotate    = require('gulp-ng-annotate');
var plumber     = require('gulp-plumber');
var cache       = require('gulp-cached');
var connect     = require('gulp-connect');


gulp.task('transpile-scripts', function() {

    return gulp.src(config.app_files.js)
        .pipe(plumber(function(error) {
            if (config.variables.production) {
                throw new Error(error.message);
            }
        }))
        .pipe(cache('coffeeBuild'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(annotate())
        .pipe(gulp.dest(config.compile_dir))
        .pipe(connect.reload());

});