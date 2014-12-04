/// <reference path="../bower_components/dt-node/node.d.ts" />
var cors = require('cors');
var express = require('express');

var app = express();

app.set('json spaces', 0);

app.use(cors());

app.get('/200', (request, response) => {
	response.status(200).send('foo');
});

app.get('/500', (request, response) => {
	response.status(500).send('fail');
});

var server = app.listen(3000, () => {
	console.log('Test server listening on port %d', server.address().port);
});

export = server;
