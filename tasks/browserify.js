var eventStream = require('event-stream');
var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

module.exports = function() {

	var isoHttp = browserify()
		.require('./js/browser/Http.js', { expose: 'iso-http' })
		.bundle()
		.pipe(source('iso-http.js'))
		.pipe(gulp.dest('dist'))
		.pipe(streamify(uglify()))
		.pipe(rename('iso-http.min.js'))
		.pipe(gulp.dest('dist'));

	var testUtils = browserify()
		.require('./js/test/TestUtils.js', { expose: 'TestUtils' })
		.bundle()
		.pipe(source('test-utils.js'))
		.pipe(gulp.dest('dist'));

	return eventStream.merge(isoHttp, testUtils);
};
