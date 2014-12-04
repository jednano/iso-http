/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var http = require('iso-http');
var TestUtils = require('TestUtils');
describe('BrowserHttp.request()', function () {
    var request = http.request;
    TestUtils.runIsomorphicTests(request);
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestUtils.noop, function (err) {
            expect(err.message).toEqual('Unspecified client error.');
            done();
        });
    });
});
