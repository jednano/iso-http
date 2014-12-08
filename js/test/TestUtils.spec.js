/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
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
                return;
            })).toBe(false);
        });
    });
    describe('FakeHttp.request()', function () {
        var request = TestUtils.FakeHttp.request;
        var options = {
            method: 'foo',
            url: 'bar'
        };
        it('returns an instance of FakeHttp.Agent', function () {
            var req = request(options);
            expect(req instanceof TestUtils.FakeHttp.Agent).toBe(true);
        });
        it('fakes a resolved HTTP response with resolveWith', function (done) {
            var fakeResponse = {
                status: 123,
                headers: { foo: 'bar' },
                text: 'baz'
            };
            var req = request(options, function (response) {
                expect(response).toEqual(fakeResponse);
                done();
            });
            req.respondWith(fakeResponse);
        });
        it('fakes a client-rejected HTTP request with rejectWith', function (done) {
            var req = request(options, TestUtils.noop, function (err) {
                expect(err.method).toEqual('FOO');
                expect(err.url).toEqual('bar');
                expect(err.message).toEqual('baz');
                done();
            });
            req.rejectWith(new Error('baz'));
        });
        it('ignores non-function callback args', function () {
            var fn = function () {
                var req = request(options, null, null);
                req.respondWith(null);
                req.rejectWith(null);
            };
            expect(fn).not.toThrowError();
        });
    });
});
