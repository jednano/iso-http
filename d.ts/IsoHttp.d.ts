declare module IsoHttp {
    interface Request {
        (url: string, options?: RequestOptions): void;
    }
    interface RequestOptions {
        method?: string;
        headers?: any;
        data?: any;
        crossDomain?: boolean;
        onResponse?: ResponseCallback;
        onClientError?: ClientErrorCallback;
    }
    interface ResponseCallback {
        (response: Response): void;
    }
    interface Response {
        headers: any;
        status: number;
        text: string;
    }
    interface ClientErrorCallback {
        (clientError: ClientError): void;
    }
    interface ClientError extends Error {
        method: string;
        url: string;
    }
    class Agent {
        protected url: string;
        protected method: string;
        protected headers: any;
        protected crossDomain: boolean;
        protected data: any;
        protected onResponse: ResponseCallback;
        protected onClientError: ClientErrorCallback;
        protected hasErrors: boolean;
        private nullResponse;
        constructor(url: string, options?: RequestOptions);
        private wrapClientErrorCallback(onClientError?);
        private wrapTryCatch(tryFunction, onCatch);
        private wrapResponseCallback(onResponse?);
        protected onError(error?: any): void;
        private validateRequest(options);
    }
}
export = IsoHttp;
