/* istanbul ignore next: TypeScript extend */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoHttp = require('./IsoHttp');
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
})(FakeHttp || (FakeHttp = {}));
module.exports = FakeHttp;
