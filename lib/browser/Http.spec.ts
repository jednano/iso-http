﻿/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import Http = require('./Http');
import TestUtils = require('../test/TestUtils');

describe('BrowserHttp.request()', () => {

	var request = Http.request;

	TestUtils.runIsomorphicTests(request);

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
