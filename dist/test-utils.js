require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TestUtils":[function(require,module,exports){
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

},{}]},{},[]);
