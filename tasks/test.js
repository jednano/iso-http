var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var karma = require('gulp-karma');
var plumber = require('gulp-plumber');

module.exports = function() {
	return gulp.src('js/**/*.js')
		.pipe(istanbul())
		.on('finish', function() {
			gulp.src('js/**/*.spec.js', { read: false })
				.pipe(plumber())
				.pipe(karma({
					configFile: 'karma.conf.js',
					action: 'run'
				}))
				.pipe(istanbul.writeReports({
					reporters: ['lcov']
				}));
		});
}
