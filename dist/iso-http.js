require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"iso-http":[function(require,module,exports){
/* istanbul ignore next: TypeScript extend */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _ = require('../Utils');
var IsoHttp = require('../IsoHttp');
function httpRequest(url, options) {
    new Agent(url, options).send();
}
var Agent = (function (_super) {
    __extends(Agent, _super);
    function Agent(url, options) {
        _super.call(this, url, options);
        this.url = url;
        var xrw = 'x-requested-with';
        this.headers[xrw] = this.headers[xrw] || 'XMLHttpRequest';
        this.request = this.createRequest();
        if (!this.request) {
            this.onError(new Error('Unsupported browser. Failed to create XMLHttpRequest.'));
            return;
        }
        this.open();
        this.setCors();
        this.setXhrHeaders();
        this.attachHandlers();
    }
    Agent.prototype.createRequest = function () {
        if (this.crossDomain && _.isUndefined(XMLHttpRequest.prototype.withCredentials) && !_.isUndefined(XDomainRequest)) {
            return new XDomainRequest();
        }
        return new XMLHttpRequest();
    };
    Agent.prototype.open = function () {
        var url = (this.method === 'GET') ? _.joinUrlWithQuery(this.url, this.data) : this.url;
        this.request.open(this.method, url, true);
    };
    Agent.prototype.setCors = function () {
        if (this.crossDomain && this.request instanceof XMLHttpRequest) {
            this.request.withCredentials = true;
        }
    };
    Agent.prototype.setXhrHeaders = function () {
        var _this = this;
        Object.keys(this.headers).forEach(function (fieldName) {
            _this.request.setRequestHeader(fieldName, _this.headers[fieldName]);
        });
    };
    Agent.prototype.attachHandlers = function () {
        var _this = this;
        var request = this.request;
        request.onload = function () {
            _this.onResponse({
                status: request.status,
                headers: _this.parseHeaders(request.getAllResponseHeaders()),
                text: request.responseText
            });
        };
        request.onerror = function () {
            _this.onError();
        };
    };
    Agent.prototype.send = function () {
        if (this.hasErrors) {
            return;
        }
        var data = this.method !== 'GET' && JSON.stringify(this.data);
        this.request.send(data);
    };
    Agent.prototype.parseHeaders = function (headers) {
        var lines = headers.split(/\r?\n/);
        lines.pop(); // final newline
        var fields = {};
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var pos = line.indexOf(':');
            var field = line.slice(0, pos).toLowerCase();
            var value = line.slice(pos + 1).trim();
            fields[field] = value;
        }
        return fields;
    };
    return Agent;
})(IsoHttp.Agent);
module.exports = httpRequest;

},{"../IsoHttp":1,"../Utils":2}],1:[function(require,module,exports){
var _ = require('./Utils');
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
                this.crossDomain = !!options.crossDomain;
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
            }, this.onError.bind(this));
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

},{"./Utils":2}],2:[function(require,module,exports){
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

},{}]},{},[]);
