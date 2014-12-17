/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var _ = require('./Utils');
describe('Utils', function () {
    describe('joinUrlWithQuery', function () {
        it('returns the URL as-is when the query is not supplied or empty', function () {
            expect(_.joinUrlWithQuery('foo')).toEqual('foo');
            expect(_.joinUrlWithQuery('foo', {})).toEqual('foo');
        });
        it('joins the url and query with "?" if no "?" is found', function () {
            var actual = _.joinUrlWithQuery('foo', { bar: 'baz' });
            var expected = 'foo?bar=baz';
            expect(actual).toEqual(expected);
        });
        it('joins the url and query with "&" if "?" is found', function () {
            var actual = _.joinUrlWithQuery('foo?bar=baz', { qux: 'quux' });
            var expected = 'foo?bar=baz&qux=quux';
            expect(actual).toEqual(expected);
        });
    });
    describe('serializeObject', function () {
        it('joins keys and values with "="', function () {
            var actual = _.serializeObject({ foo: 'bar' });
            var expected = 'foo=bar';
            expect(actual).toEqual(expected);
        });
        it('joins props with "&"', function () {
            var actual = _.serializeObject({
                foo: 'bar',
                baz: 'qux'
            });
            var expected = 'foo=bar&baz=qux';
            expect(actual).toEqual(expected);
        });
        it('encodes the value with encodeURIComponent', function () {
            var actual = _.serializeObject({ foo: 'bar baz' });
            var expected = 'foo=bar%20baz';
            expect(actual).toEqual(expected);
        });
    });
    describe('isPlainObject()', function () {
        it('validates an object literal', function () {
            expect(_.isPlainObject({})).toBe(true);
        });
        it('validates a newwed-up Object', function () {
            expect(_.isPlainObject(new Object())).toBe(true);
        });
        it('invalidates other object types', function () {
            expect(_.isPlainObject([])).toBe(false);
            expect(_.isPlainObject(new Error())).toBe(false);
            expect(_.isPlainObject('')).toBe(false);
            expect(_.isPlainObject(42)).toBe(false);
            /* istanbul ignore next: function not covered */
            expect(_.isPlainObject(function () {
                return;
            })).toBe(false);
        });
    });
});
