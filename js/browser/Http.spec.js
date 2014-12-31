/// <reference path="../../bower_components/dt-jasmine/jasmine.d.ts" />
var Http = require('./Http');
var TestUtils = require('../test/TestUtils');
describe('BrowserHttp.request()', function () {
    var request = Http.request;
    TestUtils.runIsomorphicTests(request);
    it('handles a 404', function (done) {
        request({ url: 'http://localhost:9876/404' }, function (response) {
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('NOT FOUND');
            done();
        });
    });
    it('rejects a client error', function (done) {
        var options = {
            url: 'http://foo.bar.baz/qux'
        };
        request(options, TestUtils.noop, function (err) {
            expect(err.message).toEqual('Unspecified client error.');
            done();
        });
    });
    describe('a cross-domain request', function () {
        it('handles a credentialed request', function (done) {
            request({
                url: TestUtils.getApiPath('/creds'),
                withCredentials: true
            }, function (response) {
                expect(response.status).toEqual(200);
                expect(response.text).toEqual('foo');
                done();
            });
        });
        it('handles a failure', function (done) {
            request({
                url: '//tunne127.com'
            }, function (response) {
                expect(response.status).toEqual(0);
                expect(response.text).toEqual('');
                done();
            });
        });
    });
});
