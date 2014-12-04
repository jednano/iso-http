/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import IsoHttp = require('./IsoHttp');
import TestHelpers = require('./TestHelpers');

function runIsomorphicTests(request: IsoHttp.Request) {

	var statusCodes = {
		200: 'foo',
		500: 'fail',
		404: 'Cannot GET /404\n'
	};
	Object.keys(statusCodes).forEach(statusCode => {
		var status = parseInt(statusCode, 10);
		it('handles a ' + status, done => {
			var options = {
				url: TestHelpers.getApiPath('/' + status)
			};
			request(options, response => {
				expect(response.status).toEqual(status);
				expect(response.text).toEqual(statusCodes[status]);
				done();
			});
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

}

export = runIsomorphicTests;
