var gulp = require('gulp');

gulp.task('default', ['test']);
gulp.task('test', ['browserify'], require('./tasks/test'));
gulp.task('browserify', ['build'], require('./tasks/browserify'));
gulp.task('build', ['scripts']);
gulp.task('scripts', ['clean', 'tslint'], require('./tasks/scripts'));
gulp.task('clean', require('./tasks/clean'));
gulp.task('tslint', require('./tasks/tslint'));
