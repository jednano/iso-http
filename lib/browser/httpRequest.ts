import Helpers = require('../Helpers');
import IsoHttp = require('../IsoHttp');
import Types = require('../Types');

function httpRequest(url: string, options?: IsoHttp.RequestOptions) {
	new Agent(url, options).send();
}

class Agent extends IsoHttp.Agent {

	private xhr: XMLHttpRequest;

	constructor(protected url: string, options?: IsoHttp.RequestOptions) {
		super(url, options);
		var xrw = 'x-requested-with';
		this.headers[xrw] = this.headers[xrw] || 'XMLHttpRequest';
		this.tryCreateXhr();
		if (this.hasErrors) {
			return;
		}
		this.open();
		this.setCors();
		this.setXhrHeaders();
	}

	private tryCreateXhr() {
		try {
			this.xhr = new XMLHttpRequest();
		} catch (err) {
			this.onError(new Error('Unsupported browser: Failed to create XHR object.'));
		}
	}

	private open() {
		var url = (this.method === 'GET')
			? Helpers.joinUrlWithQuery(this.url, this.data)
			: this.url;
		this.xhr.open(this.method, url, true);
	}

	private setCors() {
		if (this.withCredentials) {
			this.xhr.withCredentials = true;
		}
	}

	private setXhrHeaders() {
		Object.keys(this.headers).forEach(fieldName => {
			this.xhr.setRequestHeader(fieldName, this.headers[fieldName]);
		});
	}

	send() {
		if (this.hasErrors) {
			return;
		}
		var xhr = this.xhr;
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status === 0) {
				this.onError();
				return;
			}
			this.onResponse({
				status: xhr.status,
				headers: this.parseHeaders(xhr.getAllResponseHeaders()),
				text: xhr.responseText
			});
		};
		var data = this.method !== 'GET' && JSON.stringify(this.data);
		xhr.send(data);
	}

	private parseHeaders(headers: string) {
		var lines = headers.split(/\r?\n/);
		lines.pop(); // final newline
		var fields: Types.HashTable<string> = {};
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var pos = line.indexOf(':');
			var field = line.slice(0, pos).toLowerCase();
			var value = line.slice(pos + 1).trim();
			fields[field] = value;
		}
		return fields;
	}

}

export = httpRequest;
