
var config = require('../build.config');
var arguments = require('./variables').arguments;

var gulp = require('gulp');
var copy = require('gulp-copy');
var gulpif = require('gulp-if');
var assets = config.app_files.assets;

assets = assets.concat(config.vendor_files.assets);

gulp.task('move-assets', function() {
    return gulp.src(assets).pipe(gulp.dest(config.compile_dir + '/assets'));
});

gulp.task('copy-angular-i18', function() {
    return gulp.src('vendor/angular-i18n/**').pipe(gulp.dest(config.compile_dir + '/assets/angular-i18n'));
});


gulp.task('vendor-js', function() {
    return gulp.src(config.vendor_files.js).pipe(gulpif(!arguments.production, copy(config.compile_dir)));
});

gulp.task('copy-assets', [
    'move-assets',
    'copy-angular-i18',
    'vendor-js'
]);


