function getApiPath(path) {
    return 'http://localhost:3000' + path;
}
exports.getApiPath = getApiPath;
function isPlainObject(obj) {
    if (typeof obj === 'object' && obj) {
        return obj.constructor === Object;
    }
    return false;
}
exports.isPlainObject = isPlainObject;
/* istanbul ignore next: function not covered */
function noop() {
    // noop
}
exports.noop = noop;
