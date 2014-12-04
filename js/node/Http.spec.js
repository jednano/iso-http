/// <reference path="../../bower_components/dt-node/node.d.ts" />
/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var Http = require('./Http');
var TestUtils = require('../TestUtils');
describe('NodeHttp.request()', function () {
    var request = Http.request;
    TestUtils.runIsomorphicTests(request);
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestUtils.noop, function (err) {
            expect(err.message).toEqual('getaddrinfo ENOTFOUND');
            done();
        });
    });
});
