/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />

import IsoHttp = require('../IsoHttp');

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
			500: 'fail'
		};
		Object.keys(statusCodes).forEach(status => {
			it('handles a ' + status, done => {
				var url = getApiPath('/' + status);
				request(url, {
					onResponse: response => {
						expect(response.status).toEqual(parseInt(status, 10));
						expect(response.text).toEqual(statusCodes[status]);
						done();
					}
				});
			});
		});

		it('handles a 200 w/o a response callback', () => {
			expect(() => {
				request(getApiPath('/foo'));
			}).not.toThrowError();
		});

		it('responds with headers as an object literal', done => {
			request(getApiPath('/not-found'), {
				onResponse: response => {
					expect(isPlainObject(response.headers)).toBe(true);
					done();
				}
			});
		});

		it('rejects a client error', done => {
			request('http://foo.bar.baz/qux', {
				onClientError: error => {
					expect(error instanceof Error).toBe(true);
					expect(error.method).toEqual('GET');
					expect(error.url).toEqual('http://foo.bar.baz/qux');
					done();
				}
			});
		});

	}

	export module FakeHttp {

		export function request(url: string, options?: IsoHttp.RequestOptions) {
			return new Agent(url, options);
		}

		export class Agent extends IsoHttp.Agent {

			respondWith(response: IsoHttp.Response) {
				this.onResponse(response);
			}

			errorWith(error: Error) {
				this.onError(error);
			}

		}

	}

}

export = TestUtils;
