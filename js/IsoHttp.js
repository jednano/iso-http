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
