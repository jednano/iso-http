import Types = require('./Types');

module IsoHttp {

	export interface Request {
		(options: RequestOptions, resolve?: ResolveCallback, reject?: RejectCallback): void;
	}

	export interface ResolveCallback {
		(response: Response): void;
	}

	export interface RejectCallback {
		(error: ClientError): void;
	}

	export class Agent {

		protected url: string;
		protected method: string;
		protected headers: Types.HashTable<string> = {};
		protected data: Types.HashTable<string>;
		protected withCredentials: boolean;

		get contentType() {
			return this.headers['content-type'];
		}

		set contentType(value: string) {
			this.headers['content-type'] = value;
		}

		constructor(options: RequestOptions) {
			if (!options || !Object.keys(options).length) {
				throw new Error('Missing options.');
			}
			if (!options.url) {
				throw new Error('Missing required option: url.');
			}
			this.url = options.url;
			this.method = (options.method || 'GET').toUpperCase();
			if (options.headers) {
				this.setHeaders(options.headers);
			}
			if (options.contentType) {
				this.contentType = options.contentType;
			}
			this.withCredentials = options.withCredentials || false;
			this.data = options.data || {};
		}

		setHeaders(headers: Types.HashTable<string>) {
			Object.keys(headers).forEach(fieldName => {
				this.headers[fieldName] = headers[fieldName];
			});
		}

		send(resolve?: ResolveCallback, reject?: RejectCallback): void {
			throw new Error('Not implemented.');
		}

		protected addRequestInfo(err: Error): ClientError {
			var result = <any>err;
			result.method = this.method;
			result.url = this.url;
			return result;
		}

	}

	export interface Response {
		headers: any;
		status: number;
		text: string;
	}

	export interface RequestOptions {
		contentType?: string;
		data?: any;
		headers?: any;
		method?: string;
		url: string;
		withCredentials?: boolean;
	}

	export interface ClientError extends Error {
		method: string;
		url: string;
	}

}

export = IsoHttp;
