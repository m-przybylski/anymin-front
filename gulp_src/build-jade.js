var config = require('../build.config');
var gulp = require('gulp');
var cache = require('gulp-cached');
var jade = require('gulp-jade');
var templateCache = require('gulp-angular-templatecache');
var remember = require('gulp-remember');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var deepcopy = require('deepcopy');
var cback = require('gulp-callback');
var consoleWarn = deepcopy(console.warn);
var connect = require('gulp-connect');

console.warn = function (args) {
  console.log(args);
  return process.exit();
};


gulp.task('compile-jade', function () {
  return gulp.src([
      config.app_files.jade_app_tpl,
      config.app_files.jade_common_tpl,
      config.app_files.jade_partials
    ])
    .pipe(gulpif(!config.variables.production && config.variables.jadeCache, cache('jade-templates')))
    .pipe(jade({
      client: false,
      pretty: true
    }))
    .pipe(gulpif(!config.variables.production && config.variables.jadeCache, remember('jade-templates')))
    .pipe(templateCache(config.tpl_name, {
      module: config.tpl_module,
      standalone: true,
      transformUrl: function (url) {
        return url.replace(/.html$/, '.tpl.html');
      }
    }))
    .pipe(gulp.dest(config.compile_dir))
    .pipe(connect.reload())
    .pipe(cback(function () {
      console.warn = consoleWarn;
      return config.variables.jadeCache = true;
    }));
});


