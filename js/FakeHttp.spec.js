/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var FakeHttp = require('./FakeHttp');
var TestUtils = require('./test/TestUtils');
describe('FakeHttp.request()', function () {
    var request = FakeHttp.request;
    var options = {
        method: 'foo',
        url: 'bar'
    };
    it('returns an instance of FakeHttp.Agent', function () {
        var req = request(options);
        expect(req instanceof FakeHttp.Agent).toBe(true);
    });
    it('fakes a resolved HTTP response with resolveWith', function () {
        var fakeResponse = {
            status: 123,
            headers: { foo: 'bar' },
            text: 'baz'
        };
        var req = request(options, function (response) {
            expect(response).toEqual(fakeResponse);
        });
        req.respondWith(fakeResponse);
    });
    it('fakes a client-rejected HTTP request with rejectWith', function () {
        var req = request(options, TestUtils.noop, function (err) {
            expect(err.method).toEqual('FOO');
            expect(err.url).toEqual('bar');
            expect(err.message).toEqual('baz');
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
