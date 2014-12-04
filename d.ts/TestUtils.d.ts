import IsoHttp = require('./IsoHttp');
declare module TestUtils {
    function getApiPath(path: string): string;
    function isPlainObject(obj: Object): boolean;
    function noop(): void;
    function runIsomorphicTests(request: IsoHttp.Request): void;
}
export = TestUtils;
