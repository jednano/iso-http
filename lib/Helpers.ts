export function joinUrlWithQuery(url: string, query?: {}) {
	if (!query || !Object.keys(query).length) {
		return url;
	}
	var joiner = (url.indexOf('?') > -1) ? '&' : '?';
	return url + joiner + serializeObject(query);
}

export function serializeObject(obj: {}) {
	return Object.keys(obj).map(key => {
		return key + '=' + encodeURIComponent(obj[key]);
	}).join('&');
}
