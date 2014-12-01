/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var TestHelpers = require('./TestHelpers');
function runIsomorphicTests(request) {
    it('handles a 200', function (done) {
        var options = {
            url: TestHelpers.getApiPath('/foo')
        };
        request(options, function (response) {
            expect(response.status).toEqual(200);
            expect(response.text).toEqual('bar');
            done();
        });
    });
    it('handles a 200 w/o a resolve callback', function () {
        var options = {
            url: TestHelpers.getApiPath('/foo')
        };
        var fn = function () {
            request(options);
        };
        expect(fn).not.toThrowError();
    });
    it('handles a 500', function (done) {
        var options = {
            url: TestHelpers.getApiPath('/error')
        };
        request(options, function (response) {
            expect(response.status).toEqual(500);
            expect(response.text).toEqual('fail');
            done();
        });
    });
    it('handles a 404', function (done) {
        var options = {
            url: TestHelpers.getApiPath('/not-found')
        };
        request(options, function (response) {
            expect(response.status).toEqual(404);
            done();
        });
    });
    it('responds with headers as an object literal', function (done) {
        var options = {
            url: TestHelpers.getApiPath('/not-found')
        };
        request(options, function (response) {
            expect(TestHelpers.isPlainObject(response.headers)).toBe(true);
            done();
        });
    });
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestHelpers.noop, function (err) {
            expect(err instanceof Error).toBe(true);
            expect(err.method).toEqual('GET');
            expect(err.url).toEqual('http://foo.bar.baz/qux');
            done();
        });
    });
}
;
module.exports = runIsomorphicTests;
