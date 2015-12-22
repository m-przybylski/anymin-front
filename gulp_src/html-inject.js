
var config = require('../build.config');
var gulp = require('gulp');
var inject = require('gulp-inject');
var series = require('stream-series');

gulp.task('inject-html', function() {

    var appSrc = gulp.src([
        config.compile_dir + '/app/**/*.js',
        config.compile_dir + '/common/**/*.js',
        config.compile_dir + '/' + config.tpl_name], {
        read: false
    });
    var vendorSrc = gulp.src(config.vendor_files.js, {
        read: false
    });

    var gitCommit = gulp.src(config.compile_dir + '/assets/gitcommit.js');

    var styles = gulp.src(config.compile_dir + '/**/*.css', {
        read: false
    });

    return gulp.src('src/index.html').pipe(inject(series(vendorSrc, gitCommit, appSrc, styles), {
        ignorePath: config.compile_dir
    })).pipe(gulp.dest(config.compile_dir));
});

//gulp.task('build-html-prod', function() {
//    var appSrc;
//    appSrc = gulp.src([config.buildDir + '/*.js', config.buildDir + '/*.css'], {
//        read: false
//    });
//    return gulp.src('src/index.html').pipe(inject(appSrc, {
//        ignorePath: config.buildDir
//    })).pipe(htmlmini({
//        conditionals: true
//    })).pipe(gulp.dest(config.buildDir));
//});
