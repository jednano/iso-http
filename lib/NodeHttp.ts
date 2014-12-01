/// <reference path="../bower_components/dt-node/node.d.ts" />
/* istanbul ignore next: TypeScript extend */

import IsoHttp = require('./IsoHttp');
import http = require('http');
import url = require('url');

module NodeHttp {

	export function request(
		options: IsoHttp.RequestOptions,
		resolve?: IsoHttp.ResolveCallback,
		reject?: IsoHttp.RejectCallback) {
		new Agent(options).send(resolve, reject);
	}

	export class Agent extends IsoHttp.Agent {

		send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback) {
			var parsedUrl = url.parse(this.url);
			var options: any = {
				host: parsedUrl.host,
				hostname: parsedUrl.hostname,
				method: this.method,
				path: parsedUrl.path,
				headers: this.headers,
			};
			/* istanbul ignore else */
			if (parsedUrl.port) {
				options.port = parseInt(parsedUrl.port, 10);
			}
			var req = http.request(options, response => {
				if (typeof resolve !== 'function') {
					return;
				}
				response.setEncoding('utf8');
				response.on('data', text => {
					resolve({
						status: response.statusCode,
						headers: response.headers,
						text: text
					});
				});
			});
			if (typeof reject === 'function') {
				req.on('error', err => {
					reject(this.addRequestInfo(err));
				});
			}
			req.end();
		}

	}

}

export = NodeHttp;
