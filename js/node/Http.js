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
var Http;
(function (Http) {
    function request(options, resolve, reject) {
        new Agent(options).send(resolve, reject);
    }
    Http.request = request;
    var Agent = (function (_super) {
        __extends(Agent, _super);
        function Agent() {
            _super.apply(this, arguments);
        }
        Agent.prototype.send = function (resolve, reject) {
            var _this = this;
            var parsedUrl = url.parse(this.url);
            var options = {
                host: parsedUrl.host,
                hostname: parsedUrl.hostname,
                method: this.method,
                path: parsedUrl.path,
                headers: this.headers,
            };
            /* istanbul ignore else */
            if (parsedUrl.port) {
                options.port = parseInt(parsedUrl.port, 10);
            }
            var req = http.request(options, function (response) {
                if (typeof resolve !== 'function') {
                    return;
                }
                response.setEncoding('utf8');
                response.on('data', function (text) {
                    resolve({
                        status: response.statusCode,
                        headers: response.headers,
                        text: text
                    });
                });
            });
            if (typeof reject === 'function') {
                req.on('error', function (err) {
                    reject(_this.addRequestInfo(err));
                });
            }
            req.end();
        };
        return Agent;
    })(IsoHttp.Agent);
    Http.Agent = Agent;
})(Http || (Http = {}));
module.exports = Http;
