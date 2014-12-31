/// <reference path="../../bower_components/dt-node/node.d.ts" />
var cors = require('cors');
var express = require('express');
var app = express();
app.set('json spaces', 0);
app.options('/200', cors());
app.get('/200', cors(), function (request, response) {
    response.status(200).send('foo');
});
app.options('/500', cors());
app.get('/500', cors(), function (request, response) {
    response.status(500).send('fail');
});
var corsMiddleware = cors({
    origin: true,
    credentials: true
});
app.options('/creds', corsMiddleware);
app.get('/creds', corsMiddleware, function (request, response) {
    response.status(200).send('foo');
});
var server = app.listen(3000, function () {
    console.log('Test server listening on port %d', server.address().port);
});
module.exports = server;
