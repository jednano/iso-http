/// <reference path="../../bower_components/dt-node/node.d.ts" />
var cors = require('cors');
var express = require('express');
var app = express();
app.set('json spaces', 0);
app.options('/200', cors());
app.get('/200', cors(), function (request, response) {
    response.status(200).send('foo');
});
//app.options('/404', cors());
//var count = 0;
//app.get('/404', cors(), (request, response) => {
//	console.log('got a 404!');
//	if (++count === 2) {
//		process.exit(0);
//	}
//	response.status(404);
//});
app.options('/500', cors());
app.get('/500', cors(), function (request, response) {
    response.status(500).send('fail');
});
var server = app.listen(3000, function () {
    console.log('Test server listening on port %d', server.address().port);
});
module.exports = server;
