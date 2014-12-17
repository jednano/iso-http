/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var TestUtils = require('./TestUtils');
describe('TestUtils', function () {
    describe('getApiPath()', function () {
        var getApiPath = TestUtils.getApiPath;
        it('prepends a string with http://localhost:3000', function () {
            expect(getApiPath('/foo')).toEqual('http://localhost:3000/foo');
        });
    });
    describe('FakeHttp.request()', function () {
        var request = TestUtils.FakeHttp.request;
        it('returns an instance of FakeHttp.Agent', function () {
            var req = request('foo');
            expect(req instanceof TestUtils.FakeHttp.Agent).toBe(true);
        });
        it('fakes a resolved HTTP response with respondWith', function (done) {
            var fakeResponse = {
                status: 123,
                headers: { foo: 'bar' },
                text: 'baz'
            };
            var req = request('foo', {
                onResponse: function (response) {
                    expect(response).toEqual(fakeResponse);
                    done();
                }
            });
            req.respondWith(fakeResponse);
        });
        it('fakes a client-rejected HTTP request with errorWith', function (done) {
            var req = request('bar', {
                method: 'foo',
                onClientError: function (error) {
                    expect(error.method).toEqual('FOO');
                    expect(error.url).toEqual('bar');
                    expect(error.message).toEqual('iso-http: baz');
                    done();
                }
            });
            req.errorWith(new Error('baz'));
        });
    });
});
