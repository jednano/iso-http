require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"iso-http/fake":[function(require,module,exports){
module.exports = require('./js/test/TestUtils').FakeHttp;

},{"./js/test/TestUtils":3}],1:[function(require,module,exports){
function joinUrlWithQuery(url, query) {
    if (!query || !Object.keys(query).length) {
        return url;
    }
    var joiner = (url.indexOf('?') > -1) ? '&' : '?';
    return url + joiner + serializeObject(query);
}
exports.joinUrlWithQuery = joinUrlWithQuery;
function lowercaseKeys(object) {
    var lowercased = {};
    Object.keys(object).forEach(function (key) {
        lowercased[key.toLowerCase()] = object[key];
    });
    return lowercased;
}
exports.lowercaseKeys = lowercaseKeys;
function serializeObject(obj) {
    return Object.keys(obj).map(function (key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}
exports.serializeObject = serializeObject;
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
exports.assert = assert;
function isUndefined(o) {
    return typeof o === 'undefined';
}
exports.isUndefined = isUndefined;
function isPlainObject(o) {
    if (typeof o === 'object' && o) {
        return o.constructor === Object;
    }
    return false;
}
exports.isPlainObject = isPlainObject;
function isFunction(fn) {
    return typeof fn === 'function';
}
exports.isFunction = isFunction;
function noop() {
    // noop
}
exports.noop = noop;

},{}],2:[function(require,module,exports){
var _ = require('./Helpers');
var IsoHttp;
(function (IsoHttp) {
    var Agent = (function () {
        function Agent(url, options) {
            this.url = url;
            this.hasErrors = false;
            this.nullResponse = {
                status: 0,
                headers: {},
                text: ''
            };
            options = options || {};
            this.onClientError = this.wrapClientErrorCallback(options.onClientError);
            this.onResponse = this.wrapResponseCallback(options.onResponse);
            try {
                this.validateRequest(options);
                this.method = (options.method || 'GET').toUpperCase();
                this.headers = options.headers || {};
                this.withCredentials = !!options.withCredentials;
                this.data = options.data || {};
            }
            catch (error) {
                this.onError(error);
            }
        }
        Agent.prototype.wrapClientErrorCallback = function (onClientError) {
            return this.wrapTryCatch(onClientError || _.noop, _.noop);
        };
        Agent.prototype.wrapTryCatch = function (tryFunction, onCatch) {
            var _this = this;
            return function () {
                try {
                    tryFunction.apply(_this, arguments);
                }
                catch (err) {
                    onCatch(err);
                }
            };
        };
        Agent.prototype.wrapResponseCallback = function (onResponse) {
            onResponse = onResponse || _.noop;
            return this.wrapTryCatch(function (response) {
                response.headers = _.lowercaseKeys(response.headers);
                onResponse(response);
            }, this.onError);
        };
        Agent.prototype.onError = function (error) {
            this.hasErrors = true;
            if (!error) {
                error = new Error();
            }
            error.url = this.url;
            error.method = this.method;
            if (error.message) {
                error.message = 'iso-http: ' + error.message;
            }
            else {
                error.message = 'Unknown error in iso-http module.';
            }
            this.onClientError(error);
            this.onResponse(this.nullResponse);
        };
        Agent.prototype.validateRequest = function (options) {
            _.assert(this.url, 'Null or undefined URL in request.');
            _.assert(_.isPlainObject(options), 'Request options must be a plain object.');
            _.assert(_.isFunction(this.onResponse), 'Response callback must be a function.');
            _.assert(_.isFunction(this.onClientError), 'Client error callback must be a function.');
        };
        return Agent;
    })();
    IsoHttp.Agent = Agent;
})(IsoHttp || (IsoHttp = {}));
module.exports = IsoHttp;

},{"./Helpers":1}],3:[function(require,module,exports){
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
                var url = getApiPath('/' + status);
                request(url, {
                    onResponse: function (response) {
                        expect(response.status).toEqual(status);
                        expect(response.text).toEqual(statusCodes[status]);
                        done();
                    }
                });
            });
        });
        it('handles a 200 w/o a resolve callback', function () {
            var fn = function () {
                request(getApiPath('/foo'));
            };
            expect(fn).not.toThrowError();
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

},{"../IsoHttp":2}]},{},[]);
