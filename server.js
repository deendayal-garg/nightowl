'use strict';

var app = require('./index');
var http = require('http');

// Require global properties while starting the server.
require("./infra/globalProperties");

var server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.PORT || 8001);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
