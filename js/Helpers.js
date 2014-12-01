function joinUrlWithQuery(url, query) {
    if (!query || !Object.keys(query).length) {
        return url;
    }
    var joiner = (url.indexOf('?') > -1) ? '&' : '?';
    return url + joiner + serializeObject(query);
}
exports.joinUrlWithQuery = joinUrlWithQuery;
function serializeObject(obj) {
    return Object.keys(obj).map(function (key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}
exports.serializeObject = serializeObject;
