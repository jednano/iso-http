var gulp = require('gulp');
var del = require('del');

module.exports = function() {
	gulp.task('clean', function() {
		return del(['js', 'd.ts']);
	});
};
