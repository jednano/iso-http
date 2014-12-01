/// <reference path="../bower_components/dt-node/node.d.ts" />
/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import NodeHttp = require('./NodeHttp');
import runIsomorphicTests = require('./runIsomorphicTests');
import TestHelpers = require('./TestHelpers');

describe('NodeHttp.request()', () => {

	var request = NodeHttp.request;

	runIsomorphicTests(request);

	it('rejects a client error', done => {
		var options = {
			url: 'http://foo.bar.baz/qux'
		};
		request(options, TestHelpers.noop, err => {
			expect(err.message).toEqual('getaddrinfo ENOTFOUND');
			done();
		});
	});

});
