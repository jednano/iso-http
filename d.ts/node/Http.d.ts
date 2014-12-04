/// <reference path="../../bower_components/dt-node/node.d.ts" />
import IsoHttp = require('../IsoHttp');
declare module Http {
    function request(options: IsoHttp.RequestOptions, resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): void;
    class Agent extends IsoHttp.Agent {
        send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): void;
    }
}
export = Http;
