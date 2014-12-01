export function getApiPath(path: string) {
	return 'http://localhost:3000' + path;
}

export function isPlainObject(obj: Object) {
	if (typeof obj === 'object' && obj) {
		return obj.constructor === Object;
	}
	return false;
}

/* istanbul ignore next: function not covered */
export function noop() {
	// noop
}
