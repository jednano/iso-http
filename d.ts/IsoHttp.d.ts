import Types = require('./Types');
declare module IsoHttp {
    interface Request {
        (options: RequestOptions, resolve?: ResolveCallback, reject?: RejectCallback): void;
    }
    interface ResolveCallback {
        (response: Response): void;
    }
    interface RejectCallback {
        (error: ClientError): void;
    }
    class Agent {
        protected url: string;
        protected method: string;
        protected headers: Types.HashTable<string>;
        protected data: Types.HashTable<string>;
        protected withCredentials: boolean;
        contentType: string;
        constructor(options: RequestOptions);
        setHeaders(headers: Types.HashTable<string>): void;
        send(resolve?: ResolveCallback, reject?: RejectCallback): void;
        protected addRequestInfo(err: Error): ClientError;
    }
    interface Response {
        headers: any;
        status: number;
        text: string;
    }
    interface RequestOptions {
        contentType?: string;
        data?: any;
        headers?: any;
        method?: string;
        url: string;
        withCredentials?: boolean;
    }
    interface ClientError extends Error {
        method: string;
        url: string;
    }
}
export = IsoHttp;
