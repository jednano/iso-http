var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');
var karma = require('karma');
var path = require('path');
var plumber = require('gulp-plumber');

module.exports = function(done) {

	var server = require('../js/server');
	runNodeTests(function(exitCode1) {
		runBrowserTests(function(exitCode2) {
			server.close();
			var exitCode = exitCode1 || exitCode2;
			done(exitCode);
			// Force quit. Jasmine is holding onto the process somehow.
			process.exit(exitCode);
		});
	});

};

function runNodeTests(done) {
	var errorCount = 0;
	gulp.src(['js/**/*.js', '!js/browser/Http.js', '!js/**/*.spec.js'])
		.pipe(istanbul())
		.on('finish', function() {
			gulp.src(['js/**/*.spec.js', '!js/browser/Http.spec.js'])
				.on('error', function() {
					errorCount++;
				})
				.pipe(jasmine())
				.pipe(istanbul.writeReports({
					reporters: ['lcov'],
					reportOpts: { dir: './coverage' }
				}))
				.on('end', function() {
					done(errorCount);
				});
	});
}

function runBrowserTests(done) {
	karma.server.start({
		configFile: path.resolve('karma.conf.js'),
		singleRun: true
	}, function(exitCode) {
		console.log('Karma run has exited with ' + exitCode);
		done(exitCode);
	});
}
