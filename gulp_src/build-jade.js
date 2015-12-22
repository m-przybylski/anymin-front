
var config          = require('../build.config');
var variables       = require('./variables');
var gulp            = require('gulp');
var cache           = require('gulp-cached');
var jade            = require('gulp-jade');
var templateCache   = require('gulp-angular-templatecache');
var remember        = require('gulp-remember');
var uglify          = require('gulp-uglify');
var gulpif          = require('gulp-if');
var deepcopy        = require('deepcopy');
var cback           = require('gulp-callback');
var consoleWarn     = deepcopy(console.warn);

console.warn = function(args) {
    console.log(args);
    return process.exit();
};
jadeCore = function() {
    return gulp.src([config.app_files.jade_all, '!src/**/*.partial.jade']).pipe(gulpif(!variables.arguments.production && variables.arguments.jadeCache, cache('jade-templates'))).pipe(jade({
        client: false,
        pretty: true
    })).pipe(gulpif(!variables.arguments.production && variables.arguments.jadeCache, remember('jade-templates'))).pipe(templateCache(config.tpl_name, {
        module: config.tpl_module,
        standalone: true,
        transformUrl: function(url) {
            return url.replace(/.html$/, '.tpl.html');
        }
    }));
};

gulp.task('compile-jade', function() {
    return jadeCore().pipe(gulp.dest(config.compile_dir)).pipe(cback(function() {
        console.warn = consoleWarn;
        return variables.arguments.jadeCache = true;
    }));
});

gulp.task('compile-jade-prod-tmp', function() {
    return jadeCore().pipe(gulp.dest(config.prod.jsAnnotated)).pipe(cback(function() {
        console.warn = consoleWarn;
        return variables.arguments.jadeCache = true;
    }));
});

gulp.task('compile-jade-prod-mid', function() {
    return jadeCore().pipe(uglify()).pipe(gulp.dest(config.prod.buildAnnotated)).pipe(cback(function() {
        console.warn = consoleWarn;
        return variables.arguments.jadeCache = true;
    }));
});
