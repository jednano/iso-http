import IsoHttp = require('./IsoHttp');
declare module BrowserHttp {
    function request(options: IsoHttp.RequestOptions, resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): void;
    class Agent extends IsoHttp.Agent {
        constructor(options?: IsoHttp.RequestOptions);
        send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): void;
        private setXhrHeaders(xhr, headers);
        private createXhr();
        private parseHeaders(headers);
    }
}
export = BrowserHttp;
