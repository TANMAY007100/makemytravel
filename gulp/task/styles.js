var get_gulp = require("gulp"),
get_post_css = require("gulp-postcss"),
get_autoprefixer = require("autoprefixer"),
get_postcss_simple_vars = require("postcss-simple-vars"),
get_postcss_nested = require("postcss-nested"),
get_postcss_import = require("postcss-import"),
get_post_mixins = require("postcss-mixins"),
get_postcss_hexrgba = require("postcss-hexrgba");
// Gulp Styles Task

get_gulp.task('styles', function(){
  return get_gulp.src('./app/assets/css/styles.css')
    .pipe(get_post_css([get_postcss_import, get_post_mixins, get_postcss_simple_vars, get_postcss_nested, get_postcss_hexrgba, get_autoprefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(get_gulp.dest('./app/temp/styles'));
});
