const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function styles(done) {
  // Specify path of source SASS / SCSS file
  return gulp.src('sass/*.scss')
  // Compile it, and catch errors
  .pipe(sass().on('error',sass.logError))
  // Save the CSS output file in this path
  .pipe(gulp.dest('.'))
  // Auto-inject into browsers
  .pipe(browserSync.stream());

  done();
}

function watch(done) {
    browserSync.init({
      proxy: "https://dreamagency.ddev.site",
    });

    // Watch for changes in the source SASS / SCSS file
    gulp.watch('sass/*.scss', styles);

    gulp.watch('*.css').on('change',browserSync.reload);
    gulp.watch('js/*.js').on('change',browserSync.reload);

    done();
}

exports.watch = watch;