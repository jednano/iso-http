/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import httpRequest = require('./httpRequest');
import TestUtils = require('../test/TestUtils');

describe('browser httpRequest()', () => {

	TestUtils.runIsomorphicTests(httpRequest);

	it('rejects a client error', done => {
		httpRequest('http://foo.bar.baz/qux', {
			onClientError: error => {
				expect(error.message).toEqual('Unknown error in iso-http module.');
				done();
			}
		});
	});

});
