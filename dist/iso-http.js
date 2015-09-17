require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function joinUrlWithQuery(url, query) {
    if (!query || !Object.keys(query).length) {
        return url;
    }
    var joiner = (url.indexOf('?') > -1) ? '&' : '?';
    return url + joiner + serializeObject(query);
}
exports.joinUrlWithQuery = joinUrlWithQuery;
function serializeObject(obj) {
    return Object.keys(obj).map(function (key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}
exports.serializeObject = serializeObject;

},{}],2:[function(require,module,exports){
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

},{}],"iso-http":[function(require,module,exports){
/* istanbul ignore next: TypeScript extend */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Helpers = require('../Helpers');
var IsoHttp = require('../IsoHttp');
var Http;
(function (Http) {
    function request(options, resolve, reject) {
        new Agent(options).send(resolve, reject);
    }
    Http.request = request;
    var Agent = (function (_super) {
        __extends(Agent, _super);
        function Agent(options) {
            _super.call(this, options);
            var xrw = 'x-requested-with';
            this.headers[xrw] = this.headers[xrw] || 'XMLHttpRequest';
        }
        Agent.prototype.send = function (resolve, reject) {
            var _this = this;
            var url = (this.method === 'GET')
                ? Helpers.joinUrlWithQuery(this.url, this.data)
                : this.url;
            var xhr = this.createXhr();
            xhr.open(this.method, url, true);
            if (this.withCredentials) {
                xhr.withCredentials = true;
            }
            this.setXhrHeaders(xhr, this.headers);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status === 0 && typeof reject === 'function') {
                    reject(_this.addRequestInfo(new Error('Unspecified client error.')));
                    return;
                }
                if (typeof resolve !== 'function') {
                    return;
                }
                resolve({
                    status: xhr.status,
                    headers: _this.parseHeaders(xhr.getAllResponseHeaders()),
                    text: xhr.responseText
                });
            };
            xhr.send(this.method !== 'GET' && JSON.stringify(this.data));
        };
        Agent.prototype.setXhrHeaders = function (xhr, headers) {
            Object.keys(headers).forEach(function (name) {
                xhr.setRequestHeader(name, headers[name]);
            });
        };
        Agent.prototype.createXhr = function () {
            try {
                return new XMLHttpRequest();
            }
            catch (err) {
                throw new Error('Unsupported browser: Failed to create XHR object.');
            }
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
    Http.Agent = Agent;
})(Http || (Http = {}));
module.exports = Http;

},{"../Helpers":1,"../IsoHttp":2}]},{},[]);
