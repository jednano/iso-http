/// <reference path="../../bower_components/dt-node/node.d.ts" />
/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var httpRequest = require('./httpRequest');
var TestUtils = require('../test/TestUtils');
describe('node httpRequest()', function () {
    TestUtils.runIsomorphicTests(httpRequest);
    it('handles a 404', function (done) {
        httpRequest(TestUtils.getApiPath('/404'), function (response) {
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Cannot GET /404\n');
            done();
        });
    });
    it('rejects a client error', function (done) {
        httpRequest('http://foo.bar.baz/qux', {
            onClientError: function (error) {
                expect(error.message).toEqual('iso-http: getaddrinfo ENOTFOUND');
                done();
            }
        });
    });
});
