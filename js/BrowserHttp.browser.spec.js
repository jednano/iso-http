/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var BrowserHttp = require('./BrowserHttp');
var runIsomorphicTests = require('./runIsomorphicTests');
var TestHelpers = require('./TestHelpers');
describe('BrowserHttp.request()', function () {
    var request = BrowserHttp.request;
    runIsomorphicTests(request);
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestHelpers.noop, function (err) {
            expect(err.message).toEqual('Unspecified client error.');
            done();
        });
    });
});
