/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var TestHelpers = require('./TestHelpers');
function runIsomorphicTests(request) {
    var statusCodes = {
        200: 'foo',
        500: 'fail',
        404: 'Cannot GET /404\n'
    };
    Object.keys(statusCodes).forEach(function (statusCode) {
        var status = parseInt(statusCode, 10);
        it('handles a ' + status, function (done) {
            var options = {
                url: TestHelpers.getApiPath('/' + status)
            };
            request(options, function (response) {
                expect(response.status).toEqual(status);
                expect(response.text).toEqual(statusCodes[status]);
                done();
            });
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
module.exports = runIsomorphicTests;
