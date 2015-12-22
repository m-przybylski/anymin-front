var config = require('../build.config');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var karma = require('gulp-karma');
var babel = require('gulp-babel');

var karmaSettings = {
  basePath: '/',
  frameworks: ['jasmine'],
  plugins: [
    'karma-jasmine',
    'karma-coverage',
    'karma-mocha-reporter',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-safari-launcher',
    'karma-junit-reporter'
  ],
  reporters: [
    'mocha',
    'junit',
    'coverage'
  ],
  junitReporter: {
    outputDir: __dirname + '/../' + config.tests_dir + '/junit',
    suite: ''
  },
  port: 9018,
  runnerPort: 9100,
  preprocessors: {},
  urlRoot: '/',
  colors: true,
  autoWatch: true,
  singleRun: true,
  browsers: ['PhantomJS'],
  coverageReporter: {
    type: 'html'
  }
};

var vendorFiles = [];

config.vendor_files.js.forEach(function (val) {
  vendorFiles.push(__dirname + '/../' + val);
});

config.test_files.js.forEach(function (val) {
  vendorFiles.push(__dirname + '/../' + val);
});


gulp.task('build-tests', function () {
  return gulp.src(config.app_files.jsunit)
    .pipe(plumber(function (error) {
      if (arguments.production) {
        throw new Error(error.message);
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.tests_dir + '/build'));
});

gulp.task('run-karma', function (done) {
  var sources = [
    __dirname + '/../' + config.compile_dir + '/assets/gitcommit.js',
    __dirname + '/../' + config.compile_dir + '/app/**/*.js',
    __dirname + '/../' + config.compile_dir + '/common/**/*.js',
    __dirname + '/../' + config.compile_dir + '/' + config.tpl_name
  ];
  sources.push(__dirname + '/../' + config.tests_dir + "/build/**/*.js");
  var files = vendorFiles.concat(sources);
  karmaSettings.preprocessors[__dirname + '/../' + config.compile_dir + '/app/**/*.js'] = ['coverage'];
  karmaSettings.preprocessors[__dirname + '/../' + config.compile_dir + '/common/**/*.js'] = ['coverage'];
  karmaSettings.coverageReporter['dir'] = __dirname + '/../' + config.tests_dir + '/test-coverage';
  return gulp.src(files).pipe(karma(karmaSettings));
});

afterTestsBuild = function (done) {
  if (GLOBAL.coffeeOK) {
    runSequence('run-karma', done);
  } else {
    GLOBAL.coffeeOK = true;
    done();
  }
};

gulp.task('run-tests', function (done) {
  return runSequence('clean-tests', 'build-tests', function () {
    runSequence('run-karma', done);
  });
});

gulp.task('run-tests-watch', function (done) {
  return runSequence('build-tests', function () {
    runSequence('run-karma', done);
  });
});

