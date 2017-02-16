var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

//Watch task
gulp.task('default',function() {
    gulp.run('styles');
    gulp.watch('./public/sass/**/*.scss', function() {
      gulp.run('styles');      
    });
});
