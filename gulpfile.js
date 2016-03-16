var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglifyJs = require('gulp-uglify');
var runSequence = require('run-sequence');

gulp.task('prefix-css', function () {
    return gulp.src('public/styles/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/styles'));
});
 
gulp.task('concat-scripts', function() {
    //manually load the scripts after each other, so we dont get errors
  return gulp.src(['public/js/libs/rlite.js', 'public/js/request.js', 'public/js/router.js', 'public/js/app.js'])
    .pipe(uglifyJs())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', function (callback) {
  runSequence(['prefix-css','concat-scripts'],
    callback
  );
});