var get_gulp = require("gulp"),
get_svgSprite = require("gulp-svg-sprite"),
get_gulprename = require("gulp-rename"),
get_del = require('del'),
get_svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function () {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
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

get_gulp.task('createPngCopy', ['createSprite'] , function() {
  return get_gulp.src('./app/temp/sprite/css/*.svg')
  .pipe(get_svg2png())
  .pipe(get_gulp.dest('./app/temp/sprite/css'));
});

get_gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return get_gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
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

get_gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
