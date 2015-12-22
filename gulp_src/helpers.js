
var fs = require('fs');
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var buildConfig = require('../build.config.js');

gulp.task('clean-all', function() {
    return gulp.src(buildConfig.compile_dir, {
        read: false
    }).pipe(plumber()).pipe(rimraf({
        force: true
    }));
});


