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

	describe('a cross-domain request', () => {

		it('handles a credentialed request', done => {
			request({
				url: TestUtils.getApiPath('/creds'),
				withCredentials: true
			}, response => {
				expect(response.status).toEqual(200);
				expect(response.text).toEqual('foo');
				done();
			});
		});

		it('handles a failure', done => {
			request({
				url: '//tunne127.com'
			}, response => {
				expect(response.status).toEqual(0);
				expect(response.text).toEqual('');
				done();
			});
		});

	});

});
