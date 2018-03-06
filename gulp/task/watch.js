var get_gulp = require("gulp");
get_gulp_watch = require("gulp-watch"),
get_browserSync_import = require("browser-sync").create();

// Gulp watch Task

get_gulp.task('watch', function(){

  // Using browser Sync to referesh the page automatically
  // Spins up a server and opens your index.html page in a browser
  get_browserSync_import.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  get_gulp_watch('./app/index.html', function() {
    // BrowserSync reloads the page when html in index.html changes
    get_browserSync_import.reload();
  });

  get_gulp_watch('./app/assets/css/**/*.css', function() {
    // Start Gulp styles Task
    get_gulp.start('cssInject');
  });
});

// Brand new task

get_gulp.task('cssInject', ['styles'], function(){
  return get_gulp.src('./app/temp/styles/styles.css')
  .pipe(get_browserSync_import.stream());
});
