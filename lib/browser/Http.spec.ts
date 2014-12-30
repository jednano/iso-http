/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import Http = require('./Http');
import TestUtils = require('../test/TestUtils');

describe('BrowserHttp.request()', () => {

	var request = Http.request;

	TestUtils.runIsomorphicTests(request);

	it('handles a 404', done => {
		request({ url: 'http://localhost:9876/404' }, response => {
			expect(response.status).toEqual(404);
			expect(response.text).toEqual('NOT FOUND');
			done();
		});
	});

	it('rejects a client error', done => {
		var options = {
			url: 'http://foo.bar.baz/qux'
		};
		request(options, TestUtils.noop, err => {
			expect(err.message).toEqual('Unspecified client error.');
			done();
		});
	});

});
