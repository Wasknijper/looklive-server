//i used this tutorial to get started: https://css-tricks.com/gulp-for-beginners/
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglifyJs = require('gulp-uglify');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('css', function () {
    return gulp.src('public/styles/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('public/production/styles'));
});
 
gulp.task('concat-scripts', function() {
    //manually load the scripts after each other, so we dont get errors
  return gulp.src(['public/js/libs/fontfaceobserver.js','public/js/libs/rlite.js', 'public/js/request.js', 'public/js/router.js', 'public/js/app.js'])
    .pipe(uglifyJs())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/production/js'));
});

gulp.task('images', function(){
  return gulp.src('public/images/*.+(png|jpg|gif|svg)')
  .pipe(imagemin([
      imageminPngquant({quality: '60'}),
      imageminMozjpeg({quality: '60'})
    ]))
  .pipe(gulp.dest('public/production/images'));
});


gulp.task('icons', function(){
  return gulp.src('public/icons/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/production/icons'));
});

//already optimized the fonts online, so we only copy them
//but im leaving this here in case I want to optimize them later
gulp.task('fonts', function() {
  return gulp.src('public/fonts/*')
  .pipe(gulp.dest('public/production/fonts'));
});

gulp.task('build', function (callback) {
  runSequence(['css','concat-scripts', 'images', 'icons', 'fonts'],
    callback
  );
});
