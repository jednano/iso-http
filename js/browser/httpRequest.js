/* istanbul ignore next: TypeScript extend */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Helpers = require('../Helpers');
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
        this.tryCreateXhr();
        if (this.hasErrors) {
            return;
        }
        this.open();
        this.setCors();
        this.setXhrHeaders();
    }
    Agent.prototype.tryCreateXhr = function () {
        try {
            this.xhr = new XMLHttpRequest();
        }
        catch (err) {
            this.onError(new Error('Unsupported browser: Failed to create XHR object.'));
        }
    };
    Agent.prototype.open = function () {
        var url = (this.method === 'GET') ? Helpers.joinUrlWithQuery(this.url, this.data) : this.url;
        this.xhr.open(this.method, url, true);
    };
    Agent.prototype.setCors = function () {
        if (this.withCredentials) {
            this.xhr.withCredentials = true;
        }
    };
    Agent.prototype.setXhrHeaders = function () {
        var _this = this;
        Object.keys(this.headers).forEach(function (fieldName) {
            _this.xhr.setRequestHeader(fieldName, _this.headers[fieldName]);
        });
    };
    Agent.prototype.send = function () {
        var _this = this;
        if (this.hasErrors) {
            return;
        }
        var xhr = this.xhr;
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status === 0) {
                _this.onError();
                return;
            }
            _this.onResponse({
                status: xhr.status,
                headers: _this.parseHeaders(xhr.getAllResponseHeaders()),
                text: xhr.responseText
            });
        };
        var data = this.method !== 'GET' && JSON.stringify(this.data);
        xhr.send(data);
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
