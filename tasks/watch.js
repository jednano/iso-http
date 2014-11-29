var gulp = require('gulp');

module.exports = function() {
	gulp.watch('lib/**/*.ts', ['test:onScriptsChanged']);
}
