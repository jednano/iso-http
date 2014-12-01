/// <reference path="../bower_components/dt-node/node.d.ts" />
var cors = require('cors');
var express = require('express');
var app = express();
app.set('json spaces', 0);
app.use(cors());
app.get('/foo', function (request, response) {
    response.status(200).send('bar');
});
app.get('/error', function (request, response) {
    response.status(500).send('fail');
});
var server = app.listen(3000, function () {
    console.log('Test server listening on port %d', server.address().port);
});
module.exports = server;
