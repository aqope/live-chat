var gulp = require('gulp');
var scss = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');

/*
  Compile SCSS styles into one CSS file
*/
gulp.task('compile:css', function(){
  var scssStream = gulp.src('./scss/app.scss')
      .pipe(scss().on('error', function() {
        console.log(scss.LogError);
  }));

  return merge(scssStream)
      .pipe(concat('app.css'))
      .pipe(gulp.dest('public/resources/css/'));
});
