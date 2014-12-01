/// <reference path="../bower_components/dt-node/node.d.ts" />
/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var NodeHttp = require('./NodeHttp');
var runIsomorphicTests = require('./runIsomorphicTests');
var TestHelpers = require('./TestHelpers');
describe('NodeHttp.request()', function () {
    var request = NodeHttp.request;
    runIsomorphicTests(request);
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestHelpers.noop, function (err) {
            expect(err.message).toEqual('getaddrinfo ENOTFOUND');
            done();
        });
    });
});
