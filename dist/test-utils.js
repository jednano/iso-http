require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TestUtils":[function(require,module,exports){
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

},{"../IsoHttp":1}],1:[function(require,module,exports){
var IsoHttp;
(function (IsoHttp) {
    var Agent = (function () {
        function Agent(options) {
            this.headers = {};
            if (!options || !Object.keys(options).length) {
                throw new Error('Missing options.');
            }
            if (!options.url) {
                throw new Error('Missing required option: url.');
            }
            this.url = options.url;
            this.method = (options.method || 'GET').toUpperCase();
            if (options.headers) {
                this.setHeaders(options.headers);
            }
            if (options.contentType) {
                this.contentType = options.contentType;
            }
            this.withCredentials = options.withCredentials || false;
            this.data = options.data || {};
        }
        Object.defineProperty(Agent.prototype, "contentType", {
            get: function () {
                return this.headers['content-type'];
            },
            set: function (value) {
                this.headers['content-type'] = value;
            },
            enumerable: true,
            configurable: true
        });
        Agent.prototype.setHeaders = function (headers) {
            var _this = this;
            Object.keys(headers).forEach(function (fieldName) {
                _this.headers[fieldName] = headers[fieldName];
            });
        };
        Agent.prototype.send = function (resolve, reject) {
            throw new Error('Not implemented.');
        };
        Agent.prototype.addRequestInfo = function (err) {
            var result = err;
            result.method = this.method;
            result.url = this.url;
            return result;
        };
        return Agent;
    })();
    IsoHttp.Agent = Agent;
})(IsoHttp || (IsoHttp = {}));
module.exports = IsoHttp;

},{}]},{},[]);
