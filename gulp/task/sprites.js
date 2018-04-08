var get_gulp = require("gulp"),
get_svgSprite = require("gulp-svg-sprite"),
get_gulprename = require("gulp-rename"),
get_del = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

get_gulp.task('beginClean', function() {
  return get_del(['./app/temp/sprite', './app/assets/images/sprites']);
});

get_gulp.task('createSprite', ['beginClean'], function() {
  return get_gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(get_svgSprite(config))
    .pipe(get_gulp.dest('./app/temp/sprite/'));
});

get_gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return get_gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(get_gulp.dest('./app/assets/images/sprites'));
});

get_gulp.task('copySpriteCSS', ['createSprite'], function() {
  return get_gulp.src('./app/temp/sprite/css/*.css')
    .pipe(get_gulprename('_sprite.css'))
    .pipe(get_gulp.dest('./app/assets/css/modules'));
});

get_gulp.task('endClean', ['copySpriteGraphic','copySpriteCSS'], function() {
  return get_del(['./app/temp/sprite']);
});

get_gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
