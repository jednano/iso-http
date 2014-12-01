/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />

import TestHelpers = require('./TestHelpers');

describe('TestHelpers', () => {

	describe('getApiPath()', () => {

		var getApiPath = TestHelpers.getApiPath;

		it('prepends a string with http://localhost:3000', () => {
			expect(getApiPath('/foo')).toEqual('http://localhost:3000/foo');
		});

	});

	describe('isPlainObject()', () => {

		var isPlainObject = TestHelpers.isPlainObject;

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
				// noop
			})).toBe(false);
		});

	});

});
