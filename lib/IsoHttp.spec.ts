/// <reference path="../bower_components/dt-node/node.d.ts" />
/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import IsoHttp = require('./IsoHttp');

describe('IsoHttp module', () => {

	describe('Agent constructor', () => {

		// ReSharper disable once InconsistentNaming
		var Agent = <any>IsoHttp.Agent;

//		it('errors if no URL is supplied', () => {
//			expect(() => {
//				return new Agent();
//			}).toThrowError('Null or undefined URL in request.');
//			expect(() => {
//				return new Agent(null);
//			}).toThrowError('Null or undefined URL in request.');
//			expect(() => {
//				return new Agent('foo');
//			}).not.toThrowError();
//		});

//		it('errors if no options are supplied', () => {
//			var fn = () => {
//				return new Agent();
//			};
//			expect(fn).toThrowError('Missing options.');
//			fn = () => {
//				return new Agent({});
//			};
//			expect(fn).toThrowError('Missing options.');
//		});
//
//		it('errors if no url is supplied as an option', () => {
//			var fn = () => {
//				return new Agent({ foo: 'bar' });
//			};
//			expect(fn).toThrowError('Missing required option: url.');
//		});
//
//		it('errors when the send method is not implemented', () => {
//			var fn = () => {
//				new Agent({ url: 'foo' }).send();
//			};
//			expect(fn).toThrowError('Not implemented.');
//		});
//
//		it('sets headers', () => {
//			var headers = {
//				bar: 'baz',
//				qux: 'quux'
//			};
//			var agent = new Agent({
//				url: 'foo',
//				headers: headers
//			});
//			expect(agent.headers).toEqual(headers);
//		});
//
//		it('sets Content-Type', () => {
//			var agent = new Agent({
//				url: 'foo',
//				contentType: 'bar'
//			});
//			expect(agent.contentType).toEqual('bar');
//		});

	});

});
