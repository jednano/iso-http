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
