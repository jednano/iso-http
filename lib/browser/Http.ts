import Helpers = require('../Helpers');
import IsoHttp = require('../IsoHttp');
import Types = require('../Types');

module Http {

	export function request(
		options: IsoHttp.RequestOptions,
		resolve?: IsoHttp.ResolveCallback,
		reject?: IsoHttp.RejectCallback) {
		new Agent(options).send(resolve, reject);
	}

	export class Agent extends IsoHttp.Agent {

		constructor(options?: IsoHttp.RequestOptions) {
			super(options);
			var xrw = 'x-requested-with';
			this.headers[xrw] = this.headers[xrw] || 'XMLHttpRequest';
		}

		send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback) {
			var url = (this.method === 'GET')
				? Helpers.joinUrlWithQuery(this.url, this.data)
				: this.url;
			var xhr = this.createXhr();
			xhr.open(this.method, url, true);
			if (this.withCredentials) {
				xhr.withCredentials = true;
			}
			this.setXhrHeaders(xhr, this.headers);
			xhr.onreadystatechange = () => {
				if (xhr.readyState !== 4) {
					return;
				}
				if (xhr.status === 0) {
					reject(this.addRequestInfo(new Error('Unspecified client error.')));
					return;
				}
				if (typeof resolve !== 'function') {
					return;
				}
				resolve({
					status: xhr.status,
					headers: this.parseHeaders(xhr.getAllResponseHeaders()),
					text: xhr.responseText
				});
			};
			xhr.send(this.method !== 'GET' && JSON.stringify(this.data));
		}

		private setXhrHeaders(xhr: XMLHttpRequest, headers: Types.HashTable<string>) {
			Object.keys(headers).forEach(name => {
				xhr.setRequestHeader(name, headers[name]);
			});
		}

		private createXhr(): XMLHttpRequest {
			try {
				return new XMLHttpRequest();
			} catch (err) {
				throw new Error('Unsupported browser: Failed to create XHR object.');
			}
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

}

export = Http;
