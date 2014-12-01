import IsoHttp = require('./IsoHttp');

module FakeHttp {

	export function request(
		options?: IsoHttp.RequestOptions,
		resolve?: IsoHttp.ResolveCallback,
		reject?: IsoHttp.RejectCallback) {
		return new Agent(options).send(resolve, reject);
	}

	export class Agent extends IsoHttp.Agent {

		private resolve: IsoHttp.ResolveCallback;
		private reject: IsoHttp.RejectCallback;

		send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback) {
			this.resolve = resolve;
			this.reject = reject;
			return this;
		}

		respondWith(response: IsoHttp.Response) {
			if (typeof this.resolve === 'function') {
				this.resolve(response);
			}
		}

		rejectWith(err: Error) {
			if (typeof this.reject === 'function') {
				this.reject(this.addRequestInfo(err));
			}
		}

	}

}

export = FakeHttp;
