var gulp = require('gulp');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('compress', function() {
    var b = browserify({
        entries: 'public/src/js/app.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify]
    });

    return b.bundle()
        .pipe(source('./app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('less', function() {
    return gulp.src('public/src/styles/styles.less')
    /**
     * Dynamically injects @import statements into the main app.less file, allowing
     * .less files to be placed around the app structure with the component
     * or page they apply to.
     */
        .pipe(inject(gulp.src(['./components/**/*.less'], {read: false, cwd: 'public/src/styles/'}), {
            starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function (filepath) {
                return '@import ".' + filepath + '";';
            }
        }))
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/styles'));
});

gulp.task('watch', function() {
    watch('./public/src/js/**/*', function() {
        gulp.run(['compress']);
    });

    watch('./public/src/styles/**/*', function() {
        gulp.run(['less']);
    });
});

gulp.task('default', ['compress', 'less', 'watch']);