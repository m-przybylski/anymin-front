var pkg     = require('../package.json');
var config  = require('../build.config');
var gulp    = require('gulp');
var sass    = require('gulp-sass');
var rename  = require('gulp-rename');
var concat  = require('gulp-concat');
var addSrc  = require('gulp-add-src');
var gulpif  = require('gulp-if');
var connect = require('gulp-connect');

gulp.task('build-styles', function() {
    return gulp.src('src/template/' + config.project_theme_name + "/sass/main.sass")
        .pipe(sass({
            indentedSyntax: true
        }).on('error', sass.logError))
        .pipe(addSrc(config.vendor_files.css))
        .pipe(concat(pkg.name + '-' + pkg.version + '.css'))
        .pipe(gulp.dest(config.compile_dir))
        .pipe(connect.reload());
});

