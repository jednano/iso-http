var TestUtils;
(function (TestUtils) {
    function getApiPath(path) {
        return 'http://localhost:3000' + path;
    }
    TestUtils.getApiPath = getApiPath;
    function isPlainObject(obj) {
        if (typeof obj === 'object' && obj) {
            return obj.constructor === Object;
        }
        return false;
    }
    TestUtils.isPlainObject = isPlainObject;
    /* istanbul ignore next: function not covered */
    function noop() {
        // noop
    }
    TestUtils.noop = noop;
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
                    url: getApiPath('/' + status)
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
                url: getApiPath('/foo')
            };
            var fn = function () {
                request(options);
            };
            expect(fn).not.toThrowError();
        });
        it('responds with headers as an object literal', function (done) {
            var options = {
                url: getApiPath('/not-found')
            };
            request(options, function (response) {
                expect(isPlainObject(response.headers)).toBe(true);
                done();
            });
        });
        it('rejects a client error', function (done) {
            var options = {
                url: 'http://foo.bar.baz/qux'
            };
            request(options, noop, function (err) {
                expect(err instanceof Error).toBe(true);
                expect(err.method).toEqual('GET');
                expect(err.url).toEqual('http://foo.bar.baz/qux');
                done();
            });
        });
    }
    TestUtils.runIsomorphicTests = runIsomorphicTests;
})(TestUtils || (TestUtils = {}));
module.exports = TestUtils;
