import IsoHttp = require('./IsoHttp');
declare module FakeHttp {
    function request(options?: IsoHttp.RequestOptions, resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): Agent;
    class Agent extends IsoHttp.Agent {
        private resolve;
        private reject;
        send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): Agent;
        respondWith(response: IsoHttp.Response): void;
        rejectWith(err: Error): void;
    }
}
export = FakeHttp;
