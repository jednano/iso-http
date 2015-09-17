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
