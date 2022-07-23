const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp
    .src('./build/dist/styles/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./build/dist/styles'));
});
