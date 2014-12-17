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
