/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import IsoHttp = require('../IsoHttp');
import TestUtils = require('./TestUtils');

describe('TestUtils', () => {

	describe('getApiPath()', () => {

		var getApiPath = TestUtils.getApiPath;

		it('prepends a string with http://localhost:3000', () => {
			expect(getApiPath('/foo')).toEqual('http://localhost:3000/foo');
		});

	});

	describe('isPlainObject()', () => {

		var isPlainObject = TestUtils.isPlainObject;

		it('validates an object literal', () => {
			expect(isPlainObject({})).toBe(true);
		});

		it('validates a newwed-up Object', () => {
			expect(isPlainObject(new Object())).toBe(true);
		});

		it('invalidates other object types', () => {
			expect(isPlainObject([])).toBe(false);
			expect(isPlainObject(new Error())).toBe(false);
			expect(isPlainObject('')).toBe(false);
			expect(isPlainObject(42)).toBe(false);
			/* istanbul ignore next: function not covered */
			expect(isPlainObject(() => {
				return;
			})).toBe(false);
		});

	});

	describe('FakeHttp.request()', () => {

		var request = TestUtils.FakeHttp.request;
		var options = {
			method: 'foo',
			url: 'bar'
		};

		it('returns an instance of FakeHttp.Agent', () => {
			var req = request(options);
			expect(req instanceof TestUtils.FakeHttp.Agent).toBe(true);
		});

		it('fakes a resolved HTTP response with resolveWith', done => {
			var fakeResponse: IsoHttp.Response = {
				status: 123,
				headers: { foo: 'bar' },
				text: 'baz'
			};
			var req = request(options, response => {
				expect(response).toEqual(fakeResponse);
				done();
			});
			req.respondWith(fakeResponse);
		});

		it('fakes a client-rejected HTTP request with rejectWith', done => {
			var req = request(options, TestUtils.noop, err => {
				expect(err.method).toEqual('FOO');
				expect(err.url).toEqual('bar');
				expect(err.message).toEqual('baz');
				done();
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

});
