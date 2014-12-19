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
