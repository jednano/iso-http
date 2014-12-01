/// <reference path="../bower_components/dt-node/node.d.ts" />
/// <reference path="../bower_components/dt-jasmine/jasmine.d.ts" />
var IsoHttp = require('./IsoHttp');
describe('IsoHttp.Agent constructor', function () {
    // ReSharper disable once InconsistentNaming
    var Agent = IsoHttp.Agent;
    it('errors if no options are supplied', function () {
        var fn = function () {
            return new Agent();
        };
        expect(fn).toThrowError('Missing options.');
        fn = function () {
            return new Agent({});
        };
        expect(fn).toThrowError('Missing options.');
    });
    it('errors if no url is supplied as an option', function () {
        var fn = function () {
            return new Agent({ foo: 'bar' });
        };
        expect(fn).toThrowError('Missing required option: url.');
    });
    it('errors when the send method is not implemented', function () {
        var fn = function () {
            new Agent({ url: 'foo' }).send();
        };
        expect(fn).toThrowError('Not implemented.');
    });
    it('sets headers', function () {
        var headers = {
            bar: 'baz',
            qux: 'quux'
        };
        var agent = new Agent({
            url: 'foo',
            headers: headers
        });
        expect(agent.headers).toEqual(headers);
    });
    it('sets Content-Type', function () {
        var agent = new Agent({
            url: 'foo',
            contentType: 'bar'
        });
        expect(agent.contentType).toEqual('bar');
    });
});
