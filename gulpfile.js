var get_gulp = require("gulp");
get_gulp_watch = require("gulp-watch"),
get_post_css = require("gulp-postcss"),
get_autoprefixer = require("autoprefixer"),
get_postcss_simple_vars = require("postcss-simple-vars"),
get_postcss_nested = require("postcss-nested"),
get_postcss_import = require("postcss-import");

// Gulp Hello World Task

get_gulp.task('default', function(){
  console.log("Hooray - you created a gulp task");
});

// Gulp HTML Task

get_gulp.task('html', function(){
  console.log("Imagine something useful being done to your HTML here");
});

// Gulp Styles Task

get_gulp.task('styles', function(){
  return get_gulp.src('./app/assets/css/styles.css')
    .pipe(get_post_css([get_postcss_import, get_postcss_simple_vars, get_postcss_nested, get_autoprefixer]))
    .pipe(get_gulp.dest('./app/temp/styles'));
});

// Gulp watch Task

get_gulp.task('watch', function(){
  get_gulp_watch('./app/index.html', function() {
    // Start Gulp html Task
    get_gulp.start('html');
  });

  get_gulp_watch('./app/assets/css/**/*.css', function() {
    // Start Gulp styles Task
    get_gulp.start('styles');
  });
});
