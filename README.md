# iso-http

An HTTP request library that enables isomorphic applications.

[![Build Status](https://secure.travis-ci.org/jedmao/iso-http.svg)](http://travis-ci.org/jedmao/iso-http)
[![Dependency Status](https://david-dm.org/jedmao/iso-http.svg)](https://david-dm.org/jedmao/iso-http)
[![NPM version](https://badge.fury.io/js/iso-http.svg)](http://badge.fury.io/js/iso-http)
[![Code Climate](https://codeclimate.com/github/jedmao/iso-http/badges/gpa.svg)](https://codeclimate.com/github/jedmao/iso-http)
[![Test Coverage](https://codeclimate.com/github/jedmao/iso-http/badges/coverage.svg)](https://codeclimate.com/github/jedmao/iso-http)

[![NPM](https://nodei.co/npm/iso-http.svg?downloads=true)](https://nodei.co/npm/iso-http/)


## Features

- [Enables Isomorphic Applications &ndash; runs on Node and in-browser with the same interface!](#enables-isomorphic-applications)
- [100% test coverage with 4.0 Code Climate GPA](#full-test-coverage)
- Zero runtime dependencies
- Small footprint &ndash; 4KB (minified) / 2KB (gzipped)
- [FakeHttp module for testing](#fake-http-module-for-testing)
- [TypeScript source &ndash; definitions are free!](#typescript-source)


### Enables Isomorphic Applications

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
http.request('http://domain.com/foo', {
	onResponse: function(response) {
		// handle response
	}
});
```

Your request options must follow the following interface. Note that `?` indicates an optional field and `any` represents an [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Values,_variables,_and_literals#Object_literals) or hash.

```ts
export interface RequestOptions {
	method?: string;
	headers?: any;
	data?: any;
	crossDomain?: boolean;
	onResponse?: ResponseCallback;
	onClientError?: ClientErrorCallback;
}
```

The callback function will be called with a response object that uses the following interface:

```ts
interface Response {
	status: number;
	headers: any;
	text: string;
}
```

Note that the headers will be returned with lowercase keys. In the case of an error, a null response will be provided:

```json
{
	"status": 0,
	"headers": {},
	"text": ""
}
```

On the topic of errors, only client errors are handled in this module. Server errors and response codes are outside the scope of this module. To handle a client error you would do the following:

```js
http.request('http://domain.com/foo', {
	onClientError: function(error) {
		console.log('method:', error.method);
		console.log('url:', error.url);
		console.log('message:', error.message);
	}
});
```

Note that additional information is attached to the error instance, providing the method and URL that were requested. Also note that if you were to throw an error inside your error callback the null response will still be provided to the response callback. If there are errors validating your request arguments/options, you will see multiple errors reported for each validation error.


### Full test coverage

Tests are written in [Jasmine](http://jasmine.github.io/) to cover all library source code. Code coverage reports are generated with [Istanbul](http://gotwarlost.github.io/istanbul/) and sent to [Code Climate](https://codeclimate.com/github/jedmao/iso-http) for further code quality analysis. Browser tests are run with [Karma](http://karma-runner.github.io/).

All tests are run locally in Node, Chrome, Chrome Canary, Firefox, Safari and Internet Explorer. In [Travis-CI](https://travis-ci.org/jedmao/iso-http), tests are run in Node, Chrome and Firefox.

For Internet Explorer, only versions 9 and above are supported. Please submit any issues on the [GitHub Issue Tracker](https://github.com/jedmao/iso-http/issues).


### FakeHttp module for testing

A FakeHttp module is available for testing. Here's how you require it:

```js
var fakeHttp = require('iso-http/fake');
```

NOTE: If you're doing browser tests, you'll need to first reference the [iso-http--fake.js file](https://github.com/jedmao/iso-http/blob/master/dist/iso-http--fake.js) in the head section of your test runner's HTML file:

```html
<script src="bower_components/iso-http--fake.js"></script>
```

Unlike the real iso-http module, the fake one returns a request object (an instance of FakeHttp.Agent), upon which you can run two methods. The first method is `respondWith`. Itt accepts a fake response object:

```js
it('responds with a fake response', function(done) {
	var url = 'http://domain.com/foo';
	var options = { /* your options here */ };
	var fakeResponse = {
		status: 123,
		headers: { foo: 'bar' },
		text: 'baz'
	};
	var req = fakeHttp.request(url, options, function(response) {
		expect(response).toEqual(fakeResponse);
		done();
	});
	req.respondWith(fakeResponse);
});
```

The second method, `errorWith`, accepts an error object:

```js
it('rejects with an error', function(done) {
	var url = 'http://domain.com/foo';
	var options = { /* your options here */ };
	var noop = function() {};
	var req = fakeHttp.request(url, options, noop, function(err) {
		expect(err instanceof Error).toBe(true);
		expect(err.message).toEqual('No dice');
		done();
	});
	req.errorWith(new Error('No dice'));
});
```


### Typescript source

Since all the source code is written in TypeScript, the definition files are always in sync with the code. To gain access to these definitions, [install the iso-http node module with npm](#node-installation) and import the module like so:

```ts
/// <reference path="node_modules/iso-http/iso-http.d.ts" />
import http = require('iso-http');
```

You'll now gain all the benefits of [intelligent code completion aka Intellisense](http://en.wikipedia.org/wiki/Intelligent_code_completion) within [Microsoft Visual Studio](http://www.visualstudio.com/).
