var get_gulp = require('gulp'),
get_modernizr = require('gulp-modernizr');

get_gulp.task('modernizr', function() {
  return get_gulp.src(['./app/assets/css/**/*.css', './app/assets/scripts/**/*.js'])
  .pipe(get_modernizr({
    "options": [
      "setClasses"
    ]
  }))
  .pipe(get_gulp.dest('./app/temp/scripts/'));
});
