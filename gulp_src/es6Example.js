var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var babel = require('gulp-babel');

// Load all gulp plugins into the plugins object.
var plugins = require('gulp-load-plugins')();

var src = {
    html: 'src/**/*.html',
    libs: 'node_modules/angular/angular.js',
    scripts: {
        all: 'src/**/*.js',
        app: 'src/app.js'
    }
};

var build = 'build/';
var out = {
    libs: build + 'libs/',
    scripts: {
        file: 'app.min.js',
        folder: build + 'scripts/'
    }
}

gulp.task('html', function() {
    return gulp.src(src.html)
        .pipe(gulp.dest(build))
        .pipe(plugins.connect.reload());
});

/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function() {
    return gulp.src(src.scripts.all)
        .pipe(plugins.jshint({
            esnext: true // Enable ES6 support
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('libs', function() {
    /* In a real project you of course would use npm or bower to manage libraries. */
    return gulp.src(src.libs)
        .pipe(gulp.dest(out.libs))
        .pipe(plugins.connect.reload());
});

/* Compile all script files into one output minified JS file. */
gulp.task('scripts', function() {

        return gulp.src(src.scripts.all)
            .pipe(babel({
                presets: ['es2015']
            }))
        .pipe(plugins.sourcemaps.init({
            loadMaps: true // Load the sourcemaps browserify already generated
        }))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: true
        }))
        .pipe(gulp.dest(out.scripts.folder))
        .pipe(plugins.connect.reload());

});

gulp.task('serve', ['build', 'watch'], function() {
    plugins.connect.server({
        root: build,
        port: 4242,
        livereload: true,
        fallback: build + 'index.html'
    });
});

gulp.task('watch', function() {
    gulp.watch(src.libs, ['libs']);
    gulp.watch(src.html, ['html']);
    gulp.watch(src.scripts.all, ['scripts']);
})

gulp.task('build', ['scripts', 'html', 'libs']);
gulp.task('default', ['serve']);