var config = require('../build.config');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var chalk = require('chalk');
var connect = require('gulp-connect');


buildArgs = {
  stage1: ['clean-all'],
  stage2: ['transpile-scripts', 'git-commit', 'compile-jade', 'copy-assets', 'build-styles'],
  stage3: ['inject-html']
};

gulp.task('build', function (done) {

  var buildStart;
  buildStart = Date.now();

  if (config.variables.tests) {
    buildArgs.stage3.push('run-tests');
  }
  //if (config.arguments.docs) {
  //    buildArgs.stage2.push('build-docs');
  //}


  runSequence(buildArgs.stage1, buildArgs.stage2, buildArgs.stage3, function () {
    var diff = String((Date.now() - buildStart) / 1000);
    console.log(chalk.white.bgGreen('[GULP] Build sequence had been completed successfully in ' + chalk.white.bgGreen(diff + chalk.white.bgGreen('s!'))));
    return done();
  });
});

gulp.task('test', function (done) {
  runSequence(['clean-all', 'transpile-scripts'])

});

gulp.task('watch', function (done) {
  console.log(chalk.white.bgGreen('[GULP] Starting watch and build task'));
  runSequence('build', 'watchers', function () {
    console.log(chalk.white.bgGreen('[GULP] Watchers had been turned on'));
    return done();
  });
});


gulp.task('serve', function (done) {
  runSequence('watch', function () {

    connect.server({
      root: config.compile_dir,
      port: 4242,
      livereload: true,
      fallback: config.compile_dir + '/index.html'
    })
  })

});
