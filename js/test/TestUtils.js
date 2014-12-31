/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoHttp = require('../IsoHttp');
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
            500: 'fail'
        };
        Object.keys(statusCodes).forEach(function (status) {
            it('handles a ' + status, function (done) {
                var url = getApiPath('/' + status);
                request(url, {
                    onResponse: function (response) {
                        expect(response.status).toEqual(parseInt(status, 10));
                        expect(response.text).toEqual(statusCodes[status]);
                        done();
                    }
                });
            });
        });
        it('handles a 200 w/o a response callback', function () {
            expect(function () {
                request(getApiPath('/foo'));
            }).not.toThrowError();
        });
        it('responds with headers as an object literal', function (done) {
            request(getApiPath('/not-found'), {
                onResponse: function (response) {
                    expect(isPlainObject(response.headers)).toBe(true);
                    done();
                }
            });
        });
        it('rejects a client error', function (done) {
            request('http://foo.bar.baz/qux', {
                onClientError: function (error) {
                    expect(error instanceof Error).toBe(true);
                    expect(error.method).toEqual('GET');
                    expect(error.url).toEqual('http://foo.bar.baz/qux');
                    done();
                }
            });
        });
    }
    TestUtils.runIsomorphicTests = runIsomorphicTests;
    var FakeHttp;
    (function (FakeHttp) {
        function request(url, options) {
            return new Agent(url, options);
        }
        FakeHttp.request = request;
        var Agent = (function (_super) {
            __extends(Agent, _super);
            function Agent() {
                _super.apply(this, arguments);
            }
            Agent.prototype.respondWith = function (response) {
                this.onResponse(response);
            };
            Agent.prototype.errorWith = function (error) {
                this.onError(error);
            };
            return Agent;
        })(IsoHttp.Agent);
        FakeHttp.Agent = Agent;
    })(FakeHttp = TestUtils.FakeHttp || (TestUtils.FakeHttp = {}));
})(TestUtils || (TestUtils = {}));
module.exports = TestUtils;
