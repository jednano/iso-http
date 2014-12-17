/// <reference path="../../bower_components/dt-node/node.d.ts" />
/* istanbul ignore next: TypeScript extend */

import IsoHttp = require('../IsoHttp');
import http = require('http');
import url = require('url');

function httpRequest(url: string, options?: IsoHttp.RequestOptions) {
	new Agent(url, options).send();
}

class Agent extends IsoHttp.Agent {

	private request: http.ClientRequest;

	constructor(protected url: string, options?: IsoHttp.RequestOptions) {
		super(url, options);
		if (this.hasErrors) {
			return;
		}
		this.open();
	}

	private open() {
		var parsedUrl = url.parse(this.url);
		var options: any = {
			host: parsedUrl.host,
			hostname: parsedUrl.hostname,
			method: this.method,
			path: parsedUrl.path,
			headers: this.headers
		};
		/* istanbul ignore else */
		if (parsedUrl.port) {
			options.port = parseInt(parsedUrl.port, 10);
		}
		this.request = http.request(options, response => {
			response.setEncoding('utf8');
			response.on('data', text => {
				this.onResponse({
					status: response.statusCode,
					headers: response.headers,
					text: text
				});
			});
		});
		this.request.on('error', this.onError.bind(this));
	}

	send() {
		this.request.end();
	}

}

export = httpRequest;
