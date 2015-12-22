var fs = require('fs');
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var del = require('del');
var buildConfig = require('../build.config.js');
var shell = require('gulp-shell');

gulp.task('clean-all', function () {
  return del.sync([
    buildConfig.compile_dir
  ], {
    force: true
  })
});

gulp.task('clean-tests', function () {
  return del.sync([
    buildConfig.tests_dir
  ], {
    force: true
  })
});


gulp.task('git-commit-create', shell.task('git log --pretty=format:"%H - %an, %ad : %s" -1 > .gitcommit'));

gulp.task('git-commit', ['git-commit-create'], function (done) {
  var file;
  file = fs.readFileSync('.gitcommit', {
    encoding: 'utf8'
  });
  file = JSON.stringify({
    message: 'Last commit: ' + file
  });
  file = "var lastCommitMessage = " + file;
  return fs.writeFile('src/assets/gitcommit.js', file, {}, done);
});
