/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import BrowserHttp = require('./BrowserHttp');
import runIsomorphicTests = require('./runIsomorphicTests');
import TestHelpers = require('./TestHelpers');

describe('BrowserHttp.request()', () => {

	var request = BrowserHttp.request;

	runIsomorphicTests(request);

	it('rejects a client error', done => {
		var options = {
			url: 'http://foo.bar.baz/qux'
		};
		request(options, TestHelpers.noop, err => {
			expect(err.message).toEqual('Unspecified client error.');
			done();
		});
	});

});
