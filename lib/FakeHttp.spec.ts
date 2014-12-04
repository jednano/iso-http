/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import FakeHttp = require('./FakeHttp');
import IsoHttp = require('./IsoHttp');
import TestUtils = require('./TestUtils');

describe('FakeHttp.request()', () => {

	var request = FakeHttp.request;
	var options = {
		method: 'foo',
		url: 'bar'
	};

	it('returns an instance of FakeHttp.Agent', () => {
		var req = request(options);
		expect(req instanceof FakeHttp.Agent).toBe(true);
	});

	it('fakes a resolved HTTP response with resolveWith', () => {
		var fakeResponse: IsoHttp.Response = {
			status: 123,
			headers: { foo: 'bar' },
			text: 'baz'
		};
		var req = request(options, response => {
			expect(response).toEqual(fakeResponse);
		});
		req.respondWith(fakeResponse);
	});

	it('fakes a client-rejected HTTP request with rejectWith', () => {
		var req = request(options, TestUtils.noop, err => {
			expect(err.method).toEqual('FOO');
			expect(err.url).toEqual('bar');
			expect(err.message).toEqual('baz');
		});
		req.rejectWith(new Error('baz'));
	});

	it('ignores non-function callback args', () => {
		var fn = () => {
			var req = request(options, null, null);
			req.respondWith(null);
			req.rejectWith(null);
		};
		expect(fn).not.toThrowError();
	});

});
