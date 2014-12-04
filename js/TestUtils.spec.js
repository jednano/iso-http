/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var TestUtils = require('./TestUtils');
describe('TestUtils', function () {
    describe('getApiPath()', function () {
        var getApiPath = TestUtils.getApiPath;
        it('prepends a string with http://localhost:3000', function () {
            expect(getApiPath('/foo')).toEqual('http://localhost:3000/foo');
        });
    });
    describe('isPlainObject()', function () {
        var isPlainObject = TestUtils.isPlainObject;
        it('validates an object literal', function () {
            expect(isPlainObject({})).toBe(true);
        });
        it('validates a newwed-up Object', function () {
            expect(isPlainObject(new Object())).toBe(true);
        });
        it('invalidates other object types', function () {
            expect(isPlainObject([])).toBe(false);
            expect(isPlainObject(new Error())).toBe(false);
            expect(isPlainObject('')).toBe(false);
            expect(isPlainObject(42)).toBe(false);
            /* istanbul ignore next: function not covered */
            expect(isPlainObject(function () {
                // noop
            })).toBe(false);
        });
    });
});
