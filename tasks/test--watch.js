var gulp = require('gulp');
var karma = require('gulp-karma');
var plumber = require('gulp-plumber');

module.exports = function() {
	return gulp.src('js/**/*.spec.js', { read: false })
		.pipe(plumber())
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'watch'
		}));
}
