var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

module.exports = function() {
	return browserify()
		.require('./js/http.browser.js', { expose: 'iso-http' })
		.bundle()
		.pipe(source('iso-http.js'))
		.pipe(gulp.dest('dist'))
		.pipe(streamify(uglify()))
		.pipe(rename('iso-http.min.js'))
		.pipe(gulp.dest('dist'));
}
