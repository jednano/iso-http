/// <reference path="../../bower_components/dt-node/node.d.ts" />
/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var Http = require('./Http');
var TestUtils = require('../test/TestUtils');
describe('NodeHttp.request()', function () {
    var request = Http.request;
    TestUtils.runIsomorphicTests(request);
    it('handles a 404', function (done) {
        request({ url: TestUtils.getApiPath('/404') }, function (response) {
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Cannot GET /404\n');
            done();
        });
    });
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestUtils.noop, function (err) {
            expect(err.message).toMatch(/getaddrinfo ENOTFOUND foo.bar.baz/);
            done();
        });
    });
});
