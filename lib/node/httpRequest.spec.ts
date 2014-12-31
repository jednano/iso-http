/// <reference path="../../bower_components/dt-node/node.d.ts" />
/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import httpRequest = require('./httpRequest');
import TestUtils = require('../test/TestUtils');

describe('node httpRequest()', () => {

	TestUtils.runIsomorphicTests(httpRequest);

	it('handles a 404', done => {
		httpRequest(TestUtils.getApiPath('/404'), response => {
			expect(response.status).toEqual(404);
			expect(response.text).toEqual('Cannot GET /404\n');
			done();
		});
	});

	it('rejects a client error', done => {
		httpRequest('http://foo.bar.baz/qux', {
			onClientError: error => {
				expect(error.message).toEqual('iso-http: getaddrinfo ENOTFOUND');
				done();
			}
		});
	});

});
