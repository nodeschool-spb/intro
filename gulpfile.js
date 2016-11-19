const gulp = require('gulp');
const bs = require('browser-sync');

gulp.task('styles', function() {
  gulp.src('./**/*.css')
    .pipe(bs.stream());
});

gulp.task('markup', function() {
  gulp.src('index.html')
    .pipe(bs.stream());
});

gulp.task('serve', function() {
  bs.init({
    ghostMode: false,
    logPrefix: 'resume',
    logSnippet: true,
    reloadOnRestart: true,
    notify: false,
    baseDir: '.',
    server: ['.', '.']
  });
  gulp.watch('index.html', ['markup']);
  gulp.watch('./**/*.css', ['styles']);
});

gulp.task('default', ['serve']);