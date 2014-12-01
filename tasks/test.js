var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');
var karma = require('karma');
var path = require('path');
var plumber = require('gulp-plumber');

module.exports = function(done) {
	gulp.src('js/**/*.js')
		.pipe(istanbul())
		.on('finish', function() {
			var server = require('../js/server');
			gulp.src(['js/**/*.spec.js', '!js/**/*.browser.spec.js'])
				.pipe(plumber())
				.pipe(jasmine())
				.on('finish', function() {
					karma.server.start({
						configFile: path.resolve('karma.conf.js'),
						singleRun: true
					}, function(exitCode) {
						console.log('Karma run has exited with ' + exitCode);
						server.close();
						gulp.src('js/**/*.spec.js')
							.pipe(istanbul.writeReports({
								reporters: ['lcov']
							}))
							.on('finish', done);
					});
				});
		});
};
