/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var Helpers = require('./Helpers');
describe('Helpers', function () {
    describe('joinUrlWithQuery', function () {
        it('returns the URL as-is when the query is not supplied or empty', function () {
            expect(Helpers.joinUrlWithQuery('foo')).toEqual('foo');
            expect(Helpers.joinUrlWithQuery('foo', {})).toEqual('foo');
        });
        it('joins the url and query with "?" if no "?" is found', function () {
            var actual = Helpers.joinUrlWithQuery('foo', { bar: 'baz' });
            var expected = 'foo?bar=baz';
            expect(actual).toEqual(expected);
        });
        it('joins the url and query with "&" if "?" is found', function () {
            var actual = Helpers.joinUrlWithQuery('foo?bar=baz', { qux: 'quux' });
            var expected = 'foo?bar=baz&qux=quux';
            expect(actual).toEqual(expected);
        });
    });
    describe('serializeObject', function () {
        it('joins keys and values with "="', function () {
            var actual = Helpers.serializeObject({ foo: 'bar' });
            var expected = 'foo=bar';
            expect(actual).toEqual(expected);
        });
        it('joins props with "&"', function () {
            var actual = Helpers.serializeObject({
                foo: 'bar',
                baz: 'qux'
            });
            var expected = 'foo=bar&baz=qux';
            expect(actual).toEqual(expected);
        });
        it('encodes the value with encodeURIComponent', function () {
            var actual = Helpers.serializeObject({ foo: 'bar baz' });
            var expected = 'foo=bar%20baz';
            expect(actual).toEqual(expected);
        });
    });
});
