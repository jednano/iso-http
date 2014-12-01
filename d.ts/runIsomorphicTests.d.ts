/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
import IsoHttp = require('./IsoHttp');
declare function runIsomorphicTests(request: IsoHttp.Request): void;
export = runIsomorphicTests;
