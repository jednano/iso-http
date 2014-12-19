import _ = require('../Utils');
import IsoHttp = require('../IsoHttp');
import Types = require('../Types');

function httpRequest(url: string, options?: IsoHttp.RequestOptions) {
	new Agent(url, options).send();
}

class Agent extends IsoHttp.Agent {

	private request: any;

	constructor(protected url: string, options?: IsoHttp.RequestOptions) {
		super(url, options);
		var xrw = 'x-requested-with';
		this.headers[xrw] = this.headers[xrw] || 'XMLHttpRequest';
		this.request = this.createRequest();
		if (!this.request) {
			this.onError(new Error('Unsupported browser. Failed to create XMLHttpRequest.'));
			return;
		}
		this.open();
		this.setCors();
		this.setXhrHeaders();
		this.attachHandlers();
	}

	private createRequest(): any {
		if (this.crossDomain
			&& _.isUndefined(XMLHttpRequest.prototype.withCredentials)
			&& !_.isUndefined(XDomainRequest)) {
			return new XDomainRequest();
		}
		return new XMLHttpRequest();
	}

	private open() {
		var url = (this.method === 'GET')
			? _.joinUrlWithQuery(this.url, this.data)
			: this.url;
		this.request.open(this.method, url, true);
	}

	private setCors() {
		if (this.crossDomain && this.request instanceof XMLHttpRequest) {
			this.request.withCredentials = true;
		}
	}

	private setXhrHeaders() {
		Object.keys(this.headers).forEach(fieldName => {
			this.request.setRequestHeader(fieldName, this.headers[fieldName]);
		});
	}

	private attachHandlers() {
		var request = this.request;
		request.onload = () => {
			this.onResponse({
				status: request.status,
				headers: this.parseHeaders(request.getAllResponseHeaders()),
				text: request.responseText
			});
		};
		request.onerror = () => {
			this.onError();
		};
	}

	send() {
		if (this.hasErrors) {
			return;
		}
		var data = this.method !== 'GET' && JSON.stringify(this.data);
		this.request.send(data);
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
