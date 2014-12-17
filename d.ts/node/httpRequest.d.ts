/// <reference path="../../bower_components/dt-node/node.d.ts" />
import IsoHttp = require('../IsoHttp');
declare function httpRequest(url: string, options?: IsoHttp.RequestOptions): void;
export = httpRequest;
