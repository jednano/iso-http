/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import IsoHttp = require('./IsoHttp');
import TestHelpers = require('./TestHelpers');

function runIsomorphicTests(request: IsoHttp.Request) {

	it('handles a 200', done => {
		var options = {
			url: TestHelpers.getApiPath('/foo')
		};
		request(options, response => {
			expect(response.status).toEqual(200);
			expect(response.text).toEqual('bar');
			done();
		});
	});

	it('handles a 200 w/o a resolve callback', () => {
		var options = {
			url: TestHelpers.getApiPath('/foo')
		};
		var fn = () => {
			request(options);
		};
		expect(fn).not.toThrowError();
	});

	it('handles a 500', done => {
		var options = {
			url: TestHelpers.getApiPath('/error')
		};
		request(options, response => {
			expect(response.status).toEqual(500);
			expect(response.text).toEqual('fail');
			done();
		});
	});

	it('handles a 404', done => {
		var options = {
			url: TestHelpers.getApiPath('/not-found')
		};
		request(options, response => {
			expect(response.status).toEqual(404);
			done();
		});
	});

	it('responds with headers as an object literal', done => {
		var options = {
			url: TestHelpers.getApiPath('/not-found')
		};
		request(options, response => {
			expect(TestHelpers.isPlainObject(response.headers)).toBe(true);
			done();
		});
	});

	it('rejects a client error', done => {
		var options = {
			url: 'http://foo.bar.baz/qux'
		};
		request(options, TestHelpers.noop, err => {
			expect(err instanceof Error).toBe(true);
			expect(err.method).toEqual('GET');
			expect(err.url).toEqual('http://foo.bar.baz/qux');
			done();
		});
	});

};

export = runIsomorphicTests;
