var gulp = require('gulp');

gulp.task('default', ['watch']);
  gulp.task('watch', ['test--watch'], require('./tasks/watch'));
    gulp.task('test--watch', ['build'], require('./tasks/test--watch'));
    gulp.task('test', ['build'], require('./tasks/test'));
      gulp.task('build', ['scripts']);
        gulp.task('scripts', ['clean', 'tslint'], require('./tasks/scripts'));
          gulp.task('clean', require('./tasks/clean'));
          gulp.task('tslint', require('./tasks/tslint'));

gulp.task('test:onScriptsChanged', ['scripts:changed'], require('./tasks/test--watch'));
  gulp.task('scripts:changed', require('./tasks/scripts'));

gulp.task('dist', ['browserify']);
  gulp.task('browserify', ['build'], require('./tasks/browserify'));
