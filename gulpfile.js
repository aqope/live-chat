var gulp = require('gulp');
var scss = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');

gulp.task('styles:compile', function(){
  var scssStream = gulp.src('./scss/app.scss')
      .pipe(scss().on('error', function() {
        console.log(scss.LogError);
  }));

  return merge(scssStream)
      .pipe(concat('app.css'))
      .pipe(gulp.dest('resources/css/'));
});

// gulp.task('styles:compile', function(){
//   var scssStream = gulp.src('./scss/**/*.scss')
//       .pipe(scss().on('error', function() {
//         console.log(scss.LogError);
//   }));
//
//   return merge(scssStream)
//       .pipe(concat('app.css'))
//       .pipe(gulp.dest('resources/css/'));
// });
