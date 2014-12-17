export function joinUrlWithQuery(url: string, query?: {}) {
	if (!query || !Object.keys(query).length) {
		return url;
	}
	var joiner = (url.indexOf('?') > -1) ? '&' : '?';
	return url + joiner + serializeObject(query);
}

export function lowercaseKeys(object: any) {
	var lowercased = {};
	Object.keys(object).forEach(key => {
		lowercased[key.toLowerCase()] = object[key];
	});
	return lowercased;
}

export function serializeObject(obj: {}) {
	return Object.keys(obj).map(key => {
		return key + '=' + encodeURIComponent(obj[key]);
	}).join('&');
}

export function assert(condition: any, message?: string) {
	if (!condition) {
		throw new Error(message);
	}
}

export function isUndefined(o?: any) {
	return typeof o === 'undefined';
}

export function isPlainObject(o?: any) {
	if (typeof o === 'object' && o) {
		return o.constructor === Object;
	}
	return false;
}

export function isFunction(fn?: Function) {
	return typeof fn === 'function';
}

export function noop() {
	// noop
}
