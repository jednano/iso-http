import _ = require('./Helpers');

module IsoHttp {

	export interface Request {
		(url: string, options?: RequestOptions): void;
	}

	export interface RequestOptions {
		method?: string;
		headers?: any;
		data?: any;
		withCredentials?: boolean;
		onResponse?: ResponseCallback;
		onClientError?: ClientErrorCallback;
	}

	export interface ResponseCallback {
		(response: Response): void;
	}

	export interface Response {
		headers: any;
		status: number;
		text: string;
	}

	export interface ClientErrorCallback {
		(clientError: ClientError): void;
	}

	export interface ClientError extends Error {
		method: string;
		url: string;
	}

	export class Agent {

		protected method: string;
		protected headers: any;
		protected withCredentials: boolean;
		protected data: any;
		protected onResponse: ResponseCallback;
		protected onClientError: ClientErrorCallback;
		protected hasErrors = false;
		private nullResponse = {
			status: 0,
			headers: {},
			text: ''
		};

		constructor(protected url: string, options?: RequestOptions) {
			options = options || {};
			this.onClientError = this.wrapClientErrorCallback(options.onClientError);
			this.onResponse = this.wrapResponseCallback(options.onResponse);
			try {
				this.validateRequest(options);
				this.method = (options.method || 'GET').toUpperCase();
				this.headers = options.headers || {};
				this.withCredentials = !!options.withCredentials;
				this.data = options.data || {};
			} catch (error) {
				this.onError(error);
			}
		}

		private wrapClientErrorCallback(onClientError?: ClientErrorCallback) {
			return this.wrapTryCatch(
				onClientError || _.noop,
				_.noop
			);
		}

		private wrapTryCatch(tryFunction: Function, onCatch): any {
			return () => {
				try {
					tryFunction.apply(this, arguments);
				} catch (err) {
					onCatch(err);
				}
			};
		}

		private wrapResponseCallback(onResponse?: ResponseCallback) {
			onResponse = onResponse || _.noop;
			return this.wrapTryCatch((response: Response) => {
				response.headers = _.lowercaseKeys(response.headers);
				onResponse(response);
			}, this.onError);
		}

		protected onError(error?: any) {
			this.hasErrors = true;
			if (!error) {
				error = new Error();
			}
			error.url = this.url;
			error.method = this.method;
			if (error.message) {
				error.message = 'iso-http: ' + error.message;
			} else {
				error.message = 'Unknown error in iso-http module.';
			}
			this.onClientError(error);
			this.onResponse(this.nullResponse);
		}

		private validateRequest(options: RequestOptions) {
			_.assert(this.url, 'Null or undefined URL in request.');
			_.assert(
				_.isPlainObject(options),
				'Request options must be a plain object.'
			);
			_.assert(
				_.isFunction(this.onResponse),
				'Response callback must be a function.'
			);
			_.assert(
				_.isFunction(this.onClientError),
				'Client error callback must be a function.'
			);
		}

	}

}

export = IsoHttp;
