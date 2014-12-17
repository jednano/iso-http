/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import _ = require('./Utils');

describe('Utils', () => {

	describe('joinUrlWithQuery', () => {

		it('returns the URL as-is when the query is not supplied or empty', () => {
			expect(_.joinUrlWithQuery('foo')).toEqual('foo');
			expect(_.joinUrlWithQuery('foo', {})).toEqual('foo');
		});

		it('joins the url and query with "?" if no "?" is found', () => {
			var actual = _.joinUrlWithQuery('foo', { bar: 'baz' });
			var expected = 'foo?bar=baz';
			expect(actual).toEqual(expected);
		});

		it('joins the url and query with "&" if "?" is found', () => {
			var actual = _.joinUrlWithQuery('foo?bar=baz', { qux: 'quux' });
			var expected = 'foo?bar=baz&qux=quux';
			expect(actual).toEqual(expected);
		});

	});

	describe('serializeObject', () => {

		it('joins keys and values with "="', () => {
			var actual = _.serializeObject({ foo: 'bar' });
			var expected = 'foo=bar';
			expect(actual).toEqual(expected);
		});

		it('joins props with "&"', () => {
			var actual = _.serializeObject({
				foo: 'bar',
				baz: 'qux'
			});
			var expected = 'foo=bar&baz=qux';
			expect(actual).toEqual(expected);
		});

		it('encodes the value with encodeURIComponent', () => {
			var actual = _.serializeObject({ foo: 'bar baz' });
			var expected = 'foo=bar%20baz';
			expect(actual).toEqual(expected);
		});

	});

	describe('isPlainObject()', () => {

		it('validates an object literal', () => {
			expect(_.isPlainObject({})).toBe(true);
		});

		it('validates a newwed-up Object', () => {
			expect(_.isPlainObject(new Object())).toBe(true);
		});

		it('invalidates other object types', () => {
			expect(_.isPlainObject([])).toBe(false);
			expect(_.isPlainObject(new Error())).toBe(false);
			expect(_.isPlainObject('')).toBe(false);
			expect(_.isPlainObject(42)).toBe(false);
			/* istanbul ignore next: function not covered */
			expect(_.isPlainObject(() => {
				return;
			})).toBe(false);
		});

	});

});
