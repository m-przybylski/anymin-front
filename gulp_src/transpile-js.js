var config      = require('../build.config');
var sourcemaps = require('gulp-sourcemaps');
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var annotate    = require('gulp-ng-annotate');
var plumber     = require('gulp-plumber');
var eslint      = require('gulp-eslint');
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
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(annotate())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.compile_dir))
        .pipe(connect.reload());

});

gulp.task('eslinter' , ['eslinter-js', 'eslinter-jsunit'])

gulp.task('eslinter-js', function () {
  return gulp.src([
    'src/**/*.js',
    '!src/**/*.spec.js',
    '!src/assets/gitcommit.js'
  ])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('eslinter-jsunit', function () {
  return gulp.src([
    'src/**/*.spec.js'
  ])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
