# iso-http

An isomorphic HTTP request library.

[![Build Status](https://secure.travis-ci.org/jedmao/iso-http.svg)](http://travis-ci.org/jedmao/iso-http)
[![Dependency Status](https://david-dm.org/jedmao/iso-http.svg)](https://david-dm.org/jedmao/iso-http)
[![NPM version](https://badge.fury.io/js/iso-http.svg)](http://badge.fury.io/js/iso-http)
[![Code Climate](https://codeclimate.com/github/jedmao/iso-http/badges/gpa.svg)](https://codeclimate.com/github/jedmao/iso-http)
[![Test Coverage](https://codeclimate.com/github/jedmao/iso-http/badges/coverage.svg)](https://codeclimate.com/github/jedmao/iso-http)

[![NPM](https://nodei.co/npm/iso-http.svg?downloads=true)](https://nodei.co/npm/iso-http/)


## Features

- [Isomorphic &ndash; runs on Node and in-browser with the same interface!](#isomorphic)
- [100% test coverage with 4.0 Code Climate GPA](#full-test-coverage)
- Zero dependencies
- Small footprint &ndash; 4KB (minified) / 2KB (gzipped)
- [FakeHttp module for testing](#fake-http-module-for-testing)
- [TypeScript source &ndash; definitions are free!](#typescript-source)


### Isomorphic

With iso-http, the only thing different between Node and in-browser is the installation. This means you can use iso-http in your [isomorphic](https://www.google.com/search?q=isomoprhic%20javascript) applications in the most consistent way. In Node, the built-in [http module](http://nodejs.org/api/http.html#http_http_request_options_callback) is utilized. In the browser, the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) is used without any reference to Node libraries. This keeps the footprint light.


#### Node installation

```
$ npm install iso-http
```

Remember the `--save` or `--save-dev` flag, depending on your situation.


#### Browser installation

```
$ bower install --save iso-http
```


#### Usage

Now, you're ready to require iso-http. The Bower package uses [Browserify](http://browserify.org/) to expose `iso-http` so you can require it in the CommonJS way, same as Node.

```js
var http = require('iso-http');
```

Now, you can make an http request:

```js
var requestOptions = {
  url: 'http://domain.com/foo'
};
var request = http.request(requestOptions, function(response) {
  // handle response
});
```

Your request options must follow the following interface. Note that `?` indicates an optional field and `any` represents an [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Values,_variables,_and_literals#Object_literals) or hash.

```ts
interface RequestOptions {
	url: string;
	method?: string; // default: 'GET'
	contentType?: string;
	headers?: any;
	withCredentials?: boolean; // default: false
	data?: any;
}
```

The callback function will be called with a response object that uses the following interface:

```ts
interface Response {
	headers: Types.HashTable<string>;
	status: number;
	text: string;
}
```


### Full test coverage

Tests are written in [Jasmine](http://jasmine.github.io/) to cover all library source code. Code coverage reports are generated with [Istanbul](http://gotwarlost.github.io/istanbul/) and sent to [Code Climate](https://codeclimate.com/github/jedmao/iso-http) for further code quality analysis. Browser tests are run with [Karma](http://karma-runner.github.io/).

All tests are run locally in Node, Chrome, Chrome Canary, Firefox, Safari and Internet Explorer. In [Travis-CI](https://travis-ci.org/jedmao/iso-http), tests are run in Node, Chrome and Firefox.

For Internet Explorer, only versions 9 and above are supported. Please submit any issues on the [GitHub Issue Tracker](https://github.com/jedmao/iso-http/issues).


### FakeHttp module for testing

A FakeHttp module is available for testing. Here's how you require it:

```js
var fakeHttp = require('iso-http/fake');
```

Unlike the real iso-http module, the fake one returns a request object (an instance of FakeHttp.Agent), upon which you can run two methods. The `respondWith` method accepts a fake response object:

```js
it('responds with a fake response', function(done) {
	var options = { /* your options here */ };
	var fakeResponse = {
		status: 123,
		headers: { foo: 'bar' },
		text: 'baz'
	};
	var req = fakeHttp.request(options, function(response) {
		expect(response).toEqual(fakeResponse);
		done();
	});
	req.respondWith(fakeResponse);
});
```

The `rejectWith` method accepts an error object:

```js
it('rejects with an error', function(done) {
	var options = { /* your options here */ };
	var noop = function() {};
	var req = fakeHttp.request(options, noop, function(err) {
		expect(err instanceof Error).toBe(true);
		expect(err.message).toEqual('No dice');
		done();
	});
	req.rejectWith(new Error('No dice'));
});
```


### Typescript source

Since all the source code is written in TypeScript, the definition files are always in sync with the code. To gain access to these definitions, [install the iso-http node module with npm](#node-installation) and import the module like so:

```ts
/// <reference path="node_modules/iso-http/iso-http.d.ts" />
import http = require('iso-http');
```

You'll now gain all the benefits of [intelligent code completion aka Intellisense](http://en.wikipedia.org/wiki/Intelligent_code_completion) within [Microsoft Visual Studio](http://www.visualstudio.com/).
