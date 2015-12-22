
var fs = require('fs');
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var del = require('del');
var buildConfig = require('../build.config.js');

gulp.task('clean-all', function() {
    return del.sync([
        buildConfig.compile_dir
    ], {
        force: true
    })
});


