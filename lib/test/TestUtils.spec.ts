/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import _ = require('../Helpers');
import IsoHttp = require('../IsoHttp');
import TestUtils = require('./TestUtils');

describe('TestUtils', () => {

	describe('getApiPath()', () => {

		var getApiPath = TestUtils.getApiPath;

		it('prepends a string with http://localhost:3000', () => {
			expect(getApiPath('/foo')).toEqual('http://localhost:3000/foo');
		});

	});

	describe('FakeHttp.request()', () => {

		var request = TestUtils.FakeHttp.request;

		it('returns an instance of FakeHttp.Agent', () => {
			var req = request('foo');
			expect(req instanceof TestUtils.FakeHttp.Agent).toBe(true);
		});

		it('fakes a resolved HTTP response with respondWith', done => {
			var fakeResponse: IsoHttp.Response = {
				status: 123,
				headers: { foo: 'bar' },
				text: 'baz'
			};
			var req = request('foo', {
				onResponse: response => {
					expect(response).toEqual(fakeResponse);
					done();
				}
			});
			req.respondWith(fakeResponse);
		});

		it('fakes a client-rejected HTTP request with errorWith', done => {
			var req = request('bar', {
				method: 'foo',
				onClientError: error => {
					expect(error.method).toEqual('FOO');
					expect(error.url).toEqual('bar');
					expect(error.message).toEqual('iso-http: baz');
					done();
				}
			});
			req.errorWith(new Error('baz'));
		});

	});

});
