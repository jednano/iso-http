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
                var options = {
                    url: getApiPath('/' + status)
                };
                request(options, function (response) {
                    expect(response.status).toEqual(parseInt(status, 10));
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
    var FakeHttp;
    (function (FakeHttp) {
        function request(options, resolve, reject) {
            return new Agent(options).send(resolve, reject);
        }
        FakeHttp.request = request;
        var Agent = (function (_super) {
            __extends(Agent, _super);
            function Agent() {
                _super.apply(this, arguments);
            }
            Agent.prototype.send = function (resolve, reject) {
                this.resolve = resolve;
                this.reject = reject;
                return this;
            };
            Agent.prototype.respondWith = function (response) {
                if (typeof this.resolve === 'function') {
                    this.resolve(response);
                }
            };
            Agent.prototype.rejectWith = function (err) {
                if (typeof this.reject === 'function') {
                    this.reject(this.addRequestInfo(err));
                }
            };
            return Agent;
        })(IsoHttp.Agent);
        FakeHttp.Agent = Agent;
    })(FakeHttp = TestUtils.FakeHttp || (TestUtils.FakeHttp = {}));
})(TestUtils || (TestUtils = {}));
module.exports = TestUtils;
