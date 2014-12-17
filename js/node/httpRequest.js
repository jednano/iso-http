/// <reference path="../../bower_components/dt-node/node.d.ts" />
/* istanbul ignore next: TypeScript extend */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoHttp = require('../IsoHttp');
var http = require('http');
var url = require('url');
function httpRequest(url, options) {
    new Agent(url, options).send();
}
var Agent = (function (_super) {
    __extends(Agent, _super);
    function Agent(url, options) {
        _super.call(this, url, options);
        this.url = url;
        if (this.hasErrors) {
            return;
        }
        this.open();
    }
    Agent.prototype.open = function () {
        var _this = this;
        var parsedUrl = url.parse(this.url);
        var options = {
            host: parsedUrl.host,
            hostname: parsedUrl.hostname,
            method: this.method,
            path: parsedUrl.path,
            headers: this.headers
        };
        /* istanbul ignore else */
        if (parsedUrl.port) {
            options.port = parseInt(parsedUrl.port, 10);
        }
        this.request = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (text) {
                _this.onResponse({
                    status: response.statusCode,
                    headers: response.headers,
                    text: text
                });
            });
        });
        this.request.on('error', this.onError.bind(this));
    };
    Agent.prototype.send = function () {
        this.request.end();
    };
    return Agent;
})(IsoHttp.Agent);
module.exports = httpRequest;
