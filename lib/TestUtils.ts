import IsoHttp = require('./IsoHttp');

module TestUtils {

	export function getApiPath(path: string) {
		return 'http://localhost:3000' + path;
	}

	export function isPlainObject(obj: Object) {
		if (typeof obj === 'object' && obj) {
			return obj.constructor === Object;
		}
		return false;
	}

	/* istanbul ignore next: function not covered */
	export function noop() {
		// noop
	}

	export function runIsomorphicTests(request: IsoHttp.Request) {

		var statusCodes = {
			200: 'foo',
			500: 'fail',
			404: 'Cannot GET /404\n'
		};
		Object.keys(statusCodes).forEach(statusCode => {
			var status = parseInt(statusCode, 10);
			it('handles a ' + status, done => {
				var options = {
					url: getApiPath('/' + status)
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
				url: getApiPath('/foo')
			};
			var fn = () => {
				request(options);
			};
			expect(fn).not.toThrowError();
		});

		it('responds with headers as an object literal', done => {
			var options = {
				url: getApiPath('/not-found')
			};
			request(options, response => {
				expect(isPlainObject(response.headers)).toBe(true);
				done();
			});
		});

		it('rejects a client error', done => {
			var options = {
				url: 'http://foo.bar.baz/qux'
			};
			request(options, noop, err => {
				expect(err instanceof Error).toBe(true);
				expect(err.method).toEqual('GET');
				expect(err.url).toEqual('http://foo.bar.baz/qux');
				done();
			});
		});

	}

}

export = TestUtils;
