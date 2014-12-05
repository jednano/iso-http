import IsoHttp = require('../IsoHttp');
declare module TestUtils {
    function getApiPath(path: string): string;
    function isPlainObject(obj: Object): boolean;
    function noop(): void;
    function runIsomorphicTests(request: IsoHttp.Request): void;
    module FakeHttp {
        function request(options?: IsoHttp.RequestOptions, resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): Agent;
        class Agent extends IsoHttp.Agent {
            private resolve;
            private reject;
            send(resolve?: IsoHttp.ResolveCallback, reject?: IsoHttp.RejectCallback): Agent;
            respondWith(response: IsoHttp.Response): void;
            rejectWith(err: Error): void;
        }
    }
}
export = TestUtils;
